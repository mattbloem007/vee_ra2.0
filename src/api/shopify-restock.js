import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

// Shopify "products/update" webhook handler.
//
// Design note: this endpoint does NOT verify Shopify's HMAC signature.
// The signing secret used by Shopify's delivery pipeline could not be
// established for this app's webhooks (the secret supplied via the Admin
// API is not the one used to sign deliveries). Instead, the webhook is
// treated as an UNTRUSTED TRIGGER: the handler always re-fetches the
// product's actual state from the Shopify Admin API and makes all
// decisions on that authenticated data. A spoofed request therefore
// cannot inject fake stock data — it can only cause a rate-limited
// re-check.
//
// Flow:
// 1. Sanity checks: POST, looks like a Shopify delivery.
// 2. Re-fetches the product from the Shopify Admin API (source of truth).
// 3. Detects variants that went from out of stock (0 or less) back in stock
//    and, for everyone waiting (recorded by notify-instock.js in the
//    Netlify Blobs "back-in-stock" store), triggers the Omnisend custom
//    event "back_in_stock" which fires the "Back in stock" automation.
// 4. Triggers the Netlify build hook (rate-limited) so the Gatsby site
//    rebuilds with fresh stock levels.

const STORE_NAME = 'back-in-stock';
const OMNISEND_EVENT = 'back_in_stock';
const SITE_URL = 'https://www.veera.co.za';
const ADMIN_API_VERSION = '2024-01';

// Minimum interval between two build-hook triggers, in ms. Keeps the
// Gatsby site fresh while capping build usage even under spam.
const BUILD_COOLDOWN_MS = 5 * 60 * 1000;

// Minimum interval between Admin API re-fetches, in ms. Caps API usage.
const FETCH_COOLDOWN_MS = 2000;

const normVariant = (variantTitle) => (variantTitle || '').trim().toLowerCase();

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  const shopDomain = (process.env.SHOPIFY_SHOP_DOMAIN || '').trim().toLowerCase().replace(/^https?:\/\//, '');
  if (!adminToken || !shopDomain) {
    res.status(500).json({ error: 'Server not configured' });
    return;
  }

  const headers = req.headers || {};

  // Sanity checks: must look like a Shopify delivery for this shop.
  const shopHeader = String(headers['x-shopify-shop-domain'] || '').toLowerCase();
  const topic = String(headers['x-shopify-topic'] || '');
  const webhookId = String(headers['x-shopify-webhook-id'] || '');
  if (!webhookId || !topic.startsWith('products/') || (shopDomain && shopHeader !== shopDomain)) {
    res.status(202).json({ ok: true, ignored: 'not a shopify delivery' });
    return;
  }

  let product = typeof req.body === 'object' && req.body !== null ? req.body : null;
  const productId = product && product.id;

  const store = getStore({ name: STORE_NAME, consistency: 'strong' });

  // ---- Rate-limit the Admin API re-fetch ---------------------------------
  const meta = await store.get('meta', { type: 'json' });
  const now = Date.now();
  const lastFetchAt = meta && typeof meta.lastFetchAt === 'number' ? meta.lastFetchAt : 0;
  const lastBuildAt = meta && typeof meta.lastBuildAt === 'number' ? meta.lastBuildAt : 0;
  if (now - lastFetchAt < FETCH_COOLDOWN_MS) {
    res.status(200).json({ ok: true, note: 'rate limited, skipping re-check' });
    return;
  }

  // ---- Re-fetch the product from the Admin API (source of truth) ---------
  let truth = null;
  try {
    const url = `https://${shopDomain}/admin/api/${ADMIN_API_VERSION}/products/${productId}.json?fields=id,title,handle,status,image,variants`;
    const apiRes = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': adminToken, 'Content-Type': 'application/json' }
    });
    if (apiRes.status === 404) {
      // Product was deleted (or the id was bogus) — just acknowledge.
      await saveMeta(store, meta, { lastFetchAt: now });
      res.status(200).json({ ok: true, note: 'product not found' });
      return;
    }
    if (!apiRes.ok) {
      console.error('Admin API error:', apiRes.status, await apiRes.text());
      await saveMeta(store, meta, { lastFetchAt: now });
      res.status(200).json({ ok: true, note: 'admin api error' });
      return;
    }
    const data = await apiRes.json();
    truth = data.product || null;
  } catch (err) {
    console.error('Admin API fetch failed:', err);
    await saveMeta(store, meta, { lastFetchAt: now });
    res.status(200).json({ ok: true, note: 'admin api fetch failed' });
    return;
  }

  await saveMeta(store, meta, { lastFetchAt: now });

  if (!truth || !truth.handle || !Array.isArray(truth.variants)) {
    res.status(200).json({ ok: true, note: 'unexpected admin payload' });
    return;
  }

  const { data: ledger, etag } = await store.getWithMetadata(truth.handle, { type: 'json' });

  // ---- Restock detection + notifications ---------------------------------
  const result = { notified: 0, failed: 0, buildTriggered: false };

  if (ledger && Array.isArray(ledger.waitlist)) {
    // Track stock levels per variant to detect the out-of-stock -> in-stock
    // transition, plus per-variant info for the email fields.
    const variantQty = ledger.variants && typeof ledger.variants === 'object' ? { ...ledger.variants } : {};
    const restocked = new Set();
    const variantInfo = {};
    for (const variant of truth.variants) {
      const vKey = normVariant(variant.title);
      if (!vKey) continue;
      const newQty = typeof variant.inventory_quantity === 'number' ? variant.inventory_quantity : null;
      if (newQty === null) continue;
      const oldQty = variantQty[vKey] ?? null;
      if (oldQty !== null && oldQty <= 0 && newQty > 0) {
        restocked.add(vKey);
      }
      variantQty[vKey] = newQty;
      variantInfo[vKey] = {
        title: variant.title || truth.title,
        price: variant.price || ''
      };
    }

    // Notify everyone waiting on a variant that just came back, plus anyone
    // we previously failed to notify and whose variant is now in stock.
    const dueEntries = ledger.waitlist.filter((entry) => {
      if (entry.notifiedAt) return false;
      const qty = entry.variantKey ? variantQty[entry.variantKey] : null;
      return restocked.has(entry.variantKey) || (qty !== null && qty > 0);
    });

    if (dueEntries.length > 0) {
      const productUrl = `${SITE_URL}/store/${slugify(truth.title)}`;
      for (const entry of dueEntries) {
        const info = variantInfo[entry.variantKey] || {};
        try {
          await sendOmnisendEvent({
            apiKey: process.env.OMNISEND_API_KEY,
            email: entry.email,
            fields: {
              productTitle: truth.title,
              productVariant: info.title || entry.variant || truth.title,
              productPrice: info.price || '',
              productUrl,
              productImage: (truth.image && truth.image.src) || ''
            }
          });
          entry.notifiedAt = new Date().toISOString();
          result.notified += 1;
        } catch (err) {
          console.error('Omnisend event error:', err);
          result.failed += 1;
        }
      }
    }

    // Persist the updated stock levels and notified flags.
    ledger.productTitle = truth.title;
    ledger.updatedAt = new Date().toISOString();
    ledger.variants = variantQty;
    try {
      const write = await store.setJSON(truth.handle, ledger, { onlyIfMatch: etag });
      if (!write.modified) {
        // A signup raced us between the read and write; re-read and merge.
        const { data: fresh } = await store.getWithMetadata(truth.handle, { type: 'json' });
        if (fresh) {
          fresh.productTitle = ledger.productTitle;
          fresh.updatedAt = ledger.updatedAt;
          fresh.variants = variantQty;
          for (const due of dueEntries) {
            const match = fresh.waitlist.find(
              (w) => w.email === due.email && w.variantKey === due.variantKey
            );
            if (match && !match.notifiedAt && due.notifiedAt) {
              match.notifiedAt = due.notifiedAt;
            }
          }
          await store.setJSON(truth.handle, fresh);
        }
      }
    } catch (err) {
      console.error('Ledger write error:', err);
    }
  }

  // ---- Keep the Gatsby site's stock display fresh ------------------------
  if (now - lastBuildAt >= BUILD_COOLDOWN_MS && process.env.NETLIFY_BUILD_HOOK_URL) {
    try {
      const hookRes = await fetch(process.env.NETLIFY_BUILD_HOOK_URL, { method: 'POST' });
      result.buildTriggered = hookRes.ok;
      if (hookRes.ok) {
        await saveMeta(store, meta, { lastBuildAt: Date.now() });
      }
    } catch (err) {
      console.error('Build hook error:', err);
    }
  }

  res.status(200).json({ ok: true, ...result });
}

async function sendOmnisendEvent({ apiKey, email, fields }) {
  const response = await fetch('https://api.omnisend.com/v3/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey
    },
    body: JSON.stringify({
      name: 'Back in stock',
      systemName: OMNISEND_EVENT,
      email,
      fields
    })
  });
  // 204 means the event was accepted and the automation will be triggered.
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Omnisend event ${response.status}: ${text}`);
  }
}

async function saveMeta(store, meta, updates) {
  const next = { ...(meta || {}), ...updates };
  // Last-write-wins is fine for the cooldown markers: a lost race only
  // means the next event triggers one extra (rate-limited) build/fetch.
  await store.setJSON('meta', next).catch((err) => console.error('meta write error:', err));
}

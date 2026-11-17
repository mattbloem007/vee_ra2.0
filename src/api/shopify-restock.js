import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

// Shopify "products/update" webhook handler.
//
// 1. Verifies the request with the Shopify webhook secret (HMAC-SHA256).
// 2. Detects variants that went from out of stock (0 or less) back in stock.
// 3. For everyone waiting on that variant (recorded by notify-instock.js in
//    the Netlify Blobs "back-in-stock" store), triggers the Omnisend custom
//    event "back_in_stock" which fires the "Back in stock" automation email.
// 4. Whenever inventory actually changes, pings the Netlify build hook so
//    the Gatsby site rebuilds with fresh stock levels.

const STORE_NAME = 'back-in-stock';
const OMNISEND_EVENT = 'back_in_stock';
const SITE_URL = 'https://www.veera.co.za';

const normVariant = (variantTitle) => (variantTitle || '').trim().toLowerCase();

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });

export default async (req, context) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    return json({ error: 'Server not configured' }, 500);
  }

  // Verify the webhook: Shopify signs the raw request body with HMAC-SHA256.
  const raw = await req.text();
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256') || '';
  const digest = crypto.createHmac('sha256', secret).update(raw, 'utf8').digest('base64');
  if (!timingSafeEqual(digest, hmacHeader)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const topic = req.headers.get('x-shopify-topic') || '';
  if (topic !== 'products/update') {
    return json({ ok: true, ignored: topic });
  }

  let product;
  try {
    product = JSON.parse(raw);
  } catch (err) {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  if (!product || !product.handle || !Array.isArray(product.variants)) {
    return json({ error: 'Unexpected payload' }, 400);
  }

  const store = getStore({ name: STORE_NAME, consistency: 'strong' });
  const { data: ledger, etag } = await store.getWithMetadata(product.handle, { type: 'json' });
  if (!ledger) {
    return json({ ok: true, note: 'No waitlist for this product' });
  }

  // Track stock levels per variant to detect the out-of-stock -> in-stock
  // transition. Also read the price/title per variant for the email fields.
  const variantQty = ledger.variants && typeof ledger.variants === 'object' ? { ...ledger.variants } : {};
  const restocked = new Set();
  const variantInfo = {};
  let inventoryChanged = false;

  for (const variant of product.variants) {
    const vKey = normVariant(variant.title);
    if (!vKey) continue;
    const newQty = typeof variant.inventory_quantity === 'number' ? variant.inventory_quantity : null;
    if (newQty === null) continue;

    const oldQty = typeof variant.old_inventory_quantity === 'number'
      ? variant.old_inventory_quantity
      : variantQty[vKey] ?? null;

    if (oldQty !== null && oldQty !== newQty) {
      inventoryChanged = true;
    }
    if (oldQty !== null && oldQty <= 0 && newQty > 0) {
      restocked.add(vKey);
    }
    variantQty[vKey] = newQty;
    variantInfo[vKey] = {
      title: variant.title || product.title,
      price: variant.price || ''
    };
  }

  const result = { notified: 0, failed: 0, buildTriggered: false };

  // Notify everyone waiting on a variant that just came back, plus anyone
  // we previously failed to notify and whose variant is now in stock.
  const dueEntries = ledger.waitlist.filter((entry) => {
    if (entry.notifiedAt) return false;
    const qty = entry.variantKey ? variantQty[entry.variantKey] : null;
    return (restocked.has(entry.variantKey) || (qty !== null && qty > 0));
  });

  if (dueEntries.length > 0) {
    const productUrl = `${SITE_URL}/store/${slugify(product.title)}`;
    for (const entry of dueEntries) {
      const vKey = entry.variantKey;
      const info = variantInfo[vKey] || {};
      try {
        await sendOmnisendEvent({
          apiKey: process.env.OMNISEND_API_KEY,
          email: entry.email,
          fields: {
            productTitle: product.title,
            productVariant: info.title || entry.variant || product.title,
            productPrice: info.price || '',
            productUrl,
            productImage: (product.image && product.image.src) || ''
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
  ledger.productTitle = product.title;
  ledger.updatedAt = new Date().toISOString();
  ledger.variants = variantQty;
  try {
    const write = await store.setJSON(product.handle, ledger, { onlyIfMatch: etag });
    if (!write.modified) {
      // A signup raced us between the read and write; re-read and merge.
      const { data: fresh } = await store.getWithMetadata(product.handle, { type: 'json' });
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
        await store.setJSON(product.handle, fresh);
      }
    }
  } catch (err) {
    console.error('Ledger write error:', err);
  }

  // Keep the Gatsby site's stock display fresh: trigger a rebuild whenever
  // inventory actually changed.
  if (inventoryChanged && process.env.NETLIFY_BUILD_HOOK_URL) {
    try {
      const res = await fetch(process.env.NETLIFY_BUILD_HOOK_URL, { method: 'POST' });
      result.buildTriggered = res.ok;
    } catch (err) {
      console.error('Build hook error:', err);
    }
  }

  return json({ ok: true, ...result });
};

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

function timingSafeEqual(a, b) {
  const ab = Buffer.from(a || '', 'utf8');
  const bb = Buffer.from(b || '', 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

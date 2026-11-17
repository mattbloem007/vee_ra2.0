import { getStore } from '@netlify/blobs';

// Netlify Blobs store that keeps a per-product back-in-stock waitlist.
// The Shopify restock webhook (shopify-restock.js) reads from this store
// to know who to notify when a product comes back in stock.
const STORE_NAME = 'back-in-stock';

const normVariant = (variantTitle) => (variantTitle || '').trim().toLowerCase();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email, productTitle, productHandle, variantTitle } = req.body || {};
    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const apiKey = process.env.OMNISEND_API_KEY;
    if (!apiKey) {
      console.warn('OMNISEND_API_KEY is not set');
      res.status(500).json({ error: 'Server not configured' });
      return;
    }

    const tagBase = 'out of stock';
    const variantPart = variantTitle ? ` - ${variantTitle}` : '';
    const productPart = productTitle ? ` (${productTitle})` : '';
    const tag = `${tagBase}${variantPart}`.trim();

    const payload = {
      email,
      status: 'subscribed',
      statusDate: new Date().toISOString(),
      tags: [tag],
      customFields: {
        backInStockProduct: productTitle || '',
        backInStockHandle: productHandle || '',
        backInStockVariant: variantTitle || ''
      }
    };

    const response = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Omnisend error:', response.status, text);
      res.status(502).json({ error: 'Failed to save to Omnisend' });
      return;
    }

    // Save to the local waitlist ledger so the restock webhook knows
    // who to notify. Best-effort: the signup still succeeds if this fails.
    if (productHandle) {
      try {
        await recordSignup({ email, productTitle, productHandle, variantTitle });
      } catch (err) {
        console.error('Ledger error:', err);
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('notify-instock error', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}

async function recordSignup({ email, productTitle, productHandle, variantTitle }) {
  const store = getStore({ name: STORE_NAME, consistency: 'strong' });
  const variantKey = normVariant(variantTitle);
  const entry = {
    email: email.trim().toLowerCase(),
    variant: variantTitle || '',
    variantKey,
    addedAt: new Date().toISOString(),
    notifiedAt: null
  };

  // Retry with optimistic locking so concurrent signups don't overwrite
  // each other (last-write-wins would drop one of the entries).
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, etag } = await store.getWithMetadata(productHandle, { type: 'json' });
    const ledger = data || {
      productTitle: productTitle || '',
      updatedAt: null,
      variants: {},
      waitlist: []
    };

    ledger.productTitle = productTitle || ledger.productTitle;
    ledger.updatedAt = new Date().toISOString();

    // Upsert by email + variant; a re-signup resets notifiedAt so they
    // are notified again the next time the variant sells out and restocks.
    const existing = ledger.waitlist.find(
      (w) => w.email === entry.email && w.variantKey === entry.variantKey
    );
    if (existing) {
      existing.addedAt = entry.addedAt;
      existing.notifiedAt = null;
    } else {
      ledger.waitlist.push(entry);
    }

    const result = await store.setJSON(productHandle, ledger, { onlyIfMatch: etag });
    if (result.modified || etag === undefined) {
      return;
    }
  }
  throw new Error('Could not record signup: too many concurrent updates');
}

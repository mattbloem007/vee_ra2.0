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

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('notify-instock error', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}



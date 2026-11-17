// Newsletter signup endpoint for the site's footer subscribe form.
// Upserts the contact in Omnisend with the same tag conventions used by
// the Omnisend forms ('form_subscriber', 'source: form').
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'A valid email is required' });
      return;
    }

    const apiKey = process.env.OMNISEND_API_KEY;
    if (!apiKey) {
      console.warn('OMNISEND_API_KEY is not set');
      res.status(500).json({ error: 'Server not configured' });
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      status: 'subscribed',
      statusDate: new Date().toISOString(),
      tags: ['form_subscriber', 'source: form', 'newsletter'],
      customFields: {
        signupSource: 'website-footer'
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
      res.status(502).json({ error: 'Failed to subscribe. Please try again.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe error', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}

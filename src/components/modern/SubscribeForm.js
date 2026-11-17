import React, { useState } from 'react';

// Newsletter signup block, shown at the bottom of the site (inside the
// footer, so it appears on the home page and every blog post).
// Submissions go to /api/subscribe, which upserts the contact in Omnisend.
const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setIsSubmitting(true);
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Something went wrong.');
      }
      setStatus({ state: 'success', message: 'Welcome to the ritual — your first letter is on its way.' });
      setEmail('');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter">
      <div className="newsletter__inner">
        <div className="newsletter__text">
          <h3 className="newsletter__title">Join the ritual</h3>
          <p className="newsletter__subtitle">
            One letter a month. Brew guides and blend news. No spam, ever.
          </p>
        </div>
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className="newsletter__input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            aria-label="Email address"
            required
          />
          <button type="submit" className="newsletter__button" disabled={isSubmitting}>
            {isSubmitting ? 'Joining…' : 'Subscribe'}
          </button>
        </form>
        {status.state === 'success' && (
          <p className="newsletter__message newsletter__message--success" role="status">
            {status.message}
          </p>
        )}
        {status.state === 'error' && (
          <p className="newsletter__message newsletter__message--error" role="alert">
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscribeForm;

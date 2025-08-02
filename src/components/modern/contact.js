import React from 'react';
import { Link } from 'gatsby';

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <div className="contact__content">
          <h2 className="contact__title">Connect With Us</h2>
          <p className="contact__text">
            Have questions about our blends or want to share your ritual experience? 
            We'd love to hear from you.
          </p>
          <div className="contact__links">
            <a href="mailto:hello@vee-ra.com" className="contact__link">
              hello@vee-ra.com
            </a>
            <a href="https://instagram.com/vee_ra" className="contact__link">
              @vee_ra
            </a>
          </div>
          <div className="contact__cta">
            <Link to="/contact" className="btn btn--primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
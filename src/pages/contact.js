import React from 'react';
import { Link } from 'gatsby';
import Layout from "../components/layout";
import SEO from "../components/seo";
import ContactForm from "../components/modern/contact-form";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact - Vee/Ra Decadent Botanical Blends" description="Get in touch with us" />
      
      <div className="contact-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Contact</span>
          </nav>

          {/* Hero Section */}
          <section className="contact-hero">
            <div className="contact-hero__content">
              <h1 className="contact-hero__title">Get in Touch</h1>
              <p className="contact-hero__subtitle">
                We'd love to hear from you. Whether you have questions about our blends, want to share your experience, or just want to connect, we're here for you.
              </p>
            </div>
          </section>

          {/* Contact Content */}
          <div className="contact-content">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-section">
                <h2>Send Us a Message</h2>
                <p className="contact-form__intro">
                  Have a question about our blends? Want to share your experience? We'd love to hear from you.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="contact-info">
                <h2>Connect With Us</h2>
                <div className="contact-methods">
                  <div className="contact-method">
                    <h3>Email</h3>
                    <a href="mailto:info@veera.co.za" className="contact-link">
                      info@veera.co.za
                    </a>
                    <p>We typically respond within 24 hours</p>
                  </div>
                  
                  <div className="contact-method">
                    <h3>Instagram</h3>
                    <a href="https://instagram.com/vee_ra_botanicalblends" target="_blank" rel="noopener noreferrer" className="contact-link">
                      @vee_ra_botanicalblends
                    </a>
                    <p>Follow us for updates, rituals, and community</p>
                  </div>
                  
                  <div className="contact-method">
                    <h3>Location</h3>
                    <p>Based in Cape Point, South Africa</p>
                    <p>Shipping nationwide in South Africa, and internationally</p>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="contact-faq">
                  <h3>Frequently Asked Questions</h3>
                  <div className="faq-list">
                    <div className="faq-item">
                      <h4>How do I prepare ceremonial cacao?</h4>
                      <p>Heat milk of choice to 60 - 70°C, add your blend, and whisk with intention. Drink slowly and mindfully in a quiet space.</p>
                    </div>
                    
                    <div className="faq-item">
                      <h4>What's the difference between ceremonial cacao and regular chocolate?</h4>
                      <p>Ceremonial cacao is minimally processed, preserving the natural compounds that provide its heart-opening and energizing properties.</p>
                    </div>
                    
                    <div className="faq-item">
                      <h4>How long does shipping take?</h4>
                      <p>Domestic shipping takes 2-3 business days. International shipping varies by location but typically takes 7-14 days.</p>
                    </div>
                    
                    <div className="faq-item">
                      <h4>Are your ingredients organic?</h4>
                      <p>Yes, we source organic ingredients whenever possible and work with suppliers who share our commitment to quality and sustainability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="contact-cta">
              <h2>Ready to Begin Your Journey?</h2>
              <p>Explore our blends and start your daily cacao ritual today.</p>
              <Link to="/store" className="btn btn--primary">
                Shop Our Blends
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact; 
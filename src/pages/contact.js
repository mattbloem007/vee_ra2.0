import React from 'react';
import { Link } from 'gatsby';
import Layout from "../components/layout";
import SEO from "../components/seo";

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
              {/* Contact Information */}
              <div className="contact-info">
                <h2>Connect With Us</h2>
                <div className="contact-methods">
                  <div className="contact-method">
                    <h3>Email</h3>
                    <a href="mailto:hello@vee-ra.com" className="contact-link">
                      hello@vee-ra.com
                    </a>
                    <p>We typically respond within 24 hours</p>
                  </div>
                  
                  <div className="contact-method">
                    <h3>Instagram</h3>
                    <a href="https://instagram.com/vee_ra" target="_blank" rel="noopener noreferrer" className="contact-link">
                      @vee_ra
                    </a>
                    <p>Follow us for updates, rituals, and community</p>
                  </div>
                  
                  <div className="contact-method">
                    <h3>Location</h3>
                    <p>Based in South Africa</p>
                    <p>Shipping worldwide</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="contact-faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  <div className="faq-item">
                    <h3>How do I prepare ceremonial cacao?</h3>
                    <p>Heat water to 160°F (70°C), add your blend, and whisk with intention. Drink slowly and mindfully in a quiet space.</p>
                  </div>
                  
                  <div className="faq-item">
                    <h3>What's the difference between ceremonial cacao and regular chocolate?</h3>
                    <p>Ceremonial cacao is minimally processed, preserving the natural compounds that provide its heart-opening and energizing properties.</p>
                  </div>
                  
                  <div className="faq-item">
                    <h3>How long does shipping take?</h3>
                    <p>Domestic shipping takes 2-3 business days. International shipping varies by location but typically takes 7-14 days.</p>
                  </div>
                  
                  <div className="faq-item">
                    <h3>Are your ingredients organic?</h3>
                    <p>Yes, we source organic ingredients whenever possible and work with suppliers who share our commitment to quality and sustainability.</p>
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
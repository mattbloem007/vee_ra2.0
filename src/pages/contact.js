import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ContactForm from "../components/modern/contact-form.js";
import GoogleMap from "../elements/contact/googlemap.js";

const ContactPage = () => {
  // Structured data for contact page (Local Business)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vee/Ra Botanical Blends",
    "description": "Premium health and longevity brand offering botanical blends and natural supplements",
    "url": "https://vee-ra.netlify.app",
    "telephone": "+27-XX-XXX-XXXX",
    "email": "info@veera.co.za",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "South Africa"
    },
    "sameAs": [
      "https://instagram.com/vee_ra_botanicalblends"
    ],
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": "$$",
    "currenciesAccepted": "ZAR",
    "paymentAccepted": "Credit Card, Bank Transfer"
  };

  return (
    <Layout>
      <SEO 
        title="Contact Us | Vee/Ra Botanical Blends"
        description="Get in touch with Vee/Ra Botanical Blends. We're here to help you with questions about our premium botanical blends and wellness solutions."
        keywords="contact Vee/Ra, botanical blends support, wellness consultation, health supplements help, customer service"
        image="https://vee-ra.netlify.app/static/contact-og.jpg"
        canonical="https://vee-ra.netlify.app/contact"
        structuredData={structuredData}
      />
      
      <div className="contact-page">
        <div className="container">
          {/* Hero Section */}
          <div className="contact-hero">
            <div className="contact-hero__content">
              <h1>Get in Touch</h1>
              <p className="contact-hero__subtitle">
                Have questions about our botanical blends or need wellness guidance? 
                We're here to help you on your health journey.
              </p>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="contact-content">
            {/* Contact Form Section - Now Larger */}
            <div className="contact-form-section">
              <div className="contact-form-section__header">
                <h2>Send us a Message</h2>
                <p>We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
            
            {/* Contact Info Section */}
            <div className="contact-info-section">
              <h2>Other Ways to Connect</h2>
              <div className="contact-info">
                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-method__content">
                    <h3>Email Us</h3>
                    <p><a href="mailto:info@veera.co.za">info@veera.co.za</a></p>
                    <p>We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact-method__content">
                    <h3>Follow Us</h3>
                    <p>
                      <a 
                        href="https://instagram.com/vee_ra_botanicalblends" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                                                @vee_ra_botanicalblends
                       </a>
                    </p>
                    <p>Stay updated with our latest wellness tips and product launches</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact-method__content">
                    <h3>Location</h3>
                    <p>Cape Point, South Africa</p>
                    <p>We're based in the beautiful Cape Point region</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="contact-map-section">
            <h2>Find Us</h2>
            <GoogleMap />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 
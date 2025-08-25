import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

const ValuesPage = () => {
  const data = useStaticQuery(graphql`
    query ValuesPageQuery {
      why1: file(relativePath: {eq: "images/others/why-1.jpg"}) {
        childImageSharp {
          gatsbyImageData(width: 600, height: 400, quality: 90)
        }
      }
      why2: file(relativePath: {eq: "images/others/why-2.jpg"}) {
        childImageSharp {
          gatsbyImageData(width: 600, height: 400, quality: 90)
        }
      }
    }
  `);

  // Structured data for values page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vee/Ra Botanical Blends",
    "description": "Our core values and principles that guide every decision we make and every blend we create. Discover what drives Vee/Ra's commitment to quality, consciousness, and nature.",
    "url": "https://vee-ra.netlify.app",
    "values": [
      "Quality & Potency",
      "Lifestyle & Ritual", 
      "Consciousness & Connection",
      "Nature & Ethics"
    ]
  };

  return (
    <Layout>
      <SEO 
        title="Our Values | Vee/Ra Botanical Blends"
        description="Discover the core values and principles that guide Vee/Ra. From quality and potency to consciousness and nature, learn what drives our commitment to botanical wellness."
        keywords="Vee/Ra values, botanical wellness values, conscious consumption, ethical sourcing, regenerative practices, cacao values, wellness principles"
        image="https://vee-ra.netlify.app/static/values-og.jpg"
        canonical="https://vee-ra.netlify.app/values"
        structuredData={structuredData}
      />
      
      <div className="values-page">
        <div className="container">
          {/* Hero Section */}
          <div className="values-hero">
            <div className="values-hero__content">
              <h1 className="values-hero__title">OUR VALUES</h1>
              <p className="values-hero__subtitle">
                The principles that guide every decision we make and every blend we create
              </p>
            </div>
          </div>

          {/* Values Introduction */}
          <section className="values-section values-section--intro">
            <div className="values-section__content">
              <div className="values-section__text">
                <h2>What Drives Vee/Ra</h2>
                <p>
                  At Vee/Ra, we believe in the power of <strong>high potent extracts</strong> and <strong>high quality</strong> ingredients that honour the <strong>bioavailability of alkaloids</strong> for maximum effectiveness. Our approach embraces <strong>slow living</strong> and <strong>ritual</strong>, recognizing that true wellness comes from <strong>tuning in</strong> to our bodies and the natural world.
                </p>
                <p>
                  We are deeply <strong>rooted in nature</strong> and committed to <strong>conscious expanding</strong> through <strong>conscious consumption</strong>. Every product we create is <strong>intentional</strong>, designed to foster a <strong>healthy living lifestyle</strong> while maintaining <strong>ease of accessibility to medicine</strong>.
                </p>
                <p>
                  Our commitment extends to <strong>ethical sourcing</strong> and <strong>regenerative</strong> practices, ensuring we honor our <strong>connection to the plants</strong> and the earth that sustains us. This is the essence of Vee/Ra—where ancient wisdom meets modern wellness, and every blend carries the intention of transformation.
                </p>
              </div>
              <div className="values-section__image">
                {data.why1 && (
                  <GatsbyImage 
                    image={getImage(data.why1)} 
                    alt="Vee/Ra values and principles"
                    className="values-section__img"
                  />
                )}
              </div>
            </div>
          </section>

          {/* Values Grid */}
          <section className="values-section values-section--grid">
            <div className="values-section__header">
              <h2>Our Core Values</h2>
              <p>Four pillars that form the foundation of everything we do</p>
            </div>
            
            <div className="values-grid">
              <div className="value-category">
                <div className="value-category__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Quality & Potency</h3>
                <ul className="values-list">
                  <li>High potent extracts</li>
                  <li>High quality ingredients</li>
                  <li>Bioavailability of alkaloids</li>
                  <li>Ease of accessibility to medicine</li>
                </ul>
              </div>
              
              <div className="value-category">
                <div className="value-category__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Lifestyle & Ritual</h3>
                <ul className="values-list">
                  <li>Slow living</li>
                  <li>Ritual practices</li>
                  <li>Healthy living lifestyle</li>
                  <li>Tuning in</li>
                </ul>
              </div>
              
              <div className="value-category">
                <div className="value-category__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Consciousness & Connection</h3>
                <ul className="values-list">
                  <li>Conscious expanding</li>
                  <li>Conscious consumption</li>
                  <li>Connection to the plants</li>
                  <li>Intentional creation</li>
                </ul>
              </div>
              
              <div className="value-category">
                <div className="value-category__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Nature & Ethics</h3>
                <ul className="values-list">
                  <li>Rooted in nature</li>
                  <li>Ethically sourced</li>
                  <li>Regenerative practices</li>
                  <li>Harmony with earth</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Commitment Section */}
          <section className="values-section values-section--commitment">
            <div className="values-section__content values-section__content--reversed">
              <div className="values-section__text">
                <h2>Our Commitment to You</h2>
                <p>
                  Every blend we create is a reflection of these values. We're committed to transparency, 
                  quality, and the belief that wellness should be accessible, intentional, and deeply 
                  connected to the natural world.
                </p>
                <p>
                  When you choose Vee/Ra, you're choosing more than just a product—you're choosing 
                  a way of life that honors ancient wisdom, modern science, and the sacred connection 
                  between humans and nature.
                </p>
              </div>
              <div className="values-section__image">
                {data.why2 && (
                  <GatsbyImage 
                    image={getImage(data.why2)} 
                    alt="Our commitment to values and quality"
                    className="values-section__img"
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ValuesPage;

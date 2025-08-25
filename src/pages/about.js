import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
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
      productMtn: file(relativePath: {eq: "images/others/product mtn.jpeg"}) {
        childImageSharp {
          gatsbyImageData(width: 600, height: 400, quality: 90)
        }
      }
      cupsDisplay: file(relativePath: {eq: "images/about/products-in-nature.png"}) {
        childImageSharp {
          gatsbyImageData(width: 600, height: 400, quality: 90)
        }
      }
    }
  `);

  // Structured data for about page with cacao focus
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vee/Ra Botanical Blends",
    "description": "Premium cacao brand dedicated to crafting pure cacao blends for wellness, ritual, and inner harmony. Specialising in pure cacao and botanical wellness.",
    "url": "https://vee-ra.netlify.app",
    "logo": "https://vee-ra.netlify.app/static/logo.png",
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "name": "Matthew Gabriel",
      "jobTitle": "Founder & CEO",
      "description": "Passionate about cacao and herbal medicinals, dedicated to bringing ancient cacao wisdom to modern wellness practices"
    },
    "mission": "To provide premium cacao blends that honour ancient traditions while supporting modern wellness and spiritual practices",
    "values": [
      "Cacao Excellence",
      "Traditional Wisdom",
      "Wellness & Healing",
      "Sustainability",
      "Community & Connection"
    ],
    "sameAs": [
      "https://instagram.com/vee_ra_botanicalblends"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "South Africa",
      "addressLocality": "Cape Point"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Specialty",
        "value": "Ceremonial Cacao"
      },
      {
        "@type": "PropertyValue",
        "name": "Product Category",
        "value": "Ceremonial Grade Cacao Blends"
      },
      {
        "@type": "PropertyValue",
        "name": "Service Type",
        "value": "Cacao Ceremonies & Wellness"
      }
    ]
  };

  return (
    <Layout>
      <SEO 
        title="About Vee/Ra | Cacao Revolution"
        description="Learn about Vee/Ra's journey in cacao. Discover our mission to bring premium cacao blends and ancient cacao wisdom to modern wellness practices."
        keywords="about Vee/Ra cacao, ceremonial cacao heritage, cacao brand story, ceremonial cacao mission, cacao wellness company, Matthew Gabriel cacao, ceremonial cacao south africa"
        image="https://vee-ra.netlify.app/static/about-og.jpg"
        canonical="https://vee-ra.netlify.app/about"
        structuredData={structuredData}
      />
      
      <div className="about-page">
        <div className="container">
          {/* Hero Section */}
          <div className="about-hero">
            <div className="about-hero__content">
              <h1 className="about-hero__title">WE ARE DEVOTED TO CACAO</h1>
              <p className="about-hero__subtitle">
                Premium cacao blends crafted with intention,<br />
                honouring ancient wisdom for modern wellness
              </p>
            </div>
          </div>

          {/* Why Vee/Ra Section */}
          <section className="about-section about-section--why">
            <div className="about-section__content">
              <div className="about-section__text">
                <h2>Why Vee/Ra?</h2>
                <p>
                  In a world of quick fixes and synthetic solutions, Vee/Ra was born from a simple truth: 
                  nature provides everything we need for true wellness. Our name represents the balance of 
                  masculine and feminine energies, the harmony of opposites that exists in all of nature.
                </p>
                <p>
                  We believe that pure cacao, when sourced with care and prepared with intention, 
                  can be a powerful ally in your journey toward inner peace, clarity, and connection.
                </p>
              </div>
              <div className="about-section__image">
                {data.why1 && (
                  <GatsbyImage 
                    image={getImage(data.why1)} 
                    alt="Why Vee/Ra - The essence of our brand"
                    className="about-section__img"
                  />
                )}
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="about-section about-section--story">
            <div className="about-section__content about-section__content--reversed">
              <div className="about-section__text">
                <h2>Our Story</h2>
                <p>
                  Vee/Ra began as a personal journey of discovery. Matthew Gabriel, our founder, 
                  discovered the transformative power of pure cacao during his own wellness journey. 
                  What started as a personal ritual became a mission to share this ancient wisdom with others.
                </p>
                <p>
                  From humble beginnings in Cape Point, South Africa, we've grown into a community of 
                  cacao enthusiasts, wellness practitioners, and seekers of authentic connection. 
                  Every blend we create carries the intention of our journey and the wisdom of generations past.
                </p>
              </div>
              <div className="about-section__image">
                {data.why2 && (
                  <GatsbyImage 
                    image={getImage(data.why2)} 
                    alt="Our Story - The birth of Vee/Ra"
                    className="about-section__img"
                  />
                )}
              </div>
            </div>
          </section>

          {/* Cacao as Guide Section */}
          <section className="about-section about-section--cacao">
            <div className="about-section__content">
              <div className="about-section__text">
                <h2>Cacao as Our Guide</h2>
                <p>
                  Cacao is more than just an ingredient—it's our teacher, our guide, and our connection 
                  to the wisdom of the plants. In the essence of Vee/Ra, cacao represents nutritional 
                  awareness and harmony through ritual.
                </p>
                <p>
                  Cacao has been revered for thousands of years for its ability to 
                  open the heart, enhance intuition, and promote deep connection. It's not just about 
                  what cacao does for the body, but how it helps us remember our true nature.
                </p>
              </div>
              <div className="about-section__image">
                {data.productMtn && (
                  <GatsbyImage 
                    image={getImage(data.productMtn)} 
                    alt="Cacao as Guide - The essence of Vee/Ra"
                    className="about-section__img"
                  />
                )}
              </div>
            </div>
          </section>

          {/* Production & Location Section */}
          <section className="about-section about-section--production">
            <div className="about-section__content about-section__content--reversed">
              <div className="about-section__text">
                <h2>Where Vee/Ra Lives</h2>
                <p>
                  Nestled in the breathtaking Cape Point region of South Africa, our home is where 
                  the magic happens. Surrounded by the raw beauty of nature, we craft our blends 
                  with the same care and attention that nature shows in creating this landscape.
                </p>
                <p>
                  Our production process is small-batch and intentional. Every blend is crafted by hand, 
                  with love and respect for the ingredients and the traditions they represent. 
                  This is where Vee/Ra comes to life.
                </p>
              </div>
              <div className="about-section__image">
                {data.cupsDisplay && (
                  <GatsbyImage 
                    image={getImage(data.cupsDisplay)} 
                    alt="Where Vee/Ra Lives - Our production home"
                    className="about-section__img"
                  />
                )}
              </div>
            </div>
          </section>

          {/* Values Section - Moved to dedicated page */}
          <section className="about-section about-section--values">
            
            <div className="values-cta">
              <p>Discover the full depth of our values and principles</p>
              <Link to="/values" className="btn btn--primary">
                Explore Our Values
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 
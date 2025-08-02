import React from 'react';
import { Link } from 'gatsby';
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      file(relativePath: {eq: "images/others/cups-display.jpeg"}) {
        childImageSharp {
          gatsbyImageData(width: 600)
        }
      }
    }
  `);

  const image = data.file.childImageSharp.gatsbyImageData;

  return (
    <Layout>
      <SEO title="About - Vee/Ra Decadent Botanical Blends" description="Learn about our story and mission" />
      
      <div className="about-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">About</span>
          </nav>

          {/* Hero Section */}
          <section className="about-hero">
            <div className="about-hero__content">
              <h1 className="about-hero__title">Our Story</h1>
              <p className="about-hero__subtitle">
                Crafting ceremonial cacao blends that honor ancient wisdom and modern wellness
              </p>
            </div>
          </section>

          {/* Main Content */}
          <div className="about-content">
            <div className="about-grid">
              <div className="about-text">
                <h2>The Vee/Ra Journey</h2>
                <p>
                  Vee/Ra was born from a deep reverence for the ancient traditions of ceremonial cacao and a desire to make these powerful plant medicines accessible to modern seekers. Our founder discovered the transformative power of cacao during a period of personal healing, and felt called to share this sacred medicine with others.
                </p>
                <p>
                  We believe that cacao is more than just a delicious drink—it's a heart-opening medicine that has been used for thousands of years in sacred ceremonies and daily rituals. Our blends combine the finest ceremonial-grade cacao with carefully selected herbs and spices, each chosen for their specific healing properties.
                </p>
                <h3>Our Mission</h3>
                <p>
                  To provide authentic, high-quality ceremonial cacao blends that support your journey of self-discovery, healing, and connection. We believe that everyone deserves access to these sacred medicines, and we're committed to sourcing the finest ingredients while honoring the traditions from which they come.
                </p>
              </div>
              <div className="about-image">
                <GatsbyImage image={image} alt="Cacao cups display" />
              </div>
            </div>

            {/* Values Section */}
            <section className="about-values">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>Authenticity</h3>
                  <p>We honor the traditional uses and cultural significance of cacao, while making it accessible to modern practitioners.</p>
                </div>
                <div className="value-item">
                  <h3>Quality</h3>
                  <p>Every ingredient is carefully sourced and tested to ensure the highest quality and potency.</p>
                </div>
                <div className="value-item">
                  <h3>Sustainability</h3>
                  <p>We work with farmers and suppliers who practice sustainable agriculture and fair trade principles.</p>
                </div>
                <div className="value-item">
                  <h3>Community</h3>
                  <p>We believe in the power of community and connection, both in how we source our ingredients and how we serve our customers.</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="about-process">
              <h2>Our Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="process-step__number">01</div>
                  <h3>Source</h3>
                  <p>We carefully select ceremonial-grade cacao and organic herbs from trusted suppliers who share our values.</p>
                </div>
                <div className="process-step">
                  <div className="process-step__number">02</div>
                  <h3>Blend</h3>
                  <p>Each blend is crafted with intention, combining ingredients in specific ratios to create the desired energetic effect.</p>
                </div>
                <div className="process-step">
                  <div className="process-step__number">03</div>
                  <h3>Test</h3>
                  <p>Every batch is tested for quality, potency, and taste to ensure it meets our high standards.</p>
                </div>
                <div className="process-step">
                  <div className="process-step__number">04</div>
                  <h3>Share</h3>
                  <p>We package and ship your blends with care, ready to support your daily rituals and ceremonies.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About; 
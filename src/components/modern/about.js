import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutSectionQuery {
      file(relativePath: {eq: "images/others/cups-display.jpeg"}) {
        childImageSharp {
          gatsbyImageData(width: 600)
        }
      }
    }
  `);

  const image = data.file.childImageSharp.gatsbyImageData;

  return (
    <section className="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <h2 className="about__title">
              Crafted with Intention
            </h2>
            <p className="about__text">
              Our premium botanical blends combine the finest cacao with carefully selected herbs and medicinal plants. Each blend is crafted to support your unique wellness journey, whether you seek emotional balance, inner calm, or grounding connection.
            </p>
            <p className="about__text">
              From our signature Mood Magick blend to our lunar-inspired Moon Mylk and grounding Ritual Roots, every cup is an invitation to pause, reflect, and nourish your body and soul through mindful herbal practices.
            </p>
            <div className="about__cta">
              <Link to="/about" className="btn btn--secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="about__image">
            <GatsbyImage image={image} alt="Cacao cups display" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
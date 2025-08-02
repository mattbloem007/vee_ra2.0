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
              Our decadent botanical blends combine the finest ceremonial cacao with carefully selected herbs and spices. Each blend is crafted to support your daily rituals, whether you seek energy, calm, or connection.
            </p>
            <p className="about__text">
              From our signature Energy blend to our calming Serenity mix, every cup is an invitation to pause, reflect, and nourish your body and soul.
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
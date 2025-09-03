import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => <strong>{children}</strong>;
const Text = ({ children }) => <p>{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <div className="blog-image">
          <GatsbyImage image={node.data.target.gatsbyImageData} alt={node.data.target.title} />
        </div>
      );
    },
  },
};

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      contentfulHero {
        title
        subtitle
        cta
        description {
          raw
        }
        bgImage {
          gatsbyImageData(
            width: 500
            height: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 85
          )
        }
        logo {
          gatsbyImageData(
            width: 200
            height: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `);

  const heroData = data.contentfulHero;
  const logo = heroData.logo?.gatsbyImageData;
  const heroImage = heroData.bgImage?.gatsbyImageData;

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            {heroData.title}
          </h1>
          <h3 className="hero__subtitle">
            {heroData.subtitle}
          </h3>
          <p className="hero__description">
          {documentToReactComponents(JSON.parse(heroData.description.raw), options)}
          </p>
          <div className="hero__cta">
            <Link to="/store" className="hero__cta__link">
              {heroData.cta}
            </Link>
          </div>
        </div>
        
        <div className="hero__logo-stamp">
          <GatsbyImage 
            image={logo} 
            alt="Vee/Ra Logo" 
            className="hero__logo-stamp__image"
          />
        </div>
        
        <div className="hero__visual">
          <div className="hero__image">
            {heroImage ? (
              <GatsbyImage 
                image={heroImage} 
                alt="Hero Image" 
                className="hero__image__content"
              />
            ) : (
              <div className="hero__image-placeholder">
                <div className="hero__image-placeholder__content">
                  <span className="hero__image-placeholder__text">Photo Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
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
          gatsbyImageData
        }
      }
      file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-29.png"}) {
        childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
    }
  `);

  const heroData = data.contentfulHero;
  const logo = data.file.childImageSharp.gatsbyImageData;

  return (
    <section 
      className="hero" 
      style={{
        backgroundImage: `url(${heroData.bgImage.gatsbyImageData.images.fallback.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="hero__overlay">
        <div className="hero__content">
          <h1 className="hero__title">
            {heroData.title}
          </h1>
          <p className="hero__subtitle">
            {heroData.subtitle}
          </p>
          <p className="hero__description">
          {documentToReactComponents(JSON.parse(heroData.description.raw), options)}
          </p>
          <div className="hero__cta">
            <Link to="/store" className="hero__cta__link">
              {heroData.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
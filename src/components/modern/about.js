import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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
          <GatsbyImage 
            image={node.data.target.gatsbyImageData} 
            alt={node.data.target.title}
            loading="lazy"
            placeholder="blurred"
            formats={['auto', 'webp', 'avif']}
            quality={85}
          />
        </div>
      );
    },
  },
};

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutSectionQuery {
      contentfulAboutHome {
        title
        description {
          raw
        }
        cta
        image {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 75
          )
        }
      }
    }
  `);

  // Fallback data in case Contentful is unavailable
  const fallbackData = {
    title: "Crafted with Intention",
    description: {
      raw: JSON.stringify({
        nodeType: "document",
        data: {},
        content: [
          {
            nodeType: "paragraph",
            data: {},
            content: [{
              nodeType: "text",
              value: "Our premium botanical blends combine the finest cacao with carefully selected herbs and medicinal plants. Each blend is crafted to support your unique wellness journey, whether you seek emotional balance, inner calm, or grounding connection.",
              marks: [],
              data: {}
            }]
          },
          {
            nodeType: "paragraph",
            data: {},
            content: [{
              nodeType: "text",
              value: "From our signature Mood Magick blend to our lunar-inspired Moon Mylk and grounding Ritual Roots, every cup is an invitation to pause, reflect, and nourish your body and soul through mindful herbal practices.",
              marks: [],
              data: {}
            }]
          }
        ]
      })
    },
    cta: "Learn More"
  };

  const aboutData = data?.contentfulAboutHome || fallbackData;
  const image = aboutData?.image?.gatsbyImageData;

  return (
    <section className="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <h2 className="about__title">
              {aboutData.title}
            </h2>
            <div className="about__text">
              {documentToReactComponents(JSON.parse(aboutData.description.raw), options)}
            </div>
            <div className="about__cta">
              <Link to="/about" className="about__link">
                {aboutData.cta}
              </Link>
            </div>
          </div>
          <div className="about__image">
            {image ? (
              <GatsbyImage 
                image={image} 
                alt={aboutData.title || "About Vee/Ra"} 
                loading="lazy"
                placeholder="blurred"
                formats={['auto', 'webp', 'avif']}
                quality={85}
              />
            ) : (
              <div className="about__image-placeholder">
                <p>Image loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
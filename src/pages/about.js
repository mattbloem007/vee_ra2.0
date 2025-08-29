import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      contentfulAbout {
        section1 {
          raw
        }
        section1image {
          gatsbyImageData(width: 600, height: 400, quality: 90)
          title
        }
        section2 {
          raw
        }
        section2image {
          gatsbyImageData(width: 600, height: 400, quality: 90)
          title
        }
        section3 {
          raw
        }
        section3image {
          gatsbyImageData(width: 600, height: 400, quality: 90)
          title
        }
        section4 {
          raw
        }
        section4image {
          gatsbyImageData(width: 600, height: 400, quality: 90)
          title
        }
      }
    }
  `);

  const aboutData = data.contentfulAbout;
  
  // Debug logging
  console.log('About page data:', aboutData);
  console.log('Full query data:', data);

  // Rich text rendering options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>,
      [MARKS.ITALIC]: text => <em>{text}</em>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
      [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return (
          <div className="embedded-asset">
            <GatsbyImage 
              image={node.data.target.gatsbyImageData} 
              alt={node.data.target.title || "Embedded content"} 
            />
          </div>
        );
      },
    },
  };

  // Helper function to render rich text content
  const renderRichText = (content) => {
    if (!content || !content.raw) return null;
    try {
      return documentToReactComponents(JSON.parse(content.raw), richTextOptions);
    } catch (error) {
      console.error('Error rendering rich text:', error);
      return <p>Content loading...</p>;
    }
  };

  // Fallback content if Contentful data is not available
  const fallbackContent = {
    section1: {
      title: "Why Vee/Ra?",
      content: "In a world of quick fixes and synthetic solutions, Vee/Ra was born from a simple truth: nature provides everything we need for true wellness."
    },
    section2: {
      title: "Our Story", 
      content: "Vee/Ra began as a personal journey of discovery. Matthew Gabriel, our founder, discovered the transformative power of pure cacao during his own wellness journey."
    },
    section3: {
      title: "Cacao as Our Guide",
      content: "Cacao is more than just an ingredient—it's our teacher, our guide, and our connection to the wisdom of the plants."
    },
    section4: {
      title: "Where Vee/Ra Lives",
      content: "Nestled in the breathtaking Cape Point region of South Africa, our home is where the magic happens."
    }
  };

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
      "https://instagram.com/veera_cacao"
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

          {/* Section 1 */}
          <section className="about-section about-section--section1">
            <div className="about-section__content">
              <div className="about-section__text">
                {aboutData?.section1 ? (
                  renderRichText(aboutData.section1)
                ) : (
                  <>
                    <h2>{fallbackContent.section1.title}</h2>
                    <p>{fallbackContent.section1.content}</p>
                  </>
                )}
              </div>
              <div className="about-section__image">
                {aboutData?.section1image ? (
                  <GatsbyImage 
                    image={getImage(aboutData.section1image)} 
                    alt={aboutData.section1image.title || "Section 1 image"}
                    className="about-section__img"
                  />
                ) : (
                  <div className="about-section__placeholder">
                    <p>Image loading...</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="about-section about-section--section2">
            <div className="about-section__content about-section__content--reversed">
              <div className="about-section__text">
                {aboutData?.section2 ? (
                  renderRichText(aboutData.section2)
                ) : (
                  <>
                    <h2>{fallbackContent.section2.title}</h2>
                    <p>{fallbackContent.section2.content}</p>
                  </>
                )}
              </div>
              <div className="about-section__image">
                {aboutData?.section2image ? (
                  <GatsbyImage 
                    image={getImage(aboutData.section2image)} 
                    alt={aboutData.section2image.title || "Section 2 image"}
                    className="about-section__img"
                  />
                ) : (
                  <div className="about-section__placeholder">
                    <p>Image loading...</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="about-section about-section--section3">
            <div className="about-section__content">
              <div className="about-section__text">
                {aboutData?.section3 ? (
                  renderRichText(aboutData.section3)
                ) : (
                  <>
                    <h2>{fallbackContent.section3.title}</h2>
                    <p>{fallbackContent.section3.content}</p>
                  </>
                )}
              </div>
              <div className="about-section__image">
                {aboutData?.section3image ? (
                  <GatsbyImage 
                    image={getImage(aboutData.section3image)} 
                    alt={aboutData.section3image.title || "Section 3 image"}
                    className="about-section__img"
                  />
                ) : (
                  <div className="about-section__placeholder">
                    <p>Image loading...</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="about-section about-section--section4">
            <div className="about-section__content about-section__content--reversed">
              <div className="about-section__text">
                {aboutData?.section4 ? (
                  renderRichText(aboutData.section4)
                ) : (
                  <>
                    <h2>{fallbackContent.section4.title}</h2>
                    <p>{fallbackContent.section4.content}</p>
                  </>
                )}
              </div>
              <div className="about-section__image">
                {aboutData?.section4image ? (
                  <GatsbyImage 
                    image={getImage(aboutData.section4image)} 
                    alt={aboutData.section4image.title || "Section 4 image"}
                    className="about-section__img"
                  />
                ) : (
                  <div className="about-section__placeholder">
                    <p>Image loading...</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Values Section - Moved to dedicated page */}
          <section className="about-section about-section--values">
            <div className="values-cta">
              <p>Discover the full depth of our values and principles</p>
              <div className="values-cta__buttons">
                <Link to="/news/what-does-veera-mean/" className="btn btn--secondary">
                  What Does The Name Mean?
                </Link>
                <Link to="/values" className="btn btn--primary">
                  Explore Our Values
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 
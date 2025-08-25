import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BrewGuideTemplate = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;

  // Get the brew guide data from the markdown frontmatter
  const brewGuide = {
    title: frontmatter.title,
    videoUrl: frontmatter.videoUrl || 'https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE',
    description: frontmatter.description || 'Detailed brewing instructions for this method will be added soon.',
    steps: frontmatter.steps || []
  };

  return (
    <Layout>
      <SEO 
        title={`${brewGuide.title} - Vee/Ra Brew Guide`}
        description={`Learn how to brew your Vee/Ra botanical blends with the ${brewGuide.title.toLowerCase()}. Expert brewing instructions and tips.`}
      />
      
      <div className="brew-guide-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/brew-guides" className="breadcrumb__link">Brew Guides</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{brewGuide.title}</span>
          </nav>

          {/* Header */}
          <header className="brew-guide-header">
            <h1 className="brew-guide-header__title">{brewGuide.title}</h1>
            <p className="brew-guide-header__subtitle">
              Master the art of brewing with this expert method
            </p>
          </header>

          {/* Video Section */}
          <div className="brew-guide-video">
            <div className="video-container">
              <iframe
                src={brewGuide.videoUrl}
                title={`${brewGuide.title} Video Guide`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="brew-guide-video__iframe"
              ></iframe>
            </div>
          </div>

          {/* Description Section */}
          <div className="brew-guide-description">
            <h2 className="brew-guide-description__title">About This Method</h2>
            <p className="brew-guide-description__text">
              {brewGuide.description}
            </p>
          </div>

          {/* Steps Section */}
          {brewGuide.steps.length > 0 && (
            <div className="brew-guide-steps">
              <h2 className="brew-guide-steps__title">Step-by-Step Instructions</h2>
              <ol className="brew-guide-steps__list">
                {brewGuide.steps.map((step, index) => (
                  <li key={index} className="brew-guide-steps__item">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Navigation */}
          <div className="brew-guide-navigation">
            <Link to="/brew-guides" className="brew-guide-navigation__back">
              ← Back to All Brew Guides
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BrewGuideBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
        slug
        videoUrl
        description
        icon
        steps
        products
      }
    }
  }
`;

export default BrewGuideTemplate;

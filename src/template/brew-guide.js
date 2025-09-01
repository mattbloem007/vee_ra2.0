import React, { useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { useBrewGuide } from '../context/BrewGuideContext';

const BrewGuideTemplate = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { setLastVisitedFromVideoGuide } = useBrewGuide();

  // Get the brew guide data from the markdown frontmatter
  const brewGuide = {
    title: frontmatter.title,
    videoUrl: frontmatter.videoUrl || 'https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE',
    description: frontmatter.description || 'Detailed brewing instructions for this method will be added soon.',
    steps: frontmatter.steps || []
  };

  // Determine which product this brew guide belongs to and set it as last visited
  useEffect(() => {
    if (frontmatter.products && frontmatter.products.length > 0) {
      // Map product IDs to product data
      const productMap = {
        'mood-magick': {
          id: 'mood-magick',
          name: 'Mood Magick',
          subtitle: 'Energising Cacao Elixir'
        },
        'moon-mylk': {
          id: 'moon-mylk',
          name: 'Moon Mylk',
          subtitle: 'Relaxing Turmeric Latte'
        },
        'rr': {
          id: 'rr',
          name: 'Ritual Roots',
          subtitle: 'Grounding Coffee Alternative'
        }
      };
      
      // Find the first product that matches this brew guide
      const productId = frontmatter.products[0];
      const product = productMap[productId];
      
      if (product) {
        setLastVisitedFromVideoGuide(product);
      }
    }
  }, [frontmatter.products, setLastVisitedFromVideoGuide]);

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
              Master the art of brewing with this expert method.
            </p>
          </header>

          {/* Video Section */}
          <div className="brew-guide-video">
            {/* Video coming soon - iframe commented out for future use */}
            {/* <div className="video-container">
              <iframe
                src={brewGuide.videoUrl}
                title={`${brewGuide.title} Video Guide`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="brew-guide-video__iframe"
              ></iframe>
            </div> */}
            
            <div className="video-coming-soon">
              <div className="video-coming-soon__icon">🎥</div>
              <h3 className="video-coming-soon__title">Video Guide Coming Soon</h3>
              <p className="video-coming-soon__text">
                We're working hard to bring you detailed video guides for this brewing method. 
                Check back soon for step-by-step video instructions!
              </p>
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
            <Link to="/brew-guides?restore=true" className="brew-guide-navigation__back">
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

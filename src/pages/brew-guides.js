import React, { useState, useMemo } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

// Import product images
import moodMagickImage from '../assets/images/products/mood-magick-thumbnail.png';
import moonMylkImage from '../assets/images/products/moon-mylk-thumbnail.png';
import ritualRootsImage from '../assets/images/products/ritual-roots-thumbnail.png';

// Import brew method icons
import blenderIcon from '../assets/images/brew-methods/moon-mylk-deep-gold/blender-method-deep-gold.png';
import frothActionIcon from '../assets/images/brew-methods/moon-mylk-deep-gold/froth-action-method-deep-gold.png';
import frenchPressIcon from '../assets/images/brew-methods/moon-mylk-deep-gold/french-press-method-deep-gold.png';
import jarShakingIcon from '../assets/images/brew-methods/moon-mylk-deep-gold/jar-method-deep-gold.png';

const BrewGuides = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Product data
  const products = [
    {
      id: 'mood-magick',
      name: 'Mood Magick',
      image: moodMagickImage,
      description: 'Our signature blend for mood enhancement and vitality'
    },
    {
      id: 'moon-mylk',
      name: 'Moon Mylk',
      image: moonMylkImage,
      description: 'Calming elixir supporting creativity and relaxation'
    },
    {
      id: 'rr',
      name: 'Ritual Roots',
      image: ritualRootsImage,
      description: 'Grounding and energizing blend for balance, focus, and groundedness'
    }
  ];

  // Map brew method IDs to their corresponding icons
  const getBrewMethodIcon = (methodId) => {
    const iconMap = {
      'blender-method': blenderIcon,
      'froth-action-method': frothActionIcon,
      'french-press-method': frenchPressIcon,
      'jar-shaking-method': jarShakingIcon,
      'moka-pot-method': frenchPressIcon // Use French press icon as fallback
    };
    return iconMap[methodId] || blenderIcon; // Default to blender icon
  };

  // Get brewing methods from blog data
  const brewGuidePosts = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(post => post.frontmatter.category === 'brew guides');

  // Create brewing methods data structure from blog posts
  const brewingMethods = useMemo(() => {
    const methods = {};
    
    brewGuidePosts.forEach(post => {
      const { frontmatter } = post;
      const methodId = frontmatter.slug;
      
      methods[methodId] = {
        id: methodId,
        name: frontmatter.title,
        icon: getBrewMethodIcon(methodId), // Use our icon mapping instead of markdown field
        description: frontmatter.description,
        steps: frontmatter.steps || [],
        products: frontmatter.products || []
      };
    });
    
    return methods;
  }, [brewGuidePosts]);

  // Get brewing methods for a specific product
  const getBrewingMethodsForProduct = (productId) => {
    const methods = Object.values(brewingMethods).filter(method => 
      method.products.includes(productId)
    );
    
    // Sort methods in specific order: Blender, Froth Action, Jar Shaking
    const methodOrder = ['blender-method', 'froth-action-method', 'jar-shaking-method'];
    
    return methods.sort((a, b) => {
      const aIndex = methodOrder.indexOf(a.id);
      const bIndex = methodOrder.indexOf(b.id);
      
      // If both methods are in the order array, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only one is in the order array, prioritize it
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      
      // If neither is in the order array, maintain original order
      return 0;
    });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    
    // Smooth scroll to brewing methods section after a brief delay
    setTimeout(() => {
      const brewingSection = document.querySelector('.brewing-methods-section');
      if (brewingSection) {
        // Get viewport dimensions
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        // Calculate scroll position based on device
        let scrollOptions = { behavior: 'smooth' };
        
        if (isSmallMobile) {
          // For very small mobile devices, scroll to top of section
          scrollOptions.block = 'start';
        } else if (isMobile) {
          // For mobile devices, scroll to near top with some offset
          scrollOptions.block = 'start';
          // Add additional offset for mobile navigation if needed
          setTimeout(() => {
            window.scrollBy({
              top: -20, // Small offset to account for mobile nav
              behavior: 'smooth'
            });
          }, 100);
        } else {
          // For desktop, center the section
          scrollOptions.block = 'center';
        }
        
        brewingSection.scrollIntoView(scrollOptions);
      }
    }, 300); // Small delay to allow animation to start
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <SEO title="Brew Guides" description="Master the art of brewing your Vee/Ra botanical blends with our expert guides" />
      
      <div className="brew-guides-page">
        <div className="container">
          {/* Header */}
          <div className="brew-guides-header">
            <h1 className="brew-guides-header__title">Brew Guides</h1>
            <p className="brew-guides-header__subtitle">
              Master the art of brewing your Vee/Ra botanical blends with our expert guides
            </p>
          </div>

          {/* Product Selection View */}
          <div className="products-selection">
            <p className="products-selection__subtitle">
              Select your product to see the recommended brewing methods
            </p>
            
            <div className="products-grid">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedProduct?.id === product.id ? 'product-card--selected' : ''}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="product-card__image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__content">
                    <h3 className="product-card__title">{product.name}</h3>
                    <p className="product-card__description">{product.description}</p>
                    <div className="product-card__cta">
                      <span className="product-card__cta-text">
                        {selectedProduct?.id === product.id ? 'Selected' : 'Select Blend'}
                      </span>
                      <span className="product-card__cta-arrow">
                        {selectedProduct?.id === product.id ? '✓' : '→'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brewing Methods View - Shows below selected product */}
          {selectedProduct && (
            <div className="brewing-methods-section">
              {/*<div className="brewing-methods-header">
                <div className="brewing-methods-indicator">
                  <span className="brewing-methods-indicator__icon">↓</span>
                  <span className="brewing-methods-indicator__text">Brewing Methods Below</span>
                </div>
                <h2 className="brewing-methods-title">
                  Brewing Methods for {selectedProduct.name}
                </h2>
                <p className="brewing-methods-subtitle">
                  Choose your preferred brewing method and follow our step-by-step guides
                </p>
              </div>*/}

              <div className="brewing-methods-grid">
                {getBrewingMethodsForProduct(selectedProduct.id).map((method) => (
                  <div key={method.id} className="brewing-method-card">
                    <div className="brewing-method-card__icon">
                      <img 
                        src={method.icon} 
                        alt={method.name}
                        className="brewing-method-card__img"
                      />
                    </div>
                    <div className="brewing-method-card__content">
                      <h3 className="brewing-method-card__title">{method.name}</h3>
                                              <div className="brewing-method-card__description">
                          <ul className="brewing-method-card__steps">
                            {method.steps.map((step, index) => (
                              <li key={index} className="brewing-method-card__step">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      <Link 
                        to={`/brew-guides/${method.id}`}
                        className="brewing-method-card__button"
                      >
                        Watch Video Guide
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BrewGuidesPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "brew guides" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            category
            videoUrl
            description
            icon
            steps
            products
          }
        }
      }
    }
  }
`;

export default BrewGuides;

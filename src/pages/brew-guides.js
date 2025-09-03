import React, { useState, useMemo, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { useBrewGuide } from '../context/BrewGuideContext';

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
  const { selectedProduct, selectProduct, clearSelection, restoreLastVisited, restoreScrollPosition } = useBrewGuide();
  
  // Product data
  const products = [
    {
      id: 'mood-magick',
      name: 'Mood Magick',
      image: moodMagickImage,
      subtitle: 'Energising Cacao Elixir'
    },
    {
      id: 'moon-mylk',
      name: 'Moon Mylk',
      image: moonMylkImage,
      subtitle: 'Relaxing Turmeric Latte'
    },
    {
      id: 'rr',
      name: 'Ritual Roots',
      image: ritualRootsImage,
      subtitle: 'Grounding Coffee Alternative'
    }
  ];

  // Map brew method IDs to their corresponding icons
  const getBrewMethodIcon = (methodId) => {
    const iconMap = {
      'blender-method': blenderIcon,
      'blender-method-mood-magick': blenderIcon,
      'blender-method-moon-mylk': blenderIcon,
      'froth-action-method': frothActionIcon,
      'froth-action-method-mood-magick': frothActionIcon,
      'froth-action-method-moon-mylk': frothActionIcon,
      'french-press-method': frenchPressIcon,
      'jar-shaking-method': jarShakingIcon,
      'jar-shaking-method-mood-magick': jarShakingIcon,
      'jar-shaking-method-moon-mylk': jarShakingIcon,
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
    let methods = [];
    
    // For Mood Magick and Moon Mylk, use product-specific brew guides
    if (productId === 'mood-magick' || productId === 'moon-mylk') {
      // Look for product-specific brew guides first
      const productSpecificMethods = Object.values(brewingMethods).filter(method => 
        method.id.includes(`-${productId}`) && method.products.includes(productId)
      );
      
      // If we have product-specific methods, use those
      if (productSpecificMethods.length > 0) {
        methods = productSpecificMethods;
      } else {
        // Fallback to general methods that include this product
        methods = Object.values(brewingMethods).filter(method => 
          method.products.includes(productId)
        );
      }
    } else {
      // For other products (like Ritual Roots), use general methods
      methods = Object.values(brewingMethods).filter(method => 
        method.products.includes(productId)
      );
    }
    
    // Sort methods in specific order: Blender, Froth Action, French Press, Jar Shaking
    const methodOrder = [
      'blender-method', 'blender-method-mood-magick', 'blender-method-moon-mylk',
      'froth-action-method', 'froth-action-method-mood-magick', 'froth-action-method-moon-mylk',
      'french-press-method', 'jar-shaking-method', 'jar-shaking-method-mood-magick', 'jar-shaking-method-moon-mylk'
    ];
    
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
    selectProduct(product);
    
    // The scrolling will be handled by the useEffect below when selectedProduct changes
  };

  const handleBackToProducts = () => {
    clearSelection();
  };

  // Restore last visited product only when coming back from video guide
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const shouldRestore = searchParams.get('restore') === 'true';
      
      if (shouldRestore && !selectedProduct) {
        // If we're coming back from a video guide and should restore, do it
        const restored = restoreLastVisited();
        
        // If restoration was successful, scroll to the brewing methods section
        if (restored) {
          // Use a delay to ensure the DOM has updated with the restored product
          setTimeout(() => {
            const brewingSection = document.querySelector('.brewing-methods-section');
            if (brewingSection) {
              // Calculate the exact position to scroll to (top of section with offset)
              const sectionTop = brewingSection.offsetTop;
              const offset = 80; // Adjust this value to control how much space above the section
              const targetPosition = Math.max(0, sectionTop - offset);
              
              // Use window.scrollTo for precise positioning
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }, 300);
        }
        
        // Clean up the URL by removing the query parameter
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      } else if (!shouldRestore && !selectedProduct) {
        // If we're NOT coming from a video guide and no product is selected, 
        // clear any existing selection but don't clear localStorage yet
        clearSelection();
      }
    }
  }, [selectedProduct, restoreLastVisited, clearSelection]);

  // Track navigation source and clear localStorage appropriately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const shouldRestore = searchParams.get('restore') === 'true';
      
      // If we're not coming from a video guide, mark that we should clear localStorage on next navigation
      if (!shouldRestore) {
        // Set a flag to clear localStorage when user navigates away
        window.brewGuideShouldClearOnExit = true;
      } else {
        // If we're restoring, don't clear localStorage
        window.brewGuideShouldClearOnExit = false;
      }
    }
  }, []);

  // Clear localStorage when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.brewGuideShouldClearOnExit) {
        localStorage.removeItem('brewGuideSelectedProduct');
        localStorage.removeItem('brewGuideLastVisited');
      }
    };
  }, []);

  // Handle scrolling when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      // Simple approach: wait for DOM to render, then scroll
      setTimeout(() => {
        const brewingSection = document.querySelector('.brewing-methods-section');
        if (brewingSection) {
          // Calculate the exact position to scroll to (top of section with offset)
          const sectionTop = brewingSection.offsetTop;
          const offset = 120; // Adjust this value to control how much space above the section
          const targetPosition = Math.max(0, sectionTop - offset);
          
          // Since the page isn't scrollable, let's try a different approach
          try {
            // Add padding to the brewing section to create stable offset
            brewingSection.style.paddingTop = `${offset}px`;
            
            // Now scroll the section into view
            brewingSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
            
          } catch (error) {
            console.error('BrewGuides: Error with scrollIntoView approach:', error);
          }
        }
      }, 300);
    }
  }, [selectedProduct]);

  return (
    <Layout>
      <SEO title="Brew Guides" description="Master the art of brewing your Vee/Ra botanical blends with our expert guides" />
      
      <div className="brew-guides-page">
        <div className="container">
          {/* Header */}
          <div className="brew-guides-header">
            <h1 className="brew-guides-header__title">Brew Guides</h1>
            <p className="brew-guides-header__subtitle">
              Master the art of brewing your Vee/Ra botanical blends with our expert guides.
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
                    <p className="product-card__subtitle">{product.subtitle}</p>
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
                        className="brewing-method-card__button brewing-method-card__button--coming-soon"
                        title="Video guides are coming soon! Check back later for step-by-step video instructions."
                      >
                        Video Guide Coming Soon
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
      sort: { fields: [frontmatter___date], order: DESC }
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

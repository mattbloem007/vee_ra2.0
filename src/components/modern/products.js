import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const Products = () => {
  // Function to extract title and subtitle from product title
  const extractTitleAndSubtitle = (fullTitle) => {
    if (!fullTitle) return { title: '', subtitle: '' };
    
    // Split by dash and trim whitespace
    const parts = fullTitle.split('-').map(part => part.trim());
    
    if (parts.length >= 2) {
      return {
        title: parts[0],
        subtitle: parts.slice(1).join(' - ')
      };
    }
    
    // If no dash, return the full title as title with no subtitle
    return {
      title: fullTitle,
      subtitle: ''
    };
  };

  const data = useStaticQuery(graphql`
    query ProductsQuery {
      allShopifyProduct {
        edges {
          node {
            featuredImage {
              gatsbyImageData
            }
            description
            title
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            shopifyId
            tags
          }
        }
      }
    }
  `);

  const products = data.allShopifyProduct.edges;
  
  // Custom sorting function to order products as requested
  const sortProducts = (productList) => {
    const orderMap = {
      'mood magick': 1,
      'moon mylk': 2,
      'ritual roots': 3
    };
    
    return productList.sort((a, b) => {
      const titleA = a.node.title.toLowerCase();
      const titleB = b.node.title.toLowerCase();
      
      // Check if titles contain our target product names
      const getOrder = (title) => {
        for (const [key, value] of Object.entries(orderMap)) {
          if (title.includes(key)) return value;
        }
        return 999; // Default order for other products
      };
      
      return getOrder(titleA) - getOrder(titleB);
    });
  };
  
  // Filter and sort Botanical Blends (Premix Blends)
  const premixBlends = sortProducts(products.filter(({ node }) => 
    node.tags && node.tags.some(tag => 
      tag.toLowerCase().includes('blend')
    )
  ));
  
  const nutritionalJourneys = products.filter(({ node }) => 
    node.tags && node.tags.some(tag => 
      tag.toLowerCase().includes('journey') || 
      tag.toLowerCase().includes('nutritional') ||
      tag.toLowerCase().includes('wellness')
    )
  );
  
  // Fallback: if no tags match, use manual categorization
  // You can adjust these indices based on your product order
  const fallbackBlends = sortProducts(products.slice(0, 3));
  const fallbackJourneys = products.slice(3);

  const formatPrice = (price) => {
    if (price.maxVariantPrice.amount === price.minVariantPrice.amount) {
      return `R${parseFloat(price.maxVariantPrice.amount).toFixed(2)}`;
    } else {
      return `R${parseFloat(price.minVariantPrice.amount).toFixed(2)} - R${parseFloat(price.maxVariantPrice.amount).toFixed(2)}`;
    }
  };

  return (
    <section className="products">
      <div className="container">
        {/* Premix Blends Collection */}
        <div className="products-collection">
          <div className="products-collection__header">
            <h2 className="products-collection__title">Botanical Blends</h2>
           {/* <p className="products-collection__subtitle">
              Our signature cacao and/or botanical blends crafted for wellness and ritual
            </p>*/}
          </div>
          <div className="products__grid">
            {(premixBlends.length > 0 ? premixBlends : fallbackBlends).map(({ node }) => (
              <div key={node.shopifyId} className="product-card">
                <Link to={`/store/${node.title}`} className="product-card__link">
                  <div className="product-card__image">
                    <GatsbyImage 
                      image={node.featuredImage.gatsbyImageData}
                      alt={node.title}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__content">
                    {(() => {
                      const { title, subtitle } = extractTitleAndSubtitle(node.title);
                      return (
                        <>
                          <h3 className="product-card__name">{title}</h3>
                          {subtitle && (
                            <p className="product-card__subtitle">{subtitle}</p>
                          )}
                          <div className="product-card__price">{formatPrice(node.priceRangeV2)}</div>
                        </>
                      );
                    })()}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Vee/Ra Nutritional Journeys Collection */}
        <div className={`products-collection products-collection--nutritional-journeys ${(nutritionalJourneys.length > 0 ? nutritionalJourneys.length : fallbackJourneys.length) <= 2 ? 'products-collection--few-products' : ''}`}>
          <div className="products-collection__header">
            <h2 className="products-collection__title">Vee/Ra Nutritional Journeys</h2>
            <p className="products-collection__subtitle">
              Specialised wellness journeys and nutritional support
            </p>
          </div>
          <div className="products__grid">
            {(nutritionalJourneys.length > 0 ? nutritionalJourneys : fallbackJourneys).map(({ node }) => (
              <div key={node.shopifyId} className="product-card">
                <Link to={`/store/${node.title}`} className="product-card__link">
                  <div className="product-card__image">
                    <GatsbyImage 
                      image={node.featuredImage.gatsbyImageData}
                      alt={node.title}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__content">
                    {(() => {
                      const { title, subtitle } = extractTitleAndSubtitle(node.title);
                      return (
                        <>
                          <h3 className="product-card__name">{title}</h3>
                          {subtitle && (
                            <p className="product-card__subtitle">{subtitle}</p>
                          )}
                          <div className="product-card__price">{formatPrice(node.priceRangeV2)}</div>
                        </>
                      );
                    })()}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products; 
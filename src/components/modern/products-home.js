import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { slugify } from '../../utils/utilityFunctions';

const ProductsHome = () => {
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
    query ProductsHomeQuery {
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
  
  // Filter for Botanical Blends (Premix Blends) only
  const botanicalBlends = products.filter(({ node }) => 
    node.tags && node.tags.some(tag => 
      tag.toLowerCase().includes('blend')
    )
  );
  
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
  
  // Sort and limit to 3 products for home page display
  const displayProducts = sortProducts(botanicalBlends).slice(0, 3);

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
        <div className="products__header">
          <h2 className="products__title">Botanical Blends</h2>
          <p className="products__subtitle">
            Our signature cacao and coffee alternatives crafted for wellness and ritual
          </p>
        </div>
        <div className="products__grid">
          {displayProducts.map(({ node }) => {
            const { title, subtitle } = extractTitleAndSubtitle(node.title);
            return (
              <div key={node.shopifyId} className="product-card">
                <Link to={`/store/${slugify(node.title)}`} className="product-card__link">
                  <div className="product-card__image">
                    <GatsbyImage 
                      image={node.featuredImage.gatsbyImageData}
                      alt={node.title}
                      className="product-card__img"
                    />
                  </div>
                                     <div className="product-card__content">
                     <h3 className="product-card__name">{title}</h3>
                     {subtitle && (
                       <p className="product-card__subtitle">{subtitle}</p>
                     )}
                     <div className="product-card__price">{formatPrice(node.priceRangeV2)}</div>
                   </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="products__cta">
          <Link to="/store" className="products__link">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsHome;

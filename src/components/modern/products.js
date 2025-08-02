import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const Products = () => {
  const data = useStaticQuery(graphql`
    query ProductsQuery {
      allShopifyProduct(limit: 3) {
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
          }
        }
      }
    }
  `);

  const products = data.allShopifyProduct.edges;

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
          <h2 className="products__title">Our Blends</h2>
          <p className="products__subtitle">
            Each blend is crafted to support your unique journey
          </p>
        </div>
        <div className="products__grid">
          {products.map(({ node }) => (
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
                  <h3 className="product-card__name">{node.title}</h3>
                  <p className="product-card__description">
                    {node.description && node.description.length > 80 
                      ? `${node.description.substring(0, 80)}...` 
                      : node.description
                    }
                  </p>
                  <div className="product-card__price">{formatPrice(node.priceRangeV2)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="products__cta">
          <Link to="/store" className="btn btn--primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products; 
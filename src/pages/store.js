import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const Store = () => {
    const data = useStaticQuery(graphql`
      query StoreQuery {
        allShopifyProduct {
          edges {
            node {
              featuredImage {
                gatsbyImageData
              }
              description
              title
              variants {
                price
                title
              }
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
        <Layout>
            <SEO title="Shop - Vee/Ra Decadent Botanical Blends" description="Explore our ceremonial cacao blends" />
            
            <div className="store-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/" className="breadcrumb__link">Home</Link>
                        <span className="breadcrumb__separator">/</span>
                        <span className="breadcrumb__current">Shop</span>
                    </nav>

                    {/* Store Header */}
                    <header className="store-header">
                        <h1 className="store-title">Our Blends</h1>
                        <p className="store-subtitle">
                            Discover our carefully crafted ceremonial cacao blends, each designed to support your unique journey
                        </p>
                    </header>

                    {/* Products Grid */}
                    <div className="store-grid">
                        {products.map(({ node }) => (
                            <div key={node.shopifyId} className="store-product-card">
                                <Link to={`/store/${node.title}`} className="store-product-link">
                                    <div className="store-product-image">
                                        <GatsbyImage 
                                            image={node.featuredImage.gatsbyImageData}
                                            alt={node.title}
                                            className="store-product-img"
                                        />
                                    </div>
                                    <div className="store-product-content">
                                        <h3 className="store-product-title">{node.title}</h3>
                                        <div className="store-product-price">
                                            {formatPrice(node.priceRangeV2)}
                                        </div>
                                        {node.description && (
                                            <p className="store-product-description">
                                                {node.description.length > 100 
                                                    ? `${node.description.substring(0, 100)}...` 
                                                    : node.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Store;

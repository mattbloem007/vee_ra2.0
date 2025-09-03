import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      contentfulFooter {
        logo {
          gatsbyImageData
        }
      }
      allShopifyProduct {
        edges {
          node {
            title
            shopifyId
            featuredImage {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const logo = data.contentfulFooter?.logo?.gatsbyImageData;
  const slogan = " ";
  const products = data.allShopifyProduct.edges;
  console.log(products);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            {logo ? (
              <GatsbyImage image={logo} alt="Vee/Ra" />
            ) : (
              <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>Vee/Ra</h3>
            )}
            <h6 className="footer__slogan">
              {slogan || " "}
            </h6>
          </div>
          
          <div className="footer__links">
            <div className="footer__section">
              <h4>Shop</h4>
              <Link to="/store">All Products</Link>
              {(() => {
                // Sort products to ensure specific order: Mood Magick, Moon Mylk, Ritual Roots, then others
                const sortedProducts = [...products].sort((a, b) => {
                  const titleA = a.node.title.toLowerCase();
                  const titleB = b.node.title.toLowerCase();
                  
                  // Priority order
                  if (titleA.includes('mood magick')) return -1;
                  if (titleB.includes('mood magick')) return 1;
                  if (titleA.includes('moon mylk')) return -1;
                  if (titleB.includes('moon mylk')) return 1;
                  if (titleA.includes('ritual roots')) return -1;
                  if (titleB.includes('ritual roots')) return 1;
                  
                  return 0;
                });
                
                // Limit to 3 products after sorting
                const limitedProducts = sortedProducts.slice(0, 3);
                
                return limitedProducts.map(({ node }) => {
                  const slugify = (text) => {
                    return text
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]+/g, '')
                      .replace(/--+/g, '-')
                      .replace(/^-+/, '')
                      .replace(/-+$/, '');
                  };
                  
                  return (
                    <Link key={node.shopifyId} to={`/store/${slugify(node.title)}`}>
                      {node.title.indexOf("-") > 0 ? node.title.slice(0, node.title.indexOf("-")) : node.title}
                    </Link>
                  );
                });
              })()}
            </div>
            
            <div className="footer__section">
              <h4>About</h4>
              <Link to="/about">Our Story</Link>
              <Link to="/values">Our Values</Link>
              {/*<Link to="/about">Ingredients</Link>
              <Link to="/about">Process</Link>*/}
            </div>
            
            <div className="footer__section">
              <h4>Learn</h4>
              <Link to="/news">News & Articles</Link>
            </div>
            
            <div className="footer__section">
              <h4>Support</h4>
              <Link to="/contact">Contact</Link>
              {/*<Link to="/shipping">Shipping</Link>
              <Link to="/returns">Returns</Link>*/}
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__social">
            <a href="https://instagram.com/vee_ra" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
              <FaInstagram />
            </a>
            <a href="mailto:info@veera.co.za" aria-label="Send us an email">
              <FaEnvelope />
            </a>
          </div>
          
          <div className="footer__legal">
            <span>&copy; 2025 Vee/Ra. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
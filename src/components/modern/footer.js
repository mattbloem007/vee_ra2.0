import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-29.png"}) {
        childImageSharp {
          gatsbyImageData
        }
      }
      allShopifyProduct {
        edges {
          node {
            title
            shopifyId
          }
        }
      }
    }
  `);

  const logo = data.file.childImageSharp.gatsbyImageData;
  const products = data.allShopifyProduct.edges;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <GatsbyImage image={logo} alt="Vee/Ra" />
            <h6 className="footer__slogan">Sacred Cacao for Modern Rituals</h6>
          </div>
          
          <div className="footer__links">
            <div className="footer__section">
              <h4>Shop</h4>
              <Link to="/store">All Products</Link>
              {/*products.map(({ node }) => (
                <Link key={node.shopifyId} to={`/store/${node.title}`}>
                  {node.title.indexOf("-") > 0 ? node.title.slice(0, node.title.indexOf("-")) : node.title}
                </Link>
              ))*/}
            </div>
            
            <div className="footer__section">
              <h4>About</h4>
              <Link to="/about">Our Story</Link>
              <Link to="/values">Our Values</Link>
              {/*<Link to="/about">Ingredients</Link>
              <Link to="/about">Process</Link>*/}
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
            <span>&copy; 2024 Vee/Ra. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
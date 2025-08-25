import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { useStore } from "../../context/StoreContext";
import { useBodyScroll } from "../../hooks/useBodyScroll";

const Header = () => {
  const { cartData } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { enableScroll, disableScroll } = useBodyScroll();

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-29.png"}) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const logo = data.file.childImageSharp.gatsbyImageData;
  const cartItemCount = cartData ? cartData.lines.edges.length : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  // Cleanup function to reset body overflow when component unmounts or menu closes
  const closeMenu = () => {
    setIsMenuOpen(false);
    enableScroll();
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <GatsbyImage image={logo} alt="Vee/Ra" />
          </Link>

          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            <div className="header__nav-content">
              <Link to="/" className="header__link" onClick={closeMenu}>Home</Link>
              <Link to="/store" className="header__link" onClick={closeMenu}>Store</Link>
              <Link to="/about" className="header__link" onClick={closeMenu}>About</Link>
              <Link to="/news" className="header__link" onClick={closeMenu}>Learn</Link>
              <Link to="/brew-guides" className="header__link" onClick={closeMenu} >Brew Guides</Link>
              <Link to="/contact" className="header__link" onClick={closeMenu}>Contact</Link>
            </div>
          </nav>

          <div className="header__actions">
            <Link to="/cart" className="header__cart">
              <span className="header__cart-icon">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="cart-svg-icon"
                >
                  <path 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {cartItemCount > 0 && (
                <span className="header__cart-count">{cartItemCount}</span>
              )}
            </Link>
            
            <button 
              className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
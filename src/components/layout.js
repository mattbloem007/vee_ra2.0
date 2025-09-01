import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/modern/header";
import Footer from "../components/modern/footer";
import '../scss/modern.scss';

const Layout = (props) => {
  let { children } = props;

  useEffect(() => {
    // Font loading optimization
    const loadFonts = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        } else {
          // Fallback for browsers without document.fonts API
          setTimeout(() => {
            document.documentElement.classList.add('fonts-loaded');
          }, 1000);
        }
        document.documentElement.classList.add('fonts-loaded');
      } catch (error) {
        console.log('Fonts loaded with fallback');
        // Fallback: add class after a delay
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
        }, 1000);
      }
    };
    
    loadFonts();
  }, []);

  return (
    <div className="modern-wrapper">
        <Header />
        <main className="main">{children}</main>
        <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

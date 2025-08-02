import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/modern/header";
import Footer from "../components/modern/footer";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { scrollToTop, initScrollRestoration } from "../utils/scrollRestoration";
import '../scss/modern.scss';

const Layout = (props) => {
  let { children } = props;

  // Use custom scroll to top hook
  useScrollToTop();

  // Initialize scroll restoration and reset body overflow on every page change
  useEffect(() => {
    initScrollRestoration();
    document.body.style.overflow = 'unset';
    // Force scroll to top immediately
    scrollToTop();
    
    return () => {
      document.body.style.overflow = 'unset';
    };
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

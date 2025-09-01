import React, { useEffect } from "react";
import { useLocation } from "@reach/router";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Force scroll to top using multiple methods
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try after a short delay
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Global scroll to top function
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', forceScrollToTop);
    
    // Listen for beforeunload events
    window.addEventListener('beforeunload', forceScrollToTop);
    
    // Use MutationObserver to detect page content changes
    const observer = new MutationObserver(() => {
      forceScrollToTop();
    });
    
    // Observe changes to the main content area
    if (document.querySelector('main')) {
      observer.observe(document.querySelector('main'), {
        childList: true,
        subtree: true
      });
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('popstate', forceScrollToTop);
      window.removeEventListener('beforeunload', forceScrollToTop);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollToTop;

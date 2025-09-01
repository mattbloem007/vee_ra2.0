import { useEffect } from 'react';
import { useLocation } from '@reach/router';

export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Immediately scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Also ensure scroll position is reset after a brief moment
    // to handle any delayed rendering
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
}; 
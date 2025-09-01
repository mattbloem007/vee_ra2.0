// Scroll restoration utility
export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    // Simple and reliable scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
};

// Disable browser's scroll restoration
export const disableScrollRestoration = () => {
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
};

// Initialize scroll restoration
export const initScrollRestoration = () => {
  disableScrollRestoration();
  
  // Listen for route changes
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      scrollToTop();
    });
  }
}; 
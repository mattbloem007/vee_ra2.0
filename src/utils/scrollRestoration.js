// Scroll restoration utility
export const scrollToTop = () => {
  // Multiple methods to ensure scroll to top works
  if (typeof window !== 'undefined') {
    // Method 1: Direct scroll
    window.scrollTo(0, 0);
    
    // Method 2: Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate effect
    });
    
    // Method 3: Set scroll position directly
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
import { useEffect } from 'react';

export const useBodyScroll = () => {
  useEffect(() => {
    // Ensure body scroll is enabled on mount
    document.body.style.overflow = 'unset';
    
    // Cleanup function to reset body scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  const enableScroll = () => {
    document.body.style.overflow = 'unset';
  };
  
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  
  return { enableScroll, disableScroll };
}; 
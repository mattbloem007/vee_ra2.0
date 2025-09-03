import React, { createContext, useContext, useState, useEffect } from 'react';

const BrewGuideContext = createContext();

export const useBrewGuide = () => {
  const context = useContext(BrewGuideContext);
  if (!context) {
    throw new Error('useBrewGuide must be used within a BrewGuideProvider');
  }
  return context;
};

export const BrewGuideProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastVisitedProduct, setLastVisitedProduct] = useState(null);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProduct = localStorage.getItem('brewGuideSelectedProduct');
      const savedLastVisited = localStorage.getItem('brewGuideLastVisited');
      
      if (savedProduct) {
        try {
          setSelectedProduct(JSON.parse(savedProduct));
        } catch (error) {
          console.error('Error parsing saved brew guide product:', error);
        }
      }
      
      if (savedLastVisited) {
        try {
          setLastVisitedProduct(JSON.parse(savedLastVisited));
        } catch (error) {
          console.error('Error parsing saved last visited product:', error);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedProduct) {
        localStorage.setItem('brewGuideSelectedProduct', JSON.stringify(selectedProduct));
      } else {
        localStorage.removeItem('brewGuideSelectedProduct');
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (lastVisitedProduct) {
        localStorage.setItem('brewGuideLastVisited', JSON.stringify(lastVisitedProduct));
      } else {
        localStorage.removeItem('brewGuideLastVisited');
      }
    }
  }, [lastVisitedProduct]);

  const selectProduct = (product) => {
    setSelectedProduct(product);
    // When selecting a product, also update the last visited
    setLastVisitedProduct(product);
  };

  const clearSelection = () => {
    setSelectedProduct(null);
    // Also clear the last visited product to prevent unwanted restoration
    setLastVisitedProduct(null);
  };

  const restoreLastVisited = () => {
    if (lastVisitedProduct) {
      setSelectedProduct(lastVisitedProduct);
      return true;
    }
    return false;
  };

  const clearLastVisited = () => {
    setLastVisitedProduct(null);
  };

  // Add a function specifically for setting last visited without changing selected
  const setLastVisitedFromVideoGuide = (product) => {
    setLastVisitedProduct(product);
  };

  return (
    <BrewGuideContext.Provider
      value={{
        selectedProduct,
        lastVisitedProduct,
        selectProduct,
        clearSelection,
        restoreLastVisited,
        clearLastVisited,
        setLastVisitedFromVideoGuide,
      }}
    >
      {children}
    </BrewGuideContext.Provider>
  );
};

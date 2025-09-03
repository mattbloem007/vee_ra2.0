import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import { useStore } from "../context/StoreContext";
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import { useLocation } from "@reach/router";

const CartPage = () => {
  const { fetchCartDetails, cartData, removeFromCart, createCheckoutUrl, updateCart } = useStore();
  const [loading, setLoading] = useState(true); // Manage loading state
  const [items, setItems] = useState([])
  const [completed, setCompleted] = useState(false)
  const [cartId, setCartId] = useState({})
  const location = useLocation();


  // Fetch cart details on mount
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem("cartId");
      if (cartId && (!cartData || cartData.id !== cartId)) {
        try {
          await fetchCartDetails(cartId); // Ensure the latest cart data
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
      setCartId(cartId)
      setLoading(false); // Set loading to false once cart is initialized
      // localStorage.setItem("checkoutCompleted", "true"); // Save to localStorage if needed
      // localStorage.removeItem("cartId");
      // // Optionally reset state (cartId and cart data) in context
      // setCartId(null);


    };

    initializeCart();
  }, [fetchCartDetails, cartData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("checkout") === "success") {
      setCompleted(true);
      localStorage.setItem("checkoutCompleted", "true"); // Save to localStorage if needed
      localStorage.removeItem("cartId");
      // Optionally reset state (cartId and cart data) in context
      setCartId(null);
    }
  }, [location.search]);

  const handleCheckout = async () => {
    // Prevent checkout if cart is empty
    if (isCartEmpty) {
      return;
    }
    
    const checkoutUrl = await createCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirect user to Shopify checkout
      //setCompleted(true)
    }
  };

  console.log("DATA", cartData)

  // Determine if cart is empty
  const isCartEmpty = !cartData || !cartData.lines || cartData.lines.edges.length === 0;

  if (cartData) {
    const { lines, estimatedCost } = cartData;
    console.log("estimatedCost", estimatedCost)
    return (
      <div className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1 cart-container">
        <SEO title="Cart" />
        
        {/* Cart Header with Back Button */}
        <div className="cart-header">
          <div className="cart-header__container">
            <Link to="/store" className="cart-back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Store</span>
            </Link>
            <h1 className="cart-header__title">Shopping Cart</h1>
          </div>
        </div>

        <CartItemList
          completed={completed}
          items={cartData}
          loading={loading}
          cartId={cartId}
          removeFromCart={item => removeFromCart(item)}
          updateCart={updateCart}
        />
        {!loading && !completed && (
          <CartSummary
            estimatedCost={estimatedCost}
            handleCheckout={handleCheckout}
            isCartEmpty={isCartEmpty}
          />
        )}
      </div>
    );
  }
  else {
    return (
      <div className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1 cart-container">
        <SEO title="Cart" />
        
        {/* Cart Header with Back Button */}
        <div className="cart-header">
          <div className="cart-header__container">
            <Link to="/store" className="cart-back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Store</span>
            </Link>
            <h1 className="cart-header__title">Shopping Cart</h1>
          </div>
        </div>

        <CartItemList
          completed={completed}
          items={cartData}
          loading={loading}
          cartId={cartId}
          removeFromCart={item => removeFromCart(item)}
          updateCart={updateCart}
        />
        {!loading && !completed && (
          <CartSummary
            estimatedCost={0}
            handleCheckout={handleCheckout}
            isCartEmpty={true}
          />
        )}
      </div>
    );
  }

};

export default CartPage;

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
  const checkoutUrl = await createCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirect user to Shopify checkout
      //setCompleted(true)
    }
  };

  console.log("DATA", cartData)

  if (cartData) {
    const { lines, estimatedCost } = cartData;
    console.log("estimatedCost", estimatedCost)
    return (
      <div style={{marginLeft: "150px", marginRight: "150px"}} className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1">
      <SEO title="Cart" />
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
          />
        )}
      </div>
    );
  }
  else {
    return (
      <div style={{marginLeft: "150px", marginRight: "150px"}} className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1">
      <SEO title="Cart" />
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
          />
        )}
      </div>
    );
  }

};

export default CartPage;

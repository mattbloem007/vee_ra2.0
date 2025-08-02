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
  const [loading, setLoading] = useState(true);
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
          await fetchCartDetails(cartId);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
      setCartId(cartId)
      setLoading(false);
    };

    initializeCart();
  }, [fetchCartDetails, cartData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("checkout") === "success") {
      setCompleted(true);
      localStorage.setItem("checkoutCompleted", "true");
      localStorage.removeItem("cartId");
      setCartId(null);
    }
  }, [location.search]);

  const handleCheckout = async () => {
    const checkoutUrl = await createCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <Layout>
      <SEO title="Cart - Vee/Ra Decadent Botanical Blends" description="Your shopping cart" />
      
      <div className="cart-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Cart</span>
          </nav>

          {/* Cart Header */}
          <header className="cart-header">
            <h1 className="cart-title">Your Cart</h1>
          </header>

          {/* Cart Content */}
          <div className="cart-content">
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
                estimatedCost={cartData?.estimatedCost || { subtotalAmount: { amount: 0 } }}
                handleCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

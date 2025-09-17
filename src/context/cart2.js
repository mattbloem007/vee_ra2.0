/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { Styled, jsx } from "theme-ui";
import { Grid, Divider, Button, Card, Text } from "@theme-ui/components";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import { useStore } from "../context/StoreContext";
import { slugify } from '../utils/utilityFunctions';

const CartPage = () => {
  const { fetchCartDetails, cartData, removeFromCart, createCheckoutUrl, updateCart } = useStore();
  const [loading, setLoading] = useState(true); // Manage loading state

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
      setLoading(false); // Set loading to false once cart is initialized
    };

    initializeCart();
  }, [fetchCartDetails, cartData]);

  const handleCheckout = async () => {
  const checkoutUrl = await createCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirect user to Shopify checkout
    }
  };

  // Safeguard: Show loading state or empty cart
  if (loading) {
    return (
      <>
        <SEO title="Cart" />
        <h1>Cart</h1>
        <p>Loading...</p>
      </>
    );
  }

  if (!cartData || !cartData.lines || cartData.lines.edges.length === 0) {
    return (
      <div className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1">
        <SEO title="Cart" />
        <h1>Cart</h1>
        <p>Your shopping cart is empty.</p>
      </div>
    );
  }

  const { lines, estimatedCost } = cartData;
  console.log("DATA", cartData)

  const LineItem = ({ item }) => (
    <div
      className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1"
      sx={{
        display: "grid",
        gridGap: "15px",
        gridTemplateColumns: "120px 2fr 80px 80px",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div>
        <div sx={{ padding: 1, border: "1px solid gray" }}>
          {item.merchandise.product && <img src={item.merchandise.product.images.edges[0].node.url} />}
        </div>
      </div>
      <div>
        <Link
          to={`/store/${slugify(item.merchandise.product.title)}`}
          sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
        >
          {item.title}
        </Link>
        <ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: "none" }}>
          <li>
            <strong>Quantity: </strong>
            {item.quantity}
          </li>
        </ul>
      </div>
      <Button variant="link" onClick={() => removeFromCart(item.id)}>Delete</Button>
      <Text
        sx={{
          fontSize: 4,
          fontWeight: 700,
          marginLeft: "auto",
        }}
      >
        ${item.amount}
      </Text>
    </div>
  );

  return (
    <div className="rn-portfolio-area pt--200 pb--150 bg-color-white portfolio-style-1">
      <SEO title="Cart" />
      <h1>Cart</h1>
      {lines.edges.map(({ node: item }) => (
        <React.Fragment key={item.id}>
          <LineItem item={item} />
          <Divider sx={{ my: 3 }} />
        </React.Fragment>
      ))}
      <div sx={{ display: "flex" }}>
        <Card sx={{ marginLeft: "auto", minWidth: "10rem", p: 4 }}>
          <h3 sx={{ mt: 0, mb: 3 }}>Cart Summary</h3>
          <Divider />
          <Grid gap={1} columns={2} sx={{ my: 3 }}>
            <Text>Subtotal:</Text>
            {estimatedCost && <Text sx={{ marginLeft: "auto" }}>${estimatedCost.subtotalAmount.amount}</Text>}
            <Text>Shipping:</Text>
            <Text sx={{ marginLeft: "auto" }}>-</Text>
            <Text>Tax:</Text>
            {estimatedCost && <Text sx={{ marginLeft: "auto" }}>${estimatedCost.totalTaxAmount.amount}</Text>}
          </Grid>
          <Divider />
          <Grid gap={1} columns={2}>
            <Text variant="bold">Estimated Total:</Text>
            {estimatedCost &&
              <Text variant="bold" sx={{ marginLeft: "auto" }}>
                ${estimatedCost.totalAmount.amount}
              </Text>
            }
          </Grid>
          <Button sx={{ mt: 4, width: "100%" }} onClick={handleCheckout}>Checkout</Button>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;

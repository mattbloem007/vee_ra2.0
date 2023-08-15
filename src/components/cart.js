import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import CartItem from "../components/cartItem"
import Calltoaction from '../elements/calltoaction/calltoaction'


const Cart = (props) => {
  let { cart, onUpdateCartQty, onEmptyCart, onRemoveFromCart} = props

  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity);
  }

  const handleEmptyCart = () => {
    onEmptyCart();
  }

  const renderEmptyMessage = () => {
    if (cart) {
      if (cart.total_unique_items > 0) {
        return;
      }

      return (
        <p style={{color: "white"}}>
          You have no items in your shopping cart, start adding some!
        </p>
      );
    } else {
      return(<div></div>)
    }

  }

  const renderItems = () => {
    if (cart) {
      return(
        cart.line_items.map((lineItem) => (
          <CartItem
            item={lineItem}
            key={lineItem.id}
            className="cart inner"
            cart={cart}
            onUpdateCartQty={onUpdateCartQty}
            onRemoveFromCart={onRemoveFromCart}
            onEmptyCart={onEmptyCart}
          />
        ))
      );
    }
    else {
      return(<div></div>)
    }

  }
  const renderTotal = () => {
    if (cart) {
      return(
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "33px"}}>
          <p style={{color: "#eee"}}>Subtotal:</p>
          <p style={{fontWeight: "bold", color: "#eee"}}>{cart.subtotal.formatted_with_symbol}</p>
        </div>
      );
    }
    else {
      return(<div></div>)
    }

  }
    return (
      <div className="cartContainer" style={{background: "#A78035", paddingTop: "20px", borderRadius: "20px"}}>
          <div className="col-lg-12">
              <div className="page-top" style={{textAlign: "center"}}>
                  <h1 className="title_holder" style={{color: "#eee"}}>Your Shopping Cart</h1>
              </div>
          </div>
          { renderEmptyMessage() }
          { renderItems() }

          <div className="col-lg-12" style={{justifyContent: "space-between"}}>
            { renderTotal() }
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "23px"}}>
              <button className="rn-button btn-white" onClick={handleEmptyCart} style={{display: "flex", justifyContent: "center", padding: "0px 30px"}}><span style={{whiteSpace: "nowrap"}}>Empty Cart</span></button>
              <a href="/checkout"><button className="rn-button btn-white" style={{display: "flex", justifyContent: "center", padding: "0px 30px"}}><span style={{whiteSpace: "nowrap"}}>Checkout</span></button></a>
            </div>
          </div>
      </div>

    )
}
export default Cart;

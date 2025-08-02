import React from 'react'
import {Link} from 'gatsby'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default ({items, removeFromCart, loading, completed, cartId, updateCart}) => {

  const handleQuantityChange = (id, e) => {
    const newQuantity = e.target.value;
    if (newQuantity >= 0) {
      updateCart(id, newQuantity);
    }
  };

  if (loading) return (
    <div className="cart-loading">
      <div className="cart-loading__spinner"></div>
      <p>Loading your cart...</p>
    </div>
  );

  if (completed)
    return (
      <div className="cart-success">
        <div className="cart-success__icon">✓</div>
        <h2>Success!</h2>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </div>
    );

  if (items === null || items.lines.edges.length === 0)
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>You will need to add some items to the cart before you can checkout.</p>
        <Link to="/store" className="btn btn--primary">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="cart-items">
      {items.lines.edges.map((node) => {
        const id = node.node.id;
        const size = node.node.merchandise.title;
        const name = node.node.merchandise.product.title;
        const quantity = node.node.quantity;
        const imageUrl = node.node.merchandise.product.images.edges[0].node.url || '';

        return (
          <div key={id} className="cart-item">
            <div className="cart-item__image">
              <img src={imageUrl} alt={name} />
            </div>
            
            <div className="cart-item__content">
              <div className="cart-item__header">
                <h3 className="cart-item__title">
                  <Link to={`/store/${name}/`}>{name}</Link>
                </h3>
                <button 
                  className="cart-item__remove" 
                  onClick={() => removeFromCart(id)}
                  aria-label="Remove item"
                >
                  <AiOutlineClose />
                </button>
              </div>
              
              <div className="cart-item__details">
                <span className="cart-item__variant">{size}</span>
                <span className="cart-item__quantity">Quantity: {quantity}</span>
              </div>
              
              <div className="cart-item__controls">
                <label className="cart-item__quantity-label">
                  Quantity:
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(id, e)}
                    min="0"
                    className="cart-item__quantity-input"
                  />
                </label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

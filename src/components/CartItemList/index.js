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
        <div className="cart-empty__icon">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="cart-empty-svg-icon"
          >
            <path 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>You will need to add some items to the cart before you can checkout.</p>
        <Link to="/store" className="cart-empty__continue-shopping">
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
              </div>
              
              <div className="cart-item__controls">
                <div className="cart-item__quantity">
                  <div className="cart-item__quantity__row">
                    <label className="cart-item__quantity__label">Quantity</label>
                    <div className="cart-item__quantity__selector">
                      <button
                        type="button"
                        className="cart-item__quantity__btn cart-item__quantity__btn--decrease"
                        onClick={() => handleQuantityChange(id, { target: { value: Math.max(1, quantity - 1) } })}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(id, e)}
                        className="cart-item__quantity__input"
                        aria-label="Quantity"
                      />
                      <button
                        type="button"
                        className="cart-item__quantity__btn cart-item__quantity__btn--increase"
                        onClick={() => handleQuantityChange(id, { target: { value: quantity + 1 } })}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

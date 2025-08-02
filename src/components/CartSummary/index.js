import React from 'react'

export default ({
  handleCheckout,
  estimatedCost
}) => (
  <div className="cart-summary">
    <div className="cart-summary__content">
      <div className="cart-summary__total">
        <span className="cart-summary__label">Subtotal:</span>
        <span className="cart-summary__amount">
          R{estimatedCost && estimatedCost.subtotalAmount ? parseFloat(estimatedCost.subtotalAmount.amount).toFixed(2) : '0.00'}
        </span>
      </div>
      
      <button className="btn btn--primary cart-summary__checkout" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  </div>
)

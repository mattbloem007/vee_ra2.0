import React, { useState } from 'react';
import {useStaticQuery, graphql, navigate} from 'gatsby';
import { isMobile } from 'react-device-detect'


const Calltoaction = ({title, buttonText, action, isOutOfStock, addedToCart }) => {

  const [buttonLabel, setButtonLabel] = useState(buttonText);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log("isMobile", isMobile)

  const handleClick = () => {
      if (isOutOfStock) return;

      // Perform the action (e.g., add to cart)
      action();

      // Temporarily change button text
      setButtonLabel("Added!");
      setShowSuccess(true);

      // if (isMobile) {
      //   navigate("/cart")
      // }

      // Revert after 3 seconds
      setTimeout(() => {
          setButtonLabel(buttonText);
          setShowSuccess(false);
      }, 3000);
  };

  return (
      <div className="rn-callto-action-area callto-action-style-1 ptb--10">
          <div className="container">
              <div className="align-items-center" style={{ marginLeft: "0px" }}>
                  <div className="col-lg-6 col-md-6 col-12">
                      <div className="inner">
                          <h4 className="title">{title}</h4>
                      </div>
                  </div>
                  <div className="col-lg-12" style={{ paddingLeft: "0px", display: "flex", alignItems: "center" }}>
                      <div className="action-btn text-left text-md-left">
                          <button
                              className="rn-button btn-white"
                              style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "0px 30px",
                                  opacity: isOutOfStock ? 0.5 : 1,
                                  cursor: isOutOfStock ? "not-allowed" : "pointer"
                              }}
                              onClick={handleClick} // Use the new handleClick function
                              disabled={isOutOfStock}
                          >
                              <span style={{ whiteSpace: "nowrap" }}>
                                  {isOutOfStock ? "Out of Stock" : buttonLabel}
                              </span>
                          </button>
                      </div>
                      {showSuccess && (
                          <p style={{ color: "green", marginLeft: "10px" }}>✓ Added to cart!</p>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Calltoaction

import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';


const Calltoaction = ({title, buttonText, action, isOutOfStock }) => {

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
                              onClick={isOutOfStock ? null : action} // Prevent click if out of stock
                              disabled={isOutOfStock} // Disable button if out of stock
                          >
                              <span style={{ whiteSpace: "nowrap" }}>
                                  {isOutOfStock ? "Out of Stock" : buttonText}
                              </span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Calltoaction

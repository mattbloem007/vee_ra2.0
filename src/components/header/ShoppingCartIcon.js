import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'gatsby';
import { isMobile } from "react-device-detect";

const ShoppingCartIcon = ({cartCount, name}) => {
  console.log(cartCount)
  const showCartCount = () => {
    if (!cartCount) {
      return `(0)`
    }
    if (cartCount > 9) {
      return (
        <span style={{fontSize: 'smaller'}}>
          9<sup>+</sup>
        </span>
      )
    }
    return `(${cartCount})`
  }
  return (
    <Link className="menu-hover-link" to="/cart">
      <div className="cart-header-link">
        {` ${name} `}
        {showCartCount()}
      </div>
    </Link>
  )
}

export default ShoppingCartIcon

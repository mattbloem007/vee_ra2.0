import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useStaticQuery, graphql , Link} from 'gatsby';
import Img from "gatsby-image";
import Scrollspy from 'react-scrollspy';
import ShoppingCartIcon from './ShoppingCartIcon'
import { useStore } from "../../context/StoreContext"

// Start Header Area
const HeaderNoSidebar = () => {
    const headerQuerySidebar = useStaticQuery(graphql`
        query headerQuerySidebarQuery {
            allMenuJson {
                nodes {
                    title
                    path
                }
            },
            file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-28.png"}) {
                childImageSharp {
                    fixed (quality: 100, width: 70, height: 35) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const { cartData, fetchCartDetails } = useStore();
    let count = 0;

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
      };

      initializeCart();
    }, [fetchCartDetails, cartData]);

    if (cartData) {
      count = cartData.lines.edges.length
    }



    useEffect(() => {
        if(!isOverlayOpen){
          document.querySelector('.trigger-popup-menu').classList.remove('overlay-wrapper-open');
          document.querySelector('.hambergur-menu').classList.remove('hambergur-menu-open');
        }
    });

    const onMenuToggleClick = () => {
        setIsOverlayOpen(prevState => !prevState)
        document.querySelector('.trigger-popup-menu').classList.toggle('overlay-wrapper-open');
        document.querySelector('.hambergur-menu').classList.toggle('hambergur-menu-open');
    };

    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 10)
        })
    }, []);

    const veeraLogo = headerQuerySidebar.file.childImageSharp.fixed;

    return (
        <Fragment>
            <header className="rn-header header-default header-transparent d-block d-xl-none scrolled">
                <div className="header-inner">
                    {/* Header Logo  */}
                    <div className="header-left">
                        <div className="logo">
                            <Link to="/">
                                <Img fixed={veeraLogo}  />
                            </Link>
                        </div>
                    </div>
                    {/* Main Menu  */}
                    <div className="header-right" onClick={onMenuToggleClick}>
                        <div className="hambergur-menu">
                            <div className="hamburger-box">
                                <div className="hamburger-inner">

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Start Social Area  */}
                </div>
            </header>
            <div className="trigger-popup-menu">
                <div className="menu_full">
                    <div className="menu_wrapper">
                        <Scrollspy className="popup_mainmenu" items={['home','about', 'products' , 'news' , 'contact']} currentClassName="is-current" offset={-200}>
                            <li>
                                <a className="menu-hover-link" href="/#home" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="Home">Home</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#about" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="About">About</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#products" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="Our Brews">Our Brews</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#news" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="News">News</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <Link className="menu-hover-link" to="/store" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="Store">Store</span>
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#contact" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text="Contact">Contact</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                              <ShoppingCartIcon cartCount={count} name="Cart" />
                            </li>
                        </Scrollspy>
                    </div>
                    <div className="trigger_closer" onClick={onMenuToggleClick}>
                        <span className="text">Close</span>
                        <span className="icon"></span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
// End Header Area

HeaderNoSidebar.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderNoSidebar.defaultProps = {
  siteTitle: ``,
}

export default HeaderNoSidebar;

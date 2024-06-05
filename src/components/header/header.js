import React, { useState, useEffect, Fragment } from "react"
import PropTypes from "prop-types";
import {useStaticQuery, graphql , Link} from 'gatsby';
import Img from "gatsby-image";
import Scrollspy from 'react-scrollspy';
import { GatsbyImage } from "gatsby-plugin-image"
import { CircleSpinner } from "react-spinners-kit";
import CartNav from './cartnav'


// Start Header Area
const Header = (props) => {

    let {cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart, isCartVisible, setCartVisible} = props

    const headerQuery = useStaticQuery(graphql`
        query headerQuery {
            allMenuJson {
                nodes {
                    title
                    path
                }
            },
            file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-28.png"}) {
                childImageSharp {
                    gatsbyImageData(width: 150)
                }
            }
        }
    `);

    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 10)
        })
    }, [])

    const veeraLogo = headerQuery.file.childImageSharp.gatsbyImageData;

    return (
        <Fragment>
            <header className="rn-header header-default header-transparent scrolled d-none d-xl-block">  {/*scroll? "rn-header header-default header-transparent scrolled d-none d-xl-block" : "rn-header header-default header-transparent d-none d-xl-block"*/}
                <div className="header-inner">
                    <div className="container">
                        <div className="row align-items-center">

                            {/* Start Header Left  */}
                            <div className="col-lg-3">
                                <div className="header-left">
                                    <div className="logo">
                                        <Link to="/">
                                            <GatsbyImage image={veeraLogo}  />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Header Left  */}

                            {/* Start Mainmenu Area  */}
                            <div className="col-lg-9">
                                <div className="menu_wrapper">
                                    <Scrollspy className="mainmenuwrapper" items={['home','about', 'products',  'news' , 'contact']} currentClassName="is-current" offset={-200}>
                                        <li>
                                            <Link className="menu-hover-link" to="/#home">
                                                <span className="hover-item">
                                                    <span data-text="Home">Home</span>
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link className="menu-hover-link" to="/#about">
                                                <span className="hover-item">
                                                    <span data-text="About">About</span>
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link className="menu-hover-link" to="/#products">
                                                <span className="hover-item">
                                                    <span data-text="Our Brews">Our Brews</span>
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link className="menu-hover-link" to="/#news">
                                                <span className="hover-item">
                                                    <span data-text="News">News</span>
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" target="_blank" href="https://mygembox.co.za/collections/botanical-blends-1">
                                                <span className="hover-item">
                                                    <span data-text="Store">Store</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <Link className="menu-hover-link" to="/#contact">
                                                <span className="hover-item">
                                                    <span data-text="Contact">Contact</span>
                                                </span>
                                            </Link>
                                        </li>

                                        {/**<li>
                                          {cart && Object.entries(cart).length == 0 ?
                                            <CircleSpinner color="#A78035" size={30} loading={true} />
                                            :
                                            <CartNav
                                              cart={cart}
                                              onUpdateCartQty={onUpdateCartQty}
                                              onRemoveFromCart={onRemoveFromCart}
                                              onEmptyCart={onEmptyCart}
                                              scroll={scroll}
                                              isCartVisible={isCartVisible}
                                              setCartVisible={setCartVisible}
                                              />
                                            }
                                        </li>*/}

                                    </Scrollspy>
                                </div>
                            </div>
                            {/* End Mainmenu Area  */}
                        </div>
                    </div>




                </div>
            </header>

        </Fragment>
    )
}
// End Header Area

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;

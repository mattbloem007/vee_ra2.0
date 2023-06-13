import React, { useState, useEffect, Fragment } from "react"
import PropTypes from "prop-types";
import {useStaticQuery, graphql , Link} from 'gatsby';
import Img from "gatsby-image";
import Scrollspy from 'react-scrollspy';
import { GatsbyImage } from "gatsby-plugin-image"

// Start Header Area
const Header = () => {


    const headerQuery = useStaticQuery(graphql`
        query headerQuery {
            allMenuJson {
                nodes {
                    title
                    path
                }
            },
            file(relativePath: {eq: "images/Final Logo PNGs/Gold/Ra Logo-28.png"}) {
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
            <header className={scroll ? "rn-header header-default header-transparent scrolled d-none d-xl-block" : "rn-header header-default header-transparent d-none d-xl-block"}>
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
                                            <a className="menu-hover-link" href="/#home">
                                                <span className="hover-item">
                                                    <span data-text="Home">Home</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#about">
                                                <span className="hover-item">
                                                    <span data-text="About">About</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#products">
                                                <span className="hover-item">
                                                    <span data-text="Our Brews">Our Brews</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#news">
                                                <span className="hover-item">
                                                    <span data-text="News">News</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#contact">
                                                <span className="hover-item">
                                                    <span data-text="Contact">Contact</span>
                                                </span>
                                            </a>
                                        </li>

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

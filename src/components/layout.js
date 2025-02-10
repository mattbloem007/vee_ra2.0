import React from "react";
import PropTypes from "prop-types";
import Header from "../components/header/header";
import HeaderSidebar from "../components/header/headerSidebar";
import Footer from "../components/footer/footer";
import '../scss/style.scss';

const Layout = (props) => {
  let {
    children
  } = props
  return (
    <div className="main-wrapper active-dark">
        <Header />
        <HeaderSidebar />
        <main>{children}</main>
        <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

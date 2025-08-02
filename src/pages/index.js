import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/modern/hero";
import About from "../components/modern/about";
import Products from "../components/modern/products";
import Process from "../components/modern/process";
import BlogSection from "../components/modern/blog";
import Contact from "../components/modern/contact";

const IndexPage = () => (
  <Layout>
    <SEO title="Vee/Ra Decadent Botanical Blends" />
    <Hero />
    <About />
    <Products />
    <Process />
    <BlogSection />
    <Contact />
  </Layout>
)
export default IndexPage;

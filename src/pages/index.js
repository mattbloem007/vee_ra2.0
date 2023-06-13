import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import BannerParticles from "../components/homedefault/bannerParticles";
import About from "../components/homedefault/about";
import Project from "../components/homedefault/project";
import Testimonial from "../components/homedefault/testimonial";
import Service from "../components/homedefault/service";
import Brand from "../components/homedefault/brand";
import BlogPost from "../components/blogPost";
import Contact from "../elements/contact/contact";
import IntroVideo from "../components/homedefault/introVideo"

const IndexPage = () => (
  <Layout>
    <SEO title="Vee/Ra Decadent Botanical Blends" />
    <BannerParticles />
    <IntroVideo />
    <About />
    {/**<Service />*/}
    <div className="portfolio-id" id="portfolio">
      <Project />
      {/**<Brand />*/}
      <Testimonial />
    </div>
    <BlogPost />
    <Contact />
  </Layout>
)
export default IndexPage;

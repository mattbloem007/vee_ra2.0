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
import WhyVeera from "../components/homedefault/whyVeera"

const IndexPage = () => (
  <>
    <SEO title="Vee/Ra Decadent Botanical Blends" />
    <BannerParticles />
    {/**<IntroVideo />*/}
    <Project />
    {/**<Service />*/}
    <div className="portfolio-id" id="portfolio">
      <About />
      <WhyVeera />
      {/**<Brand />*/}
      {/**<Testimonial />*/}
    </div>
    <BlogPost />
    <Contact />
  </>
)
export default IndexPage;

import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/modern/hero";
import About from "../components/modern/about";
import Products from "../components/modern/products-home";
import Process from "../components/modern/process";
import BlogSection from "../components/modern/blog";
import Contact from "../components/modern/contact";

const IndexPage = () => {
  // Structured data for the homepage with cacao focus
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vee/Ra Botanical Blends - Premium Ceremonial Cacao & Coffee Alternatives",
    "description": "Premium ceremonial cacao blends and coffee alternative herbal wellness products. Expertly crafted cacao ceremonies, ceremonial grade cacao, and natural coffee substitutes for health, longevity, and inner harmony.",
    "url": "https://vee-ra.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vee-ra.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vee/Ra Botanical Blends",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vee-ra.netlify.app/static/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Cacao Blends & Wellness Products",
      "description": "Premium ceremonial cacao blends and coffee alternative herbal wellness products",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "Mood Magick Cacao Blend",
          "description": "Ceremonial cacao blend for emotional balance and mood enhancement",
          "url": "https://vee-ra.netlify.app/store#mood-magick",
          "category": "Ceremonial Cacao"
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "Moon Mylk Cacao Blend",
          "description": "Lunar-inspired ceremonial cacao blend for intuition and feminine energy",
          "url": "https://vee-ra.netlify.app/store#moon-mylk",
          "category": "Ceremonial Cacao"
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "Ritual Roots Coffee Alternative",
          "description": "Herbal coffee alternative blend with roasted bitter flavors for caffeine and coffee sensitive people",
          "url": "https://vee-ra.netlify.app/store#ritual-roots",
          "category": "Coffee Alternative"
        }
      ]
    }
  };

  return (
    <Layout>
      <SEO 
        title="Premium Cacao Blends & Coffee Alternatives | Vee/Ra Botanical Wellness"
        description="Discover premium ceremonial cacao blends and coffee alternative herbal wellness products. Expertly crafted cacao ceremonies, ceremonial grade cacao, and natural coffee substitutes for health and inner harmony."
        keywords="ceremonial cacao, ceremonial grade cacao, cacao ceremonies, cacao blend, ceremonial cacao blend, cacao wellness, cacao ritual, sacred cacao, medicinal cacao, coffee alternative, herbal coffee substitute, caffeine free coffee, coffee sensitive, botanical wellness, health supplements, longevity"
        image="/static/og-image.png"
        canonical="https://veera.co.za"
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <Products />
      <Process />
      <BlogSection />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

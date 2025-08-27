import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Products from "../components/modern/products";

const StorePage = () => {
  // Structured data for store page with cacao focus
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Vee/Ra Cacao Store",
    "description": "Premium ceremonial cacao blends and coffee alternative herbal wellness products. Shop ceremonial grade cacao, cacao ceremony kits, and wellness supplements.",
    "url": "https://vee-ra.netlify.app/store",
    "telephone": "+27-XX-XXX-XXXX",
    "email": "info@veera.co.za",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "South Africa"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "currenciesAccepted": "ZAR",
    "paymentAccepted": "Credit Card, Bank Transfer",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cacao Blends & Wellness Products",
      "description": "Premium ceremonial cacao blends and coffee alternative herbal wellness products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Mood Magick Cacao Blend",
            "description": "Ceremonial cacao blend for emotional balance and mood enhancement. Perfect for cacao ceremonies and daily wellness rituals.",
            "category": "Ceremonial Cacao",
            "brand": {
              "@type": "Brand",
              "name": "Vee/Ra Botanical Blends"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "ZAR",
              "price": "250.00"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Moon Mylk Cacao Blend",
            "description": "Lunar-inspired ceremonial cacao blend for intuition and feminine energy. Ideal for moon ceremonies and spiritual practices.",
            "category": "Ceremonial Cacao",
            "brand": {
              "@type": "Brand",
              "name": "Vee/Ra Botanical Blends"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "ZAR",
              "price": "250.00"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ritual Roots Coffee Alternative",
            "description": "Herbal coffee alternative blend with roasted bitter flavors. Perfect for caffeine and coffee sensitive people seeking a rich, warming morning ritual.",
            "category": "Coffee Alternative",
            "brand": {
              "@type": "Brand",
              "name": "Vee/Ra Botanical Blends"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "ZAR",
              "price": "250.00"
            }
          }
        }
      ]
    },
    "sameAs": [
      "https://instagram.com/veera_cacao"
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Specialty",
        "value": "Cacao & Wellness"
      },
      {
        "@type": "PropertyValue",
        "name": "Product Type",
        "value": "Premium Cacao Blends & Coffee Alternatives"
      },
      {
        "@type": "PropertyValue",
        "name": "Location",
        "value": "Cape Point, South Africa"
      }
    ]
  };

  return (
    <Layout>
      <SEO 
        title="Cacao Store | Premium Cacao Blends & Coffee Alternative Products"
        description="Shop premium cacao blends and coffee alternative herbal wellness products. Discover premium cacao, and coffee alternatives for health and ritual."
        keywords="ceremonial cacao store, cacao blend shop, ceremonial grade cacao, cacao ceremony kit, coffee alternative, herbal coffee substitute, caffeine free coffee, coffee sensitive, botanical wellness store, wellness products"
        image="https://vee-ra.netlify.app/static/store-og.jpg"
        canonical="https://vee-ra.netlify.app/store"
        structuredData={structuredData}
      />
      
      <div className="store-page">
        <div className="container">
          <div className="store-header">
            <h1>Vee/Ra Wellness Store</h1>
            <p className="store-subtitle">
              Discover our carefully curated collections of premium cacao blends and nutritional journeys. 
              Each product is crafted with intention for wellness, ritual, and inner harmony.
            </p>
          </div>
          
          <Products />
          
          <div className="store-info">
            <div className="cacao-info">
              <h2>About Our Cacao</h2>
              <p>
                Our cacao is sourced carefully. We only use fairtrade and organic cacao that is 
                crafted with intention for spiritual and wellness practices. Each 
                blend contains premium cacao combined with carefully 
                selected botanicals for enhanced benefits.
              </p>
            </div>
            
            <div className="coffee-alternative-info">
              <h2>About Our Coffee Alternatives</h2>
              <p>
                For those sensitive to caffeine or seeking coffee alternatives, 
                our Ritual Roots blend offers rich, roasted flavors without the 
                jitters. Perfect for morning rituals and those transitioning away 
                from coffee.
              </p>
            </div>
            
            <div className="shipping-info">
              <h2>Shipping & Returns</h2>
              <p>
                We ship within South Africa. 
                International shipping available.
              </p>
            </div>
            
            <div className="quality-assurance">
              <h2>Quality Assurance</h2>
              <p>
                All our products are crafted with organic where possible, and ethically sourced ingredients. 
                Each batch is tested for purity, potency, and quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StorePage;

/**
 * SEO Component
 * Handles meta tags, Open Graph, Twitter Cards, canonical URLs,
 * and supports multiple structured data schemas (JSON-LD)
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  title,
  description,
  lang = "en",
  meta = [],
  image = null,
  article = false,
  canonical = null,
  keywords = null,
  structuredData = null,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const {
    title: siteTitle,
    description: siteDescription,
    author,
    siteUrl,
  } = site.siteMetadata

  const metaDescription = description || siteDescription

  const metaImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : null

  const canonicalUrl = canonical || siteUrl

  /**
   * Default Organization schema
   * Always included unless explicitly overridden
   */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteTitle,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
    description: siteDescription,
    sameAs: [
      "https://instagram.com/veera_cacao",
    ],
  }

  /**
   * Normalize structured data into an array
   * Allows multiple schemas on a single page
   */
  const schemaArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  const finalSchemas = [organizationSchema, ...schemaArray]

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      link={[
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ]}
      meta={[
        // Basic Meta
        {
          name: "description",
          content: metaDescription,
        },
        {
          name: "author",
          content: author,
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "googlebot",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },

        // Optional keywords (legacy / non-Google)
        ...(keywords
          ? [
              {
                name: "keywords",
                content: keywords || "botanical blends, health, longevity, wellness, natural supplements, herbal medicine, vitality, inner harmony",
              },
            ]
          : []),

        // Open Graph
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: article ? "article" : "website",
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          property: "og:site_name",
          content: siteTitle,
        },
        {
          property: "og:locale",
          content: "en_US",
        },
        ...(metaImage
          ? [
              {
                property: "og:image",
                content: metaImage,
              },
              {
                property: "og:image:width",
                content: "1200",
              },
              {
                property: "og:image:height",
                content: "630",
              },
            ]
          : []),

        // Twitter
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          name: "twitter:creator",
          content: author,
        },
        {
          name: "twitter:site",
          content: author,
        },
        ...(metaImage
          ? [
              {
                name: "twitter:image",
                content: metaImage,
              },
            ]
          : []),

        // UI / PWA
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          content: "#A78035",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-title",
          content: siteTitle,
        },
      ].concat(meta)}
    >
      {/* Structured Data Schemas */}
      {finalSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string,
  article: PropTypes.bool,
  canonical: PropTypes.string,
  keywords: PropTypes.string,
  structuredData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
}

export default SEO

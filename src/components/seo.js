/**
 * Enhanced SEO component with comprehensive meta tags,
 * Open Graph, Twitter Cards, and structured data schema markup
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ 
  description, 
  lang, 
  meta, 
  title, 
  image, 
  article, 
  canonical,
  keywords,
  structuredData 
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

  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || null
  const canonicalUrl = canonical || site.siteMetadata.siteUrl

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": site.siteMetadata.title,
    "url": site.siteMetadata.siteUrl,
    "logo": null,
    "description": site.siteMetadata.description,
    "sameAs": [
      "https://instagram.com/veera_cacao"
    ]
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={canonical ? [{ rel: "canonical", href: canonicalUrl }] : []}
      meta={[
        // Basic Meta Tags
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords || "botanical blends, health, longevity, wellness, natural supplements, herbal medicine, vitality, inner harmony",
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          name: `robots`,
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: `googlebot`,
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },

        // Open Graph / Facebook
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: canonicalUrl,
        },
        ...(metaImage ? [
          {
            property: `og:image`,
            content: metaImage,
          },
          {
            property: `og:image:width`,
            content: `1200`,
          },
          {
            property: `og:image:height`,
            content: `630`,
          },
        ] : []),
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:locale`,
          content: `en_US`,
        },

        // Twitter
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...(metaImage ? [
          {
            name: `twitter:image`,
            content: metaImage,
          },
        ] : []),

        // Additional Meta Tags
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1, shrink-to-fit=no`,
        },
        {
          name: `theme-color`,
          content: `#A78035`,
        },
        {
          name: `msapplication-TileColor`,
          content: `#A78035`,
        },
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `default`,
        },
        {
          name: `apple-mobile-web-app-title`,
          content: site.siteMetadata.title,
        },
      ].concat(meta)}
    >
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  image: null,
  article: false,
  canonical: null,
  keywords: null,
  structuredData: null,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  article: PropTypes.bool,
  canonical: PropTypes.string,
  keywords: PropTypes.string,
  structuredData: PropTypes.object,
}

export default SEO

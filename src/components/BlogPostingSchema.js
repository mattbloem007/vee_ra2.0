import React from "react"
import { Helmet } from "react-helmet"

const BlogPostingSchema = ({ post, siteUrl }) => {
  if (!post) return null

  const {
    title,
    excerpt,
    slug,
    datePublished,
    dateModified,
    image,
    author,
    category
  } = post

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${slug}`
    },
    headline: title,
    description: excerpt.raw,
    image: image?.file?.url
      ? `https:${image.file.url}`
      : undefined,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          description: author.bio
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Vee/Ra",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`
      }
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    articleSection: category?.title
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default BlogPostingSchema

// BlogPosting schema builder
export const buildBlogPostingSchema = ({
  post,
  siteUrl,
  siteName,
  logoUrl,
}) => {
  if (!post) return null

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt.raw,
    image: post.image?.file?.url
      ? `https:${post.image.file.url}`
      : undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          description: post.author.bio,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    articleSection: post.category?.title,
  }
}

// FAQ schema builder
export const buildFaqSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.raw,
      },
    })),
  }
}

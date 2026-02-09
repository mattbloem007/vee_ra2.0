import React from 'react';
import { graphql, Link } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from "../components/layout";
import SEO from '../components/seo';
import {
  buildBlogPostingSchema,
  buildFaqSchema,
} from "../utils/schemaBuilders"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => <strong>{children}</strong>;
const Text = ({ children }) => <p>{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <div className="blog-image">
          <GatsbyImage image={node.data.target.gatsbyImageData} alt={node.data.target.title} />
        </div>
      );
    },
  },
};

const BlogDetails = ({ data, pageContext }) => {
  const post = data.contentfulBlogPost;
  const siteUrl = data.site.siteMetadata.siteUrl
  const siteName = data.site.siteMetadata.title

  const blogPostingSchema = buildBlogPostingSchema({
    post,
    siteUrl,
    siteName,
    logoUrl: `${siteUrl}/logo.png`,
  })

  const faqSchema = buildFaqSchema(post.faqs)

  const schemas = [
    blogPostingSchema,
    faqSchema,
  ].filter(Boolean) // removes nulls safely

  console.log(("POST", post))

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt.raw}
        image={post.image?.file?.url}
        canonical={`${siteUrl}/${post.slug}`}
        article
        structuredData={schemas}
      />
      <article className="blog-post">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/news" className="breadcrumb__link">News</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{post.title}</span>
          </nav>

          <div className="blog-content">
            {/* Featured Image */}
            {post.image && (
              <div className="blog-image">
                <GatsbyImage
                  image={post.image.gatsbyImageData}
                  alt={post.title}
                  className="blog-image__main"
                />
              </div>
            )}

            {/* Post Header */}
            <header className="blog-header">
              <h1 className="blog-title">{post.title}</h1>
              {post.createdAt && (
                <time className="blog-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </header>

            {/* Post Content */}
            <div className="blog-body">
              {post.body && (
                <div className="blog-content__text">
                  {documentToReactComponents(JSON.parse(post.body.raw), options)}
                </div>
              )}
            </div>

            {post.faqs && post.faqs.length > 0 && (
            <section>
              <h2>Frequently Asked Questions</h2>
              {post.faqs.map((faq, index) => (
                <div key={index}>
                  <h3>{faq.question}</h3>
                  <p>
                    {documentToReactComponents(JSON.parse(faq.answer.raw), options)}
                  </p>
                </div>
              ))}
            </section>
          )}

            {/* category */}
            {/*post.category && post.category.length > 0 && (
              <div className="blog-tags">
                <span className="blog-tags">category:</span>
                <div className="blog-tags__list">
                  {post.category.map((tag, index) => (
                    <Link key={index} to={`/tag/${tag}`} className="blog-tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )*/}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
query blogDetailsQuery ($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulBlogPost (slug: { eq: $slug }) {
      title
      excerpt {
        raw
      }
      datePublished
      dateModified
      slug
      createdAt
      image {
        gatsbyImageData
        title
      }
      body {
        raw
      }
      faqs {
        question
        answer {
          raw
        }
      }
      author {
        name
        bio
      }
    }
  }
`;

export default BlogDetails;

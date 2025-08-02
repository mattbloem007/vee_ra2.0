import React from 'react';
import { graphql, Link } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from "../components/layout";
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

  console.log(("POST", post))
  
  return (
    <Layout>
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
    contentfulBlogPost (slug: { eq: $slug }) {
      title
      slug
      createdAt
      image {
        gatsbyImageData
        title
      }
      body {
        raw
      }
    }
  }
`;

export default BlogDetails;

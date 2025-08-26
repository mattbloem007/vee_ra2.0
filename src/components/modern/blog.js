import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';

const Blog = ({ title, date, path, image, excerpt }) => {
  return (
    <article className="blog-card">
      <div className="blog-card__image">
        {image && (
          <Link to={`/blog/${path}`}>
            <GatsbyImage image={image} alt={title} className="blog-card__img" />
          </Link>
        )}
      </div>
      
      <div className="blog-card__content">
        {date && (
          <time className="blog-card__date">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
        
        {title && (
          <h3 className="blog-card__title">
            <Link to={`/news/${path}`}>{title}</Link>
          </h3>
        )}
        
        {excerpt && (
          <p className="blog-card__excerpt">{excerpt}</p>
        )}
        
        <div className="blog-card__link">
          <Link to={`/news/${path}`}>
            <span>Read More</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const blogQueryData = useStaticQuery(graphql`
    query BlogListQuery {
      allContentfulBlogPost(limit: 3, sort: {fields: createdAt, order: DESC}) {
        edges {
          node {
            title
            slug
            createdAt
            image {
              gatsbyImageData(width: 400, height: 250)
            }
            body {
              raw
            }
          }
        }
      }
    }
  `);

  const blogs = blogQueryData.allContentfulBlogPost.edges;

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-section__header">
          <h2 className="blog-section__title">
            News & Insights
          </h2>
          <p className="blog-section__subtitle">
            Discover wisdom, rituals, and insights for your sacred journey
          </p>
        </div>
        
        <div className="blog-grid">
          {blogs.map(blog => (
            <div className="blog-grid__item" key={blog.node.slug}>
              <Blog
                image={blog.node.image.gatsbyImageData}
                title={blog.node.title}
                path={blog.node.slug}
                date={blog.node.createdAt}
                excerpt={blog.node.body?.raw ? 
                  JSON.parse(blog.node.body.raw).content[0]?.content[0]?.value?.substring(0, 120) + '...' : 
                  'Read our latest insights on sacred rituals and botanical wisdom.'
                }
              />
            </div>
          ))}
        </div>
        
        <div className="blog-section__cta">
          <Link to="/news" className="blog-section__link">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 
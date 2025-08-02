import React, { useState, useMemo } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NewsPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, title

  const allPosts = data.allContentfulBlogPost.edges.map(edge => edge.node);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) ||
        (post.body?.raw && JSON.parse(post.body.raw).content[0]?.content[0]?.value?.toLowerCase().includes(term))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [allPosts, searchTerm, sortBy]);

  return (
    <Layout>
      <SEO title="News & Insights - Vee/Ra Decadent Botanical Blends" />
      
      <div className="news-page">
        <div className="container">
          {/* Header */}
          <header className="news-header">
            <nav className="breadcrumb">
              <Link to="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__separator">/</span>
              <span className="breadcrumb__current">News</span>
            </nav>
            
            <div className="news-header__content">
              <h1 className="news-header__title">News & Insights</h1>
              <p className="news-header__subtitle">
                Discover wisdom, rituals, and insights for your sacred journey
              </p>
            </div>
          </header>

          {/* Filters and Search */}
          <div className="news-filters">
            <div className="news-filters__search">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="news-search__input"
              />
            </div>
            
            <div className="news-filters__controls">
              <div className="news-filters__sort">
                <label htmlFor="sort-filter">Sort by:</label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="news-filter__select"
                >
                  <option value="date">Date (Newest)</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="news-results">
            <p className="news-results__count">
              Showing {filteredPosts.length} of {allPosts.length} articles
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="news-grid">
            {filteredPosts.map(post => (
              <article key={post.slug} className="news-card">
                <div className="news-card__image">
                  {post.image && (
                    <Link to={`/news/${post.slug}`}>
                      <GatsbyImage 
                        image={post.image.gatsbyImageData} 
                        alt={post.title}
                        className="news-card__img"
                      />
                    </Link>
                  )}
                </div>
                
                <div className="news-card__content">
                  <time className="news-card__date">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <h2 className="news-card__title">
                    <Link to={`/news/${post.slug}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="news-card__excerpt">
                    {post.body?.raw ? 
                      JSON.parse(post.body.raw).content[0]?.content[0]?.value?.substring(0, 150) + '...' : 
                      'Read our latest insights on sacred rituals and botanical wisdom.'
                    }
                  </p>
                  
                  <div className="news-card__link">
                    <Link to={`/news/${post.slug}`}>
                      <span>Read More</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="news-empty">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                }}
                className="news-empty__reset"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query NewsPageQuery {
    allContentfulBlogPost(sort: {createdAt: DESC}) {
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
`;

export default NewsPage; 
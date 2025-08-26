import React, { useState, useMemo } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NewsPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, title
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allPosts = data.allContentfulBlogPost.edges.map(edge => edge.node);

  // Extract unique categories from Contentful and posts
  const categories = useMemo(() => {
    // Get categories from Contentful
    const contentfulCategories = data.allContentfulBlogPostCategories?.edges?.map(edge => edge.node.category) || [];
    
    // Get categories from existing blog posts (as fallback)
    const postCategories = new Set(allPosts.map(post => post.category?.category).filter(Boolean));
    
    // Combine both sources, removing duplicates
    const allCategories = [...new Set([...contentfulCategories, ...postCategories])];
    
    // Sort categories alphabetically, but keep 'all' first
    const sortedCategories = allCategories.sort((a, b) => a.localeCompare(b));
    
    return ['all', ...sortedCategories];
  }, [data.allContentfulBlogPostCategories, allPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category?.category === selectedCategory);
    }

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
  }, [allPosts, selectedCategory, searchTerm, sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when changing category
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('date');
  };

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

          {/* Category Filters */}
          <div className="news-categories">
            <div className="news-categories__header">
              <h3 className="news-categories__title">Browse by Category</h3>
              <div className="news-categories__controls">
                <div className="news-categories__sort">
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
                <button 
                  onClick={clearAllFilters}
                  className="news-categories__clear"
                  disabled={selectedCategory === 'all' && !searchTerm}
                >
                  Clear All
                </button>
              </div>
            </div>
            
            {/* Search Field */}
            <div className="news-categories__search">
              <div className="search-input-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 19l-5.5-5.5M17 9.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="news-search__input"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="search-clear-btn"
                    aria-label="Clear search"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12.854 3.146a.5.5 0 0 1 0 .708L9.207 7.5l3.647 3.646a.5.5 0 0 1-.708.708L8.5 8.207l-3.646 3.647a.5.5 0 0 1-.708-.708L7.793 7.5 4.146 3.854a.5.5 0 0 1 .708-.708L8.5 6.793l3.646-3.647a.5.5 0 0 1 .708 0z" fill="currentColor"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="news-categories__grid">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`news-category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category === 'all' ? 'All Posts' : category}
                  {selectedCategory === category && (
                    <svg className="news-category-btn__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="news-results">
            <p className="news-results__count">
              Showing {filteredPosts.length} of {allPosts.length} articles
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
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
                  {post.category?.category && (
                    <span className="news-card__category">
                      {post.category.category}
                    </span>
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
              <div className="news-empty__icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or selecting a different category.</p>
              <button 
                onClick={clearAllFilters}
                className="news-empty__reset"
              >
                Clear All Filters
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
    allContentfulBlogPost(sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          createdAt
          category {
            category
          }
          image {
            gatsbyImageData(width: 400, height: 250)
          }
          body {
            raw
          }
        }
      }
    }
    allContentfulBlogPostCategories {
      edges {
        node {
          category
        }
      }
    }
  }
`;

export default NewsPage; 
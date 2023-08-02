import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Blog from "./blog";

const BlogPost = () => {
    const blogQueryData = useStaticQuery(graphql`
      query BlogListQuery {
            allContentfulBlogPost (limit: 4){
              edges {
                node {
                  title
                  slug
                  image {
                    fixed: gatsbyImageData(layout: FIXED, width: 374, height: 374)
                  }
                }
              }
            }
          }
  `)


    const blogs = blogQueryData.allContentfulBlogPost.edges;
    return (
        <div className="rn-post-area rn-section-gapBottom pt--200 bg-color-grey" id="news">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title mb--40">
                            <h2 className="title">Nourishment for your Mind <span className="bg">Readings</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row row--45">
                    {blogs.map(blog => (
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.8s" key={blog.node.slug}>
                            <Blog
                                image={blog.node.image.fixed}
                                title={blog.node.title}
                                path={blog.node.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogPost;

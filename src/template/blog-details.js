import React from 'react';
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import { slugify } from "../utils/utilityFunctions";
import { DiscussionEmbed } from 'disqus-react';
import Layout from "../components/layout";
import {GatsbyImage} from 'gatsby-plugin-image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span style={{color: "white"}}>{children}</span>
const Text = ({ children }) => <p style={{color: "white", textAlign: "center"}}>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const BlogDetails = ({data, pageContext}) => {

    return (
        <>
            <div className="blog-details-wrapper rn-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="post-image" style={{display: "flex", justifyContent: "center"}}>
                                <GatsbyImage image={data.contentfulBlogPost.image.fixed} alt={data.contentfulBlogPost.title}/>
                            </div>
                            <div className="post-single-title">
                                <h1 className="post-title">{data.contentfulBlogPost.title}</h1>
                            </div>
                            <div className="post-content">{documentToReactComponents(JSON.parse(data.contentfulBlogPost.body.raw, options))}</div>
                            {/**<div className="tag-list d-flex align-items-center">
                                <span>Tags:</span>
                                <div className="tags-cloud">
                                    {tags.map((tag) => (
                                        <a key={tag} href={`/tag/${slugify(tag)}`}>{tag}</a>
                                    ))}
                                </div>
                            </div>*/}

                        </div>
                    </div>
                    {/**<div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="blog-contact-form">
                                <div className="social-share-inner text-center pt--50">
                                    <h3>Share This Post</h3>
                                    <ul className="social-share-links liststyle d-flex justify-content-center">
                                        <li>
                                            <a className="facebook" target="_blank" rel="noopener noreferrer" href={'https://www.facebook.com/sharer.php?u=' +
                                            baseUrl +
                                            pageContext.slug
                                            }>
                                                <span>facebook</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="google" target="_blank" rel="noopener noreferrer" href={'https://plus.google.com/share?url=' +
                                            baseUrl +
                                            pageContext.slug

                                            }>
                                                <span>Google</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="linkedin" target="_blank" rel="noopener noreferrer" href={'https://www.linkedin.com/shareArticle?url=' +
                                            baseUrl +
                                            pageContext.slug
                                            }>
                                                <span>linkedin</span>
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                                <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        </>
    )
}

export const blogDetailsData = graphql`
query blogDetailsQuery ($slug: String!) {
    contentfulBlogPost (slug: { eq: $slug }) {
      title
      slug
      image {
        fixed: gatsbyImageData(layout: FIXED, height: 350, width: 510)
      }
      body {
        raw
      }

    }
}
`

export default BlogDetails;

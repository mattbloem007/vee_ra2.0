import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
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
        <div className="project-image">
          <GatsbyImage image={node.data.target.gatsbyImageData} alt={node.data.target.title} />
        </div>
      );
    },
  },
};

const ProjectDetails = ({ data }) => {
  const project = data.contentfulProjects;

  console.log(("PROJECT", project))
  
  const handleBuyNow = () => {
    if (project.title === "Moon Mylk") {
      navigate("/store/Moon%20Mylk%20-%20Gaba%20Food%20Supplement/");
    } else if (project.title === "Mood Magick") {
      navigate("/store/Mood%20Magick%20-%20Raw%20Cacao%20Drink/");
    } else if (project.title === "Ritual Roots") {
      navigate("/store/Ritual%20Roots%20-%20Immunity%20Booster%20Drink/");
    }
  };

  return (
    <Layout>
      <div className="project-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/projects" className="breadcrumb__link">Projects</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{project.title}</span>
          </nav>

          <div className="project-content">
            {/* Project Header */}
            <header className="project-header">
              <h1 className="project-title">{project.title}</h1>
              
            </header>

            {/* Project Image */}
            {project.featuredImage && (
              <div className="project-image">
                <GatsbyImage 
                  image={project.featuredImage.gatsbyImageData}
                  alt={project.title}
                  className="project-image__main"
                />
              </div>
            )}

            {/* Project Description */}
            {/*project.description && (
              <div className="project-description">
                <h2>About this project</h2>
                <div className="project-description__content">
                  {documentToReactComponents(JSON.parse(project.description.raw), options)}
                </div>
              </div>
            )*/}

            {/* Project Details */}
            {project.body && (
              <div className="project-details">
                <h2>Project details</h2>
                <div className="project-details__content">
                  {documentToReactComponents(JSON.parse(project.body.raw), options)}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="project-cta">
              <button onClick={handleBuyNow} className="btn btn--primary">
                Shop This Blend
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export const query = graphql `
query ProjectQuery($name: String!) {
  contentfulProjects (name: { eq: $name } ) {
            id
            name
            title
            featuredImage {
              gatsbyImageData
              title
            }
            body {
              raw
            }
            category
            projectId
            featuredImage {
            fixed: gatsbyImageData(layout: FIXED, width: 374, height: 374)
        }
  }
}
`

export default ProjectDetails;

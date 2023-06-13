
const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path');
const _ = require('lodash');


<<<<<<< HEAD
exports.onCreateNode = ({node , actions}) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node, 
=======
exports.onCreateNode = async ({node , actions, store, createNodeId, cache }) => {
    const { createNodeField, createNode } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
>>>>>>> 5ec1c145 (trying to upload)
            name: 'slug',
            value: slugFromTitle,
        });

        if (Object.prototype.hasOwnProperty.call(node.frontmatter, "author")) {
            createNodeField({
              node,
              name: "authorId",
              value: slugify(node.frontmatter.author)
            });
        }
    }
<<<<<<< HEAD
    
=======

>>>>>>> 5ec1c145 (trying to upload)
    if(node.internal.type === 'AuthorsJson'){
        createNodeField({
            node,
            name: "authorId",
            value: slugify(node.name)
        });
    }

<<<<<<< HEAD
=======
    if (node.internal.type !== "ChecProduct") {
      return
    }

    // download image and create a File node
    // with gatsby-transformer-sharp and gatsby-plugin-sharp
    // that node will become an ImageSharp
    let urlString = node.image.url.split("|")
    let url = urlString[0] + "%7C" + urlString[1]
    const fileNode = await createRemoteFileNode({
      url: url,
      store,
      cache,
      createNode,
      createNodeId,
    })

    if (fileNode) {
      // link File node to DogImage node
      // at field image
      node.localFile___NODE = fileNode.id
    }

>>>>>>> 5ec1c145 (trying to upload)
}

exports.createPages = ({actions, graphql}) => {
    const { createPage } = actions;
    const templates =  {
        projectDetails: path.resolve('src/template/project-details.js'),
        blogDetails: path.resolve('src/template/blog-details.js'),
        categoryPost: path.resolve('src/template/category-post.js'),
        tagPost: path.resolve('src/template/tag-template.js'),
        authorPage: path.resolve('src/template/archive.js'),
    }

    return graphql(`
        {
            allProjectJson {
                edges {
                    node {
                        id
                    }
                }
            }

<<<<<<< HEAD
=======
            allContentfulProjects {
              edges {
                node {
                  name
                }
              }
            }

>>>>>>> 5ec1c145 (trying to upload)

            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                            authorId
                        }
                        frontmatter {
                            author {
                                name
                            }
                            tags
                            category
                        }
                    }
                }
            }
<<<<<<< HEAD
            
=======

>>>>>>> 5ec1c145 (trying to upload)

        }
    `).then( res => {
        if (res.errors) return Promise.reject(res.errors)
<<<<<<< HEAD
        const project = res.data.allProjectJson.edges
=======
        const project = res.data.allContentfulProjects.edges
>>>>>>> 5ec1c145 (trying to upload)
        const posts = res.data.allMarkdownRemark.edges

         // Create Project Page
         project.forEach(({ node }) => {
            createPage({
                // path: node.fields.slug,
<<<<<<< HEAD
                path: `project/${slugify(node.id)}`,
                component: templates.projectDetails,
                context: {
                    id: node.id
=======
                path: `project/${slugify(node.name)}`,
                component: templates.projectDetails,
                context: {
                    name: node.name
>>>>>>> 5ec1c145 (trying to upload)
                }
            })
        })

<<<<<<< HEAD
        // Create Single Blog Page 
=======
        // Create Single Blog Page
>>>>>>> 5ec1c145 (trying to upload)
        posts.forEach(({ node }) => {
            createPage({
                path: `${slugify(node.fields.slug)}`,
                component: templates.blogDetails,
                context: {
                    slug: node.fields.slug
                }
            })
        })

<<<<<<< HEAD
        // Create Single Blog Page 

        // Start Category Area 

        // For get All Categiry Pages 
=======
        // Create Single Blog Page

        // Start Category Area

        // For get All Categiry Pages
>>>>>>> 5ec1c145 (trying to upload)
        let categories = []
        _.each(posts , edge => {
            if (_.get(edge , 'node.frontmatter.category')) {
                categories = categories.concat(edge.node.frontmatter.category)
            }
        })

        // [design , code]
        let categoryPostCounts = {}
        categories.forEach( category => {
            categoryPostCounts[category] = (categoryPostCounts[category] || 0) + 1
        })
        categories = _.uniq(categories)

<<<<<<< HEAD
       
=======

>>>>>>> 5ec1c145 (trying to upload)
        // Create Tag Posts Pages for indivedual Tag page
        categories.forEach(category => {
            createPage({
                path: `/category/${slugify(category)}`,
                component: templates.categoryPost,
                context: {
<<<<<<< HEAD
                    category 
=======
                    category
>>>>>>> 5ec1c145 (trying to upload)
                }
            })
        })
        // End Category Area



<<<<<<< HEAD
        // Start Tags Pages 
=======
        // Start Tags Pages
>>>>>>> 5ec1c145 (trying to upload)
        let tags = []
        _.each(posts , edge => {
            if (_.get(edge , 'node.frontmatter.tags')) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        // Create Tag Posts Pages for indivedual Tag page
        tags.forEach(tag => {
            createPage({
                path: `/tag/${slugify(tag)}`,
                component: templates.tagPost,
                context: {
                    tag
                }
            })
        })
        // End Category Area



<<<<<<< HEAD
        // Start Create Authors Page 
=======
        // Start Create Authors Page
>>>>>>> 5ec1c145 (trying to upload)
        let authors = []
        _.each(posts, edge => {
            if(_.get(edge, 'node.fields.authorId')){
                authors = authors.concat(edge.node.fields.authorId)
            }
        })
        authors = _.uniq(authors)
        authors.forEach(author => {
            createPage({
                path: `/author/${slugify(author)}`,
                component: templates.authorPage,
                context: {
                    author
                }
            })
        })
        // End Create Authors Page





    })

}
<<<<<<< HEAD






=======
>>>>>>> 5ec1c145 (trying to upload)

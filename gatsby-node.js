
const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path');
const _ = require('lodash');
const {createRemoteFileNode} = require('gatsby-source-filesystem');


exports.onCreateNode = async ({node , actions, store, createNodeId, cache }) => {
    const { createNodeField, createNode } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
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

    if(node.internal.type === 'AuthorsJson'){
        createNodeField({
            node,
            name: "authorId",
            value: slugify(node.name)
        });
    }

    if (node.internal.type !== "ChecProduct") {
      return
    }

    // download image and create a File node
    // with gatsby-transformer-sharp and gatsby-plugin-sharp
    // that node will become an ImageSharp
    let urlString = node.image.url.split("|")
    let url = urlString[0] + "%7C" + urlString[1]
    const fileNode = await createRemoteFileNode({
      url,
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


}

exports.createPages = ({actions, graphql}) => {
    const { createPage } = actions;
    const templates =  {
        projectDetails: path.resolve('src/template/project-details.js'),
        blogDetails: path.resolve('src/template/blog-details.js'),
        categoryPost: path.resolve('src/template/category-post.js'),
        tagPost: path.resolve('src/template/tag-template.js'),
        authorPage: path.resolve('src/template/archive.js'),
        productPage: path.resolve('src/template/product.js'),
        brewGuide: path.resolve('src/template/brew-guide.js'),
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

            allContentfulProjects {
              edges {
                node {
                  name
                }
              }
            }

            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }

            allShopifyProduct {
              edges {
                node {
                  featuredImage {
                    gatsbyImageData
                  }
                  description
                  title
                  variants {
                    price
                    title
                  }
                  shopifyId
                }
              }
            }

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

        }
    `).then( res => {
        if (res.errors) return Promise.reject(res.errors)
        const project = res.data.allContentfulProjects.edges
        const blogposts = res.data.allContentfulBlogPost.edges
      //  const posts = res.data.allMarkdownRemark.edges
        const products = res.data.allShopifyProduct.edges

         // Create Project Page
         project.forEach(({ node }) => {
            createPage({
                path: `project/${slugify(node.name)}`,
                component: templates.projectDetails,
                context: {
                    name: node.name
                }
            })
        })

        blogposts.forEach(({ node }) => {
           createPage({
               path: `news/${slugify(node.slug)}`,
               component: templates.blogDetails,
               context: {
                   slug: node.slug
               }
           })
       })


        // posts.forEach(({ node }) => {
        //     createPage({
        //         path: `${slugify(node.fields.slug)}`,
        //         component: templates.blogDetails,
        //         context: {
        //             slug: node.fields.slug
        //         }
        //     })
        // })


        // let categories = []
        // _.each(posts , edge => {
        //     if (_.get(edge , 'node.frontmatter.category')) {
        //         categories = categories.concat(edge.node.frontmatter.category)
        //     }
        // })
        //
        // // [design , code]
        // let categoryPostCounts = {}
        // categories.forEach( category => {
        //     categoryPostCounts[category] = (categoryPostCounts[category] || 0) + 1
        // })
        // categories = _.uniq(categories)
        //
        // // Create Tag Posts Pages for indivedual Tag page
        // categories.forEach(category => {
        //     createPage({
        //         path: `/category/${slugify(category)}`,
        //         component: templates.categoryPost,
        //         context: {
        //             category
        //         }
        //     })
        // })
        // End Category Area


        // let tags = []
        // _.each(posts , edge => {
        //     if (_.get(edge , 'node.frontmatter.tags')) {
        //         tags = tags.concat(edge.node.frontmatter.tags)
        //     }
        // })
        // // Create Tag Posts Pages for indivedual Tag page
        // tags.forEach(tag => {
        //     createPage({
        //         path: `/tag/${slugify(tag)}`,
        //         component: templates.tagPost,
        //         context: {
        //             tag
        //         }
        //     })
        // })
        // // End Category Area
        //
        //
        //
        // let authors = []
        // _.each(posts, edge => {
        //     if(_.get(edge, 'node.fields.authorId')){
        //         authors = authors.concat(edge.node.fields.authorId)
        //     }
        // })
        // authors = _.uniq(authors)
        // authors.forEach(author => {
        //     createPage({
        //         path: `/author/${slugify(author)}`,
        //         component: templates.authorPage,
        //         context: {
        //             author
        //         }
        //     })
        // })
        // End Create Authors Page

        products.forEach(product => {

            createPage({
                path: `/store/${product.node.title}`,
                component: templates.productPage,
                context: {
                    id: product.node.shopifyId,
                }
            })
        })

        // Create Brew Guide Pages
        const brewGuides = res.data.allMarkdownRemark.edges.filter(edge => 
            edge.node.frontmatter.category === 'brew guides'
        )
        
        brewGuides.forEach(({ node }) => {
            createPage({
                path: `/brew-guides/${node.fields.slug}`,
                component: templates.brewGuide,
                context: {
                    slug: node.fields.slug,
                }
            })
        })





    })

}

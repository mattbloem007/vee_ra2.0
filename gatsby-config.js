require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Vee/Ra Botanical Blends`,
    description: `Health and longevity brand dedicated to helping you cultivate inner harmony and vitality.`,
    author: `Matthew Gabriel`,
    siteUrl: "https://vee-ra.netlify.app",
    getform_url: "https://getform.io/f/7a6695a7-c8e3-442c-bc2f-d46d3b9a535e",
  },

  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsJson.name`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-open-exchange-rates`,
      options: {
        appId: process.env.OPEN_EXCHANGE_RATES_APP_ID,
        base: "ZAR"
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
        host: process.env.CONTENTFUL_HOST
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: "@chec/gatsby-source-chec",
      options: {
        publicKey: process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY,
        //downloadImageAssets: true,
      },
    },
    // {
    //   resolve: `gatsby-omni-font-loader`,
    //   options: {
    //     enableListener: true,
    //     preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
    //     web: [
    //       {
    //         name: `Fira Sans`,
    //         file: `https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500;800&display=swap`,
    //       },
    //     ],
    //   },
    // }

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
          fonts: [
            `Montserrat ital`,
            `sans-serif\:300`, `300i`, `400`, `400i`, `500`, `600`, `700`, `900`
        ],
        fonts: [
          `Mulish`,
          `sans-serif\:300`, `400`, `500`, `600`, `700`
        ],
        display: 'swap',
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/data/images/Final-Logo-PNGs/Gold/Ra-Logo-28.png`, // This path is relative to the root of the site.
      },
    },

    {
        resolve: "gatsby-plugin-anchor-links",
        options: {
          offset: -100
        }
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,



    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

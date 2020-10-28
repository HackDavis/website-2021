require("dotenv").config({ path: "./.env" })

module.exports = {
  siteMetadata: {
    title: `HackDavis 2021 | January 16-17 at UC Davis`,
    domain: `https://hackdavis2021.netlify.app`,
    image: `/src/images/hd_logo.png`,
    author: `HackDavis`,
    description: `HackDavis is UC Davis' annual hackathon for students, run by students.`,
    keywords: `HackDavis, social good, tech, hackathon`,
    og_description: `HackDavis is UC Davis' annual hackathon for students, run by students. On January 16-17, 2021, over 700 students, hackers, and creatives will come together virtually for 36 hours of hacking. We're providing an environment to bring together the most talented students in California to address the world's most pressing social issues.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -100,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `bootstrap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `hd_favicon`,
        short_name: `favicon`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/hd_logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/index/'],
        workboxConfig: {
          globPatterns: ['**/static/**']
        }
      }
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: true,
          storage: false,
          messaging: true,
          functions: false,
          performance: false,
        },
      },
    },
  ],
}

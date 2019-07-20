module.exports = {
  siteMetadata: {
    title: `Mega Online Tool`,
    description: `We strive to create beautiful, simple and easy to use online generator, pickers, calculators, converters, utilities, and other online tools to make our life easier.`,
    author: `@phongtt3`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },

    // Google Font
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Concert+One`],
        display: 'swap',
      },
    },

    // tag manager
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-WFHH3WZ',
        includeInDevelopment: false,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};

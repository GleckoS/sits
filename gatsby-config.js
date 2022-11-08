module.exports = {
  siteMetadata: {
    title: `Sits`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://sits.kryptonum.co.uk/graphql"
    }
  },
    "gatsby-plugin-image", "gatsby-transformer-sharp", "gatsby-plugin-styled-components", "gatsby-plugin-sitemap",
  {
    resolve: "gatsby-plugin-sharp",
    options: {
      defaults: {
        placeholder: `dominantColor`,
        quality: 100,
      },
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
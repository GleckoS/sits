module.exports = {
  siteMetadata: {
    title: `Sits`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://sits.kryptonum.co.uk/graphql",
      schema: {
        timeout: 1000000000,
        circularQueryLimit: 100,
        perPage: 5,
        requestConcurrency: 3,
      },
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
  },
  {
    resolve: 'gatsby-plugin-react-leaflet',
    options: {
      linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
    }
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'static/sits.ico',
      name: `Sits`,
      short_name: `sits`,
      start_url: `/`,
      background_color: `#F9F5F0`,
      theme_color: `#ae600b`,
      display: `standalone`
    }
  }]
};
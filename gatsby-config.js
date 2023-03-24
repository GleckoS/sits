module.exports = {
  siteMetadata: {
    title: `Sits`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://sits.headlesshub.com/graphql",
      schema: {
        timeout: 1000000000,
        circularQueryLimit: 100,
        perPage: 5,
        requestConcurrency: 3,
      },
      type: {
        MediaItem: {
          localFile: {
            maxFileSizeBytes: 52428800, // 50Mb
          },
        },
      },
    }
  },
    "gatsby-plugin-image", "gatsby-transformer-sharp", "gatsby-plugin-styled-components", "gatsby-plugin-sitemap", `gatsby-plugin-react-helmet`,
  {
    resolve: "gatsby-plugin-sharp",
    options: {
      defaults: {
        placeholder: `dominantColor`,
        quality: 80,
      },
    }
  },
  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "GTM-M4GW37G",
      defaultDataLayer: { platform: "gatsby" },
    },
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
      theme_color: `#996D3E`,
      display: `standalone`
    }
  },
  {
    resolve: `gatsby-plugin-gatsby-cloud`,
    options: {
      allPageHeaders: [
        'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
        'X-Frame-Options: SAMEORIGIN'
      ], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      mergeSecurityHeaders: true, // boolean to turn off the default security headers
      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      mergeCachingHeaders: true, // boolean to turn off the default caching headers
      transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
    },
  }
  ]
};
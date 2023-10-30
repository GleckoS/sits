// const { meterialsAlterTitle } = require("./src/texts");

module.exports = {
  siteMetadata: {
    title: `Sits`,
    siteUrl: `https://sits.eu`
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [
          "/rabat-15-na-cala-kolekcje-w-polsce",
        ]
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": "https://sits.headlesshub.com/graphql",
        schema: {
          perPage: 25,
          timeout: 300000,
          requestConcurrency: 1,
        },
        excludeFieldNames: ['comments', 'blocksJSON', 'previewBlocks', 'previewBlocksJSON'],
        type: {
          Comment: {
            limit: 0,
          },
          MediaItem: {
            localFile: {
              maxFileSizeBytes: 52428800, // 50Mb
            },
          },
        }
      }
    },
    "gatsby-plugin-image", "gatsby-transformer-sharp", "gatsby-plugin-styled-components", `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: `dominantColor`,
          quality: 70,
          formats: [`webp`],
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
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://sits.eu',
        sitemap: 'https://sits.eu/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1619411831581925",
      },
    },
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: `products`,
        engine: `flexsearch`,
        query: `
          {
            allWpProduct {
              nodes {
                id
                slug
                title
                language {
                  code
                }
                types {
                  nodes {
                    name
                    slug
                    ancestors {
                      nodes {
                        name
                      }
                    }
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      id
                      slug
                    }
                  }
                  productGallery {
                    productsImages {
                      featuredProductImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData
                          }
                        }
                      }
                      isMainImage
                    }
                  }
                }
              }
            }
          } 
        `,
        ref: 'id',
        index: ['collection', 'filterTypes'],
        store: ['title', 'slug', 'collection', 'language', 'image', 'types'],
        normalizer: ({ data }) =>
          data.allWpProduct.nodes.map((node) => {
            let mainImage = null

            node.products?.productGallery?.every(el => { 
              let image = el.productsImages?.find((image) => image.isMainImage)?.featuredProductImage

              if(image){
                mainImage = image
                return false
              }
            })

            if(!mainImage) mainImage = node.products?.productGallery?.[0]?.productsImages?.[0]?.featuredProductImage || null
            return {
              id: node.id,
              title: node.title,
              slug: node.slug,
              collection: node.products?.collection || null,
              language: node.language.code,
              image: mainImage,
              types: node.types.nodes.filter((type) => !type.ancestors).map((type) => type.name),
              filterTypes: node.types.nodes.map((type) => type.slug),
            }
          }),
      },
    },
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: `materials`,
        engine: `flexsearch`,
        query: `
          {
            allWpMaterials {
              nodes {
                id
                title
                slug
                language{
                  code
                }
                materials {
                  materialColorVariants {
                    isMainColor
                    squarePreviewImage {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
              }
            }
          } 
        `,
        ref: 'id',
        index: ['title', 'slug', 'type'],
        store: ['title', 'slug', 'language', 'image'],
        normalizer: ({ data }) =>
          data.allWpMaterials.nodes.map((node) => {
            let mainImage = node.materials?.materialColorVariants?.find((image) => image.isMainColor)?.squarePreviewImage || node.materials?.materialColorVariants?.[0]?.squarePreviewImage || null

            const meterialsAlterTitle = {
              EN: 'Materials',
              FR: 'Tissus',
            }
            
            return {
              id: node.id,
              title: node.title,
              slug: node.slug,
              language: node.language.code,
              image: mainImage,
              type: meterialsAlterTitle[node.language.code]
            }
          }),
      },
    },
  ]
};
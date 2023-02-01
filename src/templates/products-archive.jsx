import { graphql } from "gatsby"
import React from "react"
import ProductArchive from '../components/sections/products-archive'
import Map from "../components/sections/map"
import { Helmet } from "react-helmet"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function Products({ data, pageContext, location }) {
  return (
    <main>
      <ProductArchive location={location} pageContext={pageContext} products={data.allWpProduct.nodes} data={''} />
      <Map />
    </main>
  )
}

export const query = graphql`
    query products($id: String!, $productType: String!) {
        wpPage(id: {eq: $id}){
            id
            seo {
              canonical
              metaDesc
              opengraphSiteName
              title
              opengraphImage {
                localFile {
                  publicURL
                }
              }
            }
        }
        allWpProduct(sort: {date: DESC}, filter: {types: {nodes: {elemMatch: {name: {eq: $productType}}}}}){
          nodes{
            types {
              nodes {
                name
                collectionTypes {
                  typeArchive {
                    url
                  }
                }
              }
            }
            products {
              collection {
                ... on WpCollection {
                  slug
                  title
                  collections {
                    generalCollectionInformation {
                      isPopular
                      popularImportanceIndex
                    }
                  }
                  covers {
                    nodes {
                      name
                    }
                  }
                  upholsterys{
                    nodes{
                      name
                    }
                  }
                  types {
                    nodes {
                      name
                      collectionTypes {
                        typeArchive {
                          url
                        }
                      }
                    }
                  }
                }
              }
              isNewArrival
              productGallery {
                popupNames {
                  fabric
                  cover
                  leather
                  model
                }
                productsImages {
                  isMainImage
                  featuredProductImage {
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
    }
`
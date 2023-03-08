import { graphql } from "gatsby"
import React from "react"
import ProductArchive from '../components/sections/products-archive'
import Map from "../components/sections/map"
import { Helmet } from "react-helmet"
import Seo from "../layout/seo"
import Wrapper from "../components/sections/page-wrapper"
import { myContext } from "../hooks/provider"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo isArchive={true} seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function Products({ data, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <ProductArchive language={pageContext.language} location={location} pageContext={pageContext} products={data.allWpProduct.nodes} data={''} />
      <Map language={pageContext.language} />
    </Wrapper>
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
            id
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
                  id
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
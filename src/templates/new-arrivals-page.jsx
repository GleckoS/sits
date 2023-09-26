import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Content from "../components/sections/new-arrivals-content"
import Wrapper from "../components/sections/page-wrapper"
import Seo from "../layout/seo"
import { myContext } from "../hooks/provider"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function NewArrivalsPage({ data: { wpPage, allWpProduct }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Content language={pageContext.language} data={wpPage.newArrivals.products} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query newArrivals($id: String!) {
        wpPage(id: {eq: $id}){
          language {
            name
          }
          translations {
            language {
              name
              code
            }
            uri
          }
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
            newArrivals {
              products {
                product {
                  ... on WpProduct {
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
            }
        }
    }
`
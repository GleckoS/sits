import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Content from "../components/sections/favourites-content"
import Map from "../components/sections/map"
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

export default function FavouritesPage({ data, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Content language={pageContext.language} data={data} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query favourites($id: String!) {
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
        Collections: allWpCollection {
          nodes {
            id
            title
            slug
            collections {
              generalCollectionInformation {
                collectionPagePreviewImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                collectionGallery {
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
        Materials : allWpMaterials{
            nodes {
              materials {
                materialColorVariants {
                  colorGroup
                  variantName
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
              title
              slug

            }
        }
        Sofas : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Sofas"}}}}}) {
            nodes {
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
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
        Armchairs : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Armchairs"}}}}}) {
            nodes {
                types {
                  nodes {
                    name
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
        CoffeeTables : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Coffee tables"}}}}}) {
            nodes {
                types {
                  nodes {
                    name
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
        DiningChairs : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Dining chairs"}}}}}) {
            nodes {
                types {
                  nodes {
                    name
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
        Footstools : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Footstools"}}}}}) {
            nodes {
                types {
                  nodes {
                    name
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
        OutdoorFurnitures : allWpProduct(filter: {types: {nodes: {elemMatch: {name: {eq: "Outdoor furnitures"}}}}}) {
            nodes {
                types {
                  nodes {
                    name
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                    }
                  }
                  productGallery {
                    popupNames {
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
                        height
                        width
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
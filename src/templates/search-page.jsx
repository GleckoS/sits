import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Search from "../components/sections/search"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function SearchPage({ data: { Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures, wpPage }, pageContext, location }) {
    return (
        <main>
            <Search
                location={location}
                Sofas={Sofas}
                Armchairs={Armchairs}
                CoffeeTables={CoffeeTables}
                DiningChairs={DiningChairs}
                Footstools={Footstools}
                OutdoorFurnitures={OutdoorFurnitures}
                Materials={Materials}
            />
            <Map />
        </main>
    )
}

export const query = graphql`
    query search($id: String!) {
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
        Materials : allWpMaterials{
            nodes {
              materials {
                materialColorVariants {
                  colorGroup
                  variantName
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
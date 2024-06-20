import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Wrapper from "../components/sections/page-wrapper"
import Search from "../components/sections/search"
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

export default function SearchPage({ data: { Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures, wpPage }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Search
        language={pageContext.language}
        location={location}
        Sofas={Sofas}
        Armchairs={Armchairs}
        CoffeeTables={CoffeeTables}
        DiningChairs={DiningChairs}
        Footstools={Footstools}
        OutdoorFurnitures={OutdoorFurnitures}
        Materials={Materials}
      />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query search($id: String!, $sofas: String!, $armchairs: String!, $coffeTables: String!, $dinningChairs: String!, $footstools: String!, $outdoorFurniture: String!, $language: WpLanguageCodeEnum) {
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
        }
        Materials : allWpMaterials(filter: {materials: {generalMaterialInformationCopy: {isDiscontinued: {in: [false, null]}}}, language: {code: {eq: $language}}}){
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
        Sofas : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $sofas}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
        Armchairs : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $armchairs}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
        CoffeeTables : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $coffeTables}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
        DiningChairs : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $dinningChairs}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
        Footstools : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $footstools}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
        OutdoorFurnitures : allWpProduct(filter: {language: {code: {eq: $language}}, products: {isDiscontinued: {in: [false, null]}}, types: {nodes: {elemMatch: {name: {eq: $outdoorFurniture}}}}}) {
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
                      collections {
                        generalCollectionInformation {
                          isDiscontinued
                          popularImportanceIndex
                        }
                      }
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
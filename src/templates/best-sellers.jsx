import { graphql } from "gatsby"
import React from "react"
import BestSellersGrid from "../components/sections/best-sellers-grid"
import NewArrivals from "../components/sections/new-arrivals"
import ThreeInformCards from "../components/sections/three-inform-cards"
import Map from "../components/sections/map"
import Hero from "../components/sections/hero-bestsellers"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function Bestsellers({ data: { wpPage: { bestSellers } }, pageContext }) {
  return (
    <main>
      <Hero data={bestSellers.hero} />
      <BestSellersGrid data={bestSellers.imageGrids} />
      <NewArrivals data={bestSellers.newArrivals} />
      <ThreeInformCards data={bestSellers.sectionWithThreeInformCards} />
      <Map />
    </main>
  )
}

export const query = graphql`
    query bestsellers($id: String!) {
        wpPage(id: {eq: $id}){
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
            id
            bestSellers {
              hero {
                pageTitle
                text
                backgroundVideo {
                  altText
                  localFile {
                    publicURL
                  }
                }
                backgroundImage {
                  altText
                  localFile {
                    publicURL
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
                sectionWithThreeInformCards{
                  cards{
                    title
                    text
                    link{
                      title
                      url
                      target
                    }
                    image{
                      altText
                      localFile{
                        childImageSharp{
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
                newArrivals{
                  sectionTitle
                  text
                  chosenProducts {
                    products {
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
              imageGrids {
                ... on WpPage_Bestsellers_ImageGrids_First {
                  collection {
                    ... on WpCollection {
                        title
                        slug
                      id
                      collections {
                        collectionBestsellerImageGrid {
                          collectionShortBestsellerPageDescription
                          smallSquare{
                            altText
                            localFile{
                                childImageSharp{
                                    gatsbyImageData
                                }
                            }
                          }
                          tinyLandscape{
                            altText
                            localFile{
                                childImageSharp{
                                    gatsbyImageData
                                }
                            }
                          }
                          smallLandscape{
                            altText
                            localFile{
                                childImageSharp{
                                    gatsbyImageData
                                }
                            }
                          }
                          bigSquare{
                            altText
                            localFile{
                                childImageSharp{
                                    gatsbyImageData
                                }
                            }
                          }
                          bigLandscape{
                            altText
                            localFile{
                                childImageSharp{
                                    gatsbyImageData
                                }
                            }
                          }
                        }
                      }
                    }
                  }
                  fieldGroupName
                }
                ... on WpPage_Bestsellers_ImageGrids_Fifth {
                    collection {
                      ... on WpCollection {
                        title
                        slug
                        id
                        collections {
                          collectionBestsellerImageGrid {
                            collectionShortBestsellerPageDescription
                            smallSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            tinyLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            smallLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                          }
                        }
                      }
                    }
                    fieldGroupName
                }
                ... on WpPage_Bestsellers_ImageGrids_Fourth {
                    collection {
                      ... on WpCollection {
                        title
                        slug
                        id
                        collections {
                          collectionBestsellerImageGrid {
                            collectionShortBestsellerPageDescription
                            smallSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            tinyLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            smallLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                          }
                        }
                      }
                    }
                    fieldGroupName
                }
                ... on WpPage_Bestsellers_ImageGrids_Third {
                    collection {
                      ... on WpCollection {
                        title
                        slug
                        id
                        collections {
                          collectionBestsellerImageGrid {
                            collectionShortBestsellerPageDescription
                            smallSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            tinyLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            smallLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                          }
                        }
                      }
                    }
                    fieldGroupName
                }
                ... on WpPage_Bestsellers_ImageGrids_Second {
                    collection {
                      ... on WpCollection {
                        title
                        slug
                        id
                        collections {
                          collectionBestsellerImageGrid {
                            collectionShortBestsellerPageDescription
                            smallSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            tinyLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            smallLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigSquare{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                            bigLandscape{
                              altText
                              localFile{
                                  childImageSharp{
                                      gatsbyImageData
                                  }
                              }
                            }
                          }
                        }
                      }
                    }
                    fieldGroupName
                }
              }
            }
        }
    }
`
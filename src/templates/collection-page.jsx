import { graphql } from "gatsby"
import React from "react"
import { useMemo } from "react"
import Hero from "../components/sections/hero-collection"
import About from "../components/sections/about"
import RecomendedCovers from "../components/sections/recomended-covers"
import Accessories from "../components/sections/accessories"
import SimilarProducts from "../components/sections/similar-products"
import Map from "../components/sections/map"
import Video from "../components/sections/video"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"


export function Head({ data: { wpCollection: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

const similarTitle = {
  en: 'Similar products'
}

const coversTitle = {
  en: 'Recommended covers for '
}

export default function Collection({ data: { wpCollection, allWpProduct }, pageContext }) {

  const products = useMemo(() => {
    return allWpProduct.nodes.filter(el => el.products?.collection?.id === wpCollection.id)
  }, [allWpProduct, wpCollection])
  return (
    <main>
      <Hero
        itemCategories={wpCollection.types.nodes}
        products={products}
        data={wpCollection}
      />
      {wpCollection.collections.twoColumn.imageOnTheLeftSide && <About color={true} data={wpCollection.collections.twoColumn} />}
      {wpCollection.collections.videoSection?.video && <Video isMarginBottom={!wpCollection.collections.recommendedCovers.covers && !wpCollection.collections.accessoriesSection.accessories} data={wpCollection.collections.videoSection} />}
      {wpCollection.collections.recommendedCovers.covers && <RecomendedCovers title={coversTitle['en'] + wpCollection.title} data={wpCollection.collections.recommendedCovers} />}
      {wpCollection.collections.accessoriesSection.accessories && <Accessories data={wpCollection.collections.accessoriesSection.accessories} />}
      {wpCollection.collections.similarCollectionsSection.similarCollections && <SimilarProducts title={similarTitle['en']} data={wpCollection.collections.similarCollectionsSection.similarCollections} />}
      <Map />
    </main>
  )
}

export const query = graphql`
    query collection($id: String!) {
          wpCollection(id: {eq: $id}){
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
            collections {
              videoSection {
                video{
                  altText
                  localFile {
                    publicURL
                  }
                }
                previewImage{
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
              similarCollectionsSection {
                similarCollections {
                  product {
                    ... on WpProduct {
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
              accessoriesSection {
                accessories {
                  accessoryTitle
                  accessoryImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
              recommendedCovers {
                covers {
                  cover {
                    ... on WpMaterials {
                      title
                      slug
                      materials {
                          materialColorVariants {
                              variantColor
                              variantColorImage{
                                altText
                                localFile{
                                  publicURL
                                }
                              }
                              variantName
                              colorGroup
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
              }
              twoColumn {
                sectionTitle
                text
                linkUnderText {
                  target
                  title
                  url
                }
                imageOnTheLeftSide {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              sidebarCollectionInformation {
                legs {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions : legsDimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                      }
                    }
                  }
                }
                dimensions {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                      }
                    }
                  }
                }
                armrest {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions : armrestDimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                      }
                    }
                  }
                }
                accessories {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions {
                    title
                    textUnderTitle
                    image {
                      altText
                      localFile{
                        publicURL
                      }
                    }
                  }
                }
              }
              generalCollectionInformation {
                collectionQuickDescription
                collectionGallery {
                  altText
                  title
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                collectionProductSheet {
                  localFile {
                    publicURL
                  }
                }
                collectionPagePreviewImage {
                  altText
                  title
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                popupNames {
                  material
                  tableTopMaterial
                  materialOfTheLegs
                  accessories
                  armrest
                  comfort
                  fabric
                  cover
                  leather
                  legs
                  model
                }
              }
            }
            title
            types {
              nodes {
                name
              }
            }
            comfort {
              nodes {
                name
                description
                taxonomy {
                  comfortSvg{
                    altText
                    localFile{
                      publicURL
                    }
                  }
                  tooltip
                  image {
                    altText
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
            covers {
              nodes {
                name
                taxonomy {
                  tooltip
                  image {
                    altText
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
            upholsterys {
              nodes {
                name
                taxonomy {
                  tooltip
                  image {
                    altText
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
          }
          allWpProduct{
            nodes{
              types {
                nodes {
                  name
                }
              }
            products {
                collection {
                  ... on WpCollection {
                    id
                  }
                }
                productGallery {
                  productsImages {
                    isMainImage
                    featuredProductImage {
                      altText
                      title
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                  }
                  popupNames {
                    material
                    tableTopMaterial
                    materialOfTheLegs
                    accessories
                    armrest
                    comfort
                    fabric
                    cover
                    leather
                    legs
                    model
                  }
                }
              }
            }
        }
    }
`
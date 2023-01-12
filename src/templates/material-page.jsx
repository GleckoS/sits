import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Hero from "../components/sections/hero-materials"
import Map from "../components/sections/map"
import RecomendedCovers from "../components/sections/recomended-covers"
import SimilarProducts from "../components/sections/similar-products"
import Video from "../components/sections/video"
import Seo from "../layout/seo"

export function Head({ data: { wpMaterials: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

const similarTitle = {
  en: ' is a popular choice for these models'
}

const coversTitle = {
  en: 'Similar Covers'
}

export default function Material({ location, data: { wpMaterials }, pageContext }) {

  return (
    <main>
      <Hero isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video && !wpMaterials.materials.popularProductsUsingThisMaterial.productList} variant={location?.state?.variant} data={wpMaterials} />
      {wpMaterials.materials.popularProductsUsingThisMaterial.productList
        && <SimilarProducts isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video} materials={true} title={wpMaterials.title + similarTitle['en']} data={wpMaterials.materials.popularProductsUsingThisMaterial.productList} />}

      {wpMaterials.materials.videoSection?.video
        && <Video isLast={!wpMaterials.materials.similarCovers.covers} materials={true} data={wpMaterials.materials.videoSection} />}

      {wpMaterials.materials.similarCovers.covers
        && <RecomendedCovers background='white' title={coversTitle['en']} data={wpMaterials.materials.similarCovers} />}

      <Map />
    </main>
  )
}

export const query = graphql`
    query material($id: String!) {
        wpMaterials(id: {eq: $id}) {
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
          title
          features {
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
          textures {
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
          careInstructions {
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
          materials {
            popularProductsUsingThisMaterial {
              productList {
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
            similarCovers {
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
            videoSection {
              video {
                altText
                localFile{
                  publicURL
                }
              }
              previewImage {
                altText
                localFile{
                  publicURL
                  childImageSharp{
                    gatsbyImageData
                  }
                }
              }
            }
            generalMaterialInformation: generalMaterialInformationCopy {
              materialQuickDescription
              textUnderCareInstructionIcons
              materialProductSheet {
                altText
                localFile {
                  publicURL
                }
              }
            }
            materialColorVariants {
              colorGroup
              isMainColor
              variantName
              variantColor
              variantColorImage{
                altText
                localFile{
                  publicURL
                }
              }
              variantGallery {
                altText
                localFile {
                    publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              squarePreviewImage {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              landscapePreviewImage {
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
`
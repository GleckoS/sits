import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Hero from "../components/sections/hero-materials"
import Map from "../components/sections/map"
import Wrapper from "../components/sections/page-wrapper"
import RecomendedCovers from "../components/sections/recomended-covers"
import SimilarProducts from "../components/sections/similar-products"
import Video from "../components/sections/video"
import Seo from "../layout/seo"
import { similarTitle, coversTitle } from "../texts"
import { myContext } from "../hooks/provider"

export function Head({ pageContext, data: { wpMaterials: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function Material({ location, data: { wpMaterials }, pageContext }) {

  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Hero language={pageContext.language} isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video && !wpMaterials.materials.popularProductsUsingThisMaterial.productList} variant={location?.state?.variant} data={wpMaterials} />
      {wpMaterials.materials.popularProductsUsingThisMaterial.productList
        && <SimilarProducts language={pageContext.language} isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video} materials={true} title={wpMaterials.title + similarTitle[pageContext.language]} data={wpMaterials.materials.popularProductsUsingThisMaterial.productList} />}

      {wpMaterials.materials.videoSection?.video
        && <Video isLast={!wpMaterials.materials.similarCovers.covers} materials={true} data={wpMaterials.materials.videoSection} />}

      {wpMaterials.materials.similarCovers.covers
        && <RecomendedCovers language={pageContext.language} background='white' title={coversTitle[pageContext.language]} data={wpMaterials.materials.similarCovers} />}

      <Map language={pageContext.language} />
    </Wrapper>
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
import { graphql } from "gatsby"
import React from "react"
import Hero from "../components/sections/hero-collection"
import About from "../components/sections/about"
import RecomendedCovers from "../components/sections/recomended-covers"
import Accessories from "../components/sections/accessories"
import SimilarProducts from "../components/sections/similar-products"
import Map from "../components/sections/map"
import Video from "../components/sections/video"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"
import Wrapper from "../components/sections/page-wrapper"
import { accessoriesSectionTitle, checkOtherCollections, collectionCoversTitle, collectionSimilarTitle } from "../texts"
import { myContext } from "../hooks/provider"
import HeroDiscontinuedCollection from "../components/sections/hero-discontinued-collection"

export function Head({ pageContext, data: { wpCollection: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}
export default function Collection({ data: { wpPage, wpCollection }, pageContext }) {
  if (wpCollection.collections.generalCollectionInformation.isDiscontinued) {
    return (
      <Wrapper>
        <myContext.Consumer>
          {context => {
            context.setLanguage(pageContext.language)
          }}
        </myContext.Consumer>
        <HeroDiscontinuedCollection
          data={wpPage.discontinuedCollection}
          isLast={!wpCollection.collections.similarCollectionsSection.similarCollections}
        />
        {wpCollection.collections.similarCollectionsSection.similarCollections &&
          <SimilarProducts
            isLast={true}
            language={pageContext.language}
            title={checkOtherCollections[pageContext.language]}
            data={wpCollection.collections.similarCollectionsSection.similarCollections}
          />}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Hero
        language={pageContext.language}
        itemCategories={wpCollection.types.nodes}
        products={pageContext.products}
        data={wpCollection}
      />
      {wpCollection.collections.twoColumn.imageOnTheLeftSide && <About color={true} data={wpCollection.collections.twoColumn} />}
      {(wpCollection.collections.videoSection?.video || wpCollection.collections.videoSection?.youtubeOembed) && <Video isMarginBottom={!wpCollection.collections.recommendedCovers.covers && !wpCollection.collections.accessoriesSection.accessories} data={wpCollection.collections.videoSection} />}
      {wpCollection.collections.recommendedCovers.covers && <RecomendedCovers language={pageContext.language} isMarginTop={wpCollection.collections.twoColumn.imageOnTheLeftSide || wpCollection.collections.videoSection?.video} title={collectionCoversTitle[pageContext.language] + wpCollection.title} data={wpCollection.collections.recommendedCovers} />}
      {wpCollection.collections.accessoriesSection.accessories && <Accessories title={accessoriesSectionTitle[pageContext.language]} data={wpCollection.collections.accessoriesSection.accessories} />}
      {wpCollection.collections.similarCollectionsSection.similarCollections && <SimilarProducts language={pageContext.language} title={collectionSimilarTitle[pageContext.language]} data={wpCollection.collections.similarCollectionsSection.similarCollections} />}
      <Map />
    </Wrapper>
  )
}

export const query = graphql`
    query collection($id: String!, $language: WpLanguageCodeEnum!) {
          wpPage(template: {templateName: {eq: "Global Config"}}, language: {code: {eq: $language}}){
            discontinuedCollection{
              title : collectionOverlayTitle
              text : collectionOverlayText
            }
          }
          wpCollection(id: {eq: $id}){
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
                youtubeOembed
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
                  colorVariantName
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
                isDiscontinued
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
                collectionTypes {
                  typeArchive {
                    url
                  }
                }
              }
            }
            comfort {
              nodes {
                name
                description
                taxonomy {
                  orderIndex
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
    }
`
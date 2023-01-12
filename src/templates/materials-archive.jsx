import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import MaterialsArchive from "../components/sections/materials-archive"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function Material({ data: { allWpMaterials }, location }) {
  return (
    <main>
      <MaterialsArchive location={location} materials={allWpMaterials.nodes} />
      <Map />
    </main>
  )
}

export const query = graphql`
    query material($id: String!) {
        wpPage(id: {eq: $id}) {
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
      allWpMaterials{
        nodes{
          features {
            nodes {
              name
            }
          }
          textures {
            nodes {
              name
            }
          }
            title
            slug
            materials {
              generalMaterialInformationCopy {
                isPopular
                isNewArrival
              }
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
`
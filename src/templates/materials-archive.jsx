import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import MaterialsArchive from "../components/sections/materials-archive"
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

export default function Material({ data: { allWpMaterials }, location, pageContext }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <MaterialsArchive language={pageContext.language} location={location} materials={allWpMaterials.nodes} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query material($id: String!, $language: WpLanguageCodeEnum!) {
        wpPage(id: {eq: $id}) {
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
      allWpMaterials(
          sort: {date: DESC}
          filter: {language: {code: {eq: $language}}}
          ){
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
import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import CataloguesGrid from "../components/sections/catalogues-grid"
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

export default function CataloguesPage({ data, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <CataloguesGrid data={data.wpPage} language={pageContext.language} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query catalogues($id: String!) {
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
            catalogues {
              catalogues {
                linkToFileView
                catalogueTitle
                catalogueFile {
                  localFile {
                    publicURL
                    prettySize
                  }
                  mediaItemUrl
                }
                cataloguePreviewImage {
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
import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import CataloguesGrid from "../components/sections/catalogues-grid"
import Map from "../components/sections/map"
import Wrapper from "../components/sections/page-wrapper"
import Seo from "../layout/seo"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} pageContext={pageContext}/>
    </>
  )
}

export default function CataloguesPage({ data, pageContext, location }) {
  return (
    <Wrapper>
      <CataloguesGrid data={data.wpPage} />
      <Map />
    </Wrapper>
  )
}

export const query = graphql`
    query catalogues($id: String!) {
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
          title
            catalogues {
              catalogues {
                catalogueTitle
                catalogueFile {
                  localFile {
                    publicURL
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
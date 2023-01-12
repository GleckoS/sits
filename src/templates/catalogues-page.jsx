import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import CataloguesGrid from "../components/sections/catalogues-grid"
import Map from "../components/sections/map"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function CataloguesPage({ data, pageContext, location }) {
  return (
    <main>
      <CataloguesGrid data={data.wpPage} />
      <Map />
    </main>
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
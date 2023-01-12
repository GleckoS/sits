import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Content from "../components/sections/sales-representative"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function SalesRepresentativePage({ data: { wpPage }, pageContext, location }) {
    return (
        <main>
            <Content data={wpPage} />
            <Map/>
        </main>
    )
}

export const query = graphql`
    query salesRepresentative($id: String!) {
        wpPage(id: {eq: $id}){
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
            title
            salesRepresentative {
                textUnderPageTitle
                csvFileSales {
                  id
                  localFile {
                    publicURL
                  }
                }
            }
        }
    }
`
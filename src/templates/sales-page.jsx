import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Wrapper from "../components/sections/page-wrapper"
import Content from "../components/sections/sales-representative"
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

export default function SalesRepresentativePage({ data: { wpPage }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Content language={pageContext.language} data={wpPage} />
      <Map language={pageContext.language} />
    </Wrapper>
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
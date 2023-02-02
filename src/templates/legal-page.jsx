import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Content from "../components/sections/legal-content"
import Wrapper from "../components/sections/page-wrapper"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function LegalPage({ data: { wpPage: { legal } }, pageContext, location }) {
    return (
        <Wrapper>
            <Content data={legal} />
        </Wrapper>
    )
}

export const query = graphql`
    query legal($id: String!) {
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
            id
            legal {
              sections{
                sectionTitle
                sectionContent
              }
            }
        }
    }
`
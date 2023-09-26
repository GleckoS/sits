import { graphql } from "gatsby"
import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"
import Wrapper from "../components/sections/page-wrapper"
import { myContext } from "../hooks/provider"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function WhereToBuyPage({ data: { wpPage: { title } }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Title small={true} title={title} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query whereToBuy($id: String!) {
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
            title
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
    }
`
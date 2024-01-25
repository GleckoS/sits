import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import Wrapper from "../components/sections/page-wrapper"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function WhereToBuyPage({ data: { wpPage: { title, content } }, pageContext, location }) {
  return (
    <Wrapper>
      <Title
        title={title}
        text={content}
      />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query furnitureCare($id: String!) {
        wpPage(id: {eq: $id}){
          title
          content
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
        }
    }
`
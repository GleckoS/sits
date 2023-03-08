import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Content from "../components/sections/contact-content"
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

export default function ContactPage({ data: { wpPage }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Content data={wpPage.contact} language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query contact($id: String!) {
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
            contact {
              privacyPolicyText
              leftColumnTitle
              leftColumnContent
              rightColumnTitle
              rightColumnContent
              rightColumnFilesToUpload {
                file {
                  altText
                  title
                  localFile {
                    prettySize
                    publicURL
                  }
                }
              }
            }
        }
    }
`
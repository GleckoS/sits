import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Content from "../components/sections/contact-content"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function ContactPage({ data: { wpPage }, pageContext, location }) {
    return (
        <main>
            <Content data={wpPage.contact} />
        </main>
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
              leftColumnTitle
              leftColumnContent
              rightColumnTitle
              rightColumnContent
              rightColumnFilesToUpload {
                file {
                  altText
                  title
                  localFile {
                    publicURL
                  }
                }
              }
            }
        }
    }
`
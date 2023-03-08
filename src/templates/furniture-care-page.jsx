import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { Title } from "../components/moleculas/title-sub"
import AssemblyInstructions from "../components/sections/assembly-instructions"
import Faq from "../components/sections/faq"
import Handbook from "../components/sections/handbook"
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

export default function FurnitureCarePage({ data: { wpPage: { title, furnitureCare } }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Title title={title} />
      <Faq language={pageContext.language} data={furnitureCare.faq} />
      <Handbook data={furnitureCare.handbook} />
      <AssemblyInstructions language={pageContext.language} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query furnitureCare($id: String!) {
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
            furnitureCare {
              faq {
                answer
                question
              }
              handbook {
                title
                text
                filesUnderText {
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
    }
`
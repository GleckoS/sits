import { graphql } from "gatsby"
import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"
import Wrapper from "../components/sections/page-wrapper"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function WhereToBuyPage({ data: { wpPage: { title } }, pageContext, location }) {
    return (
        <Wrapper>
            <Title title={title} />
            <Map />
        </Wrapper>
    )
}

export const query = graphql`
    query whereToBuy($id: String!) {
        wpPage(id: {eq: $id}){
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
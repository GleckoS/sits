import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Grid from "../components/sections/about-grid"
import TwoColumnFlex from "../components/sections/about-two-column-flex"
import TwoColumnGray from "../components/sections/about-two-column-flex-gray"
import Hero from "../components/sections/hero-about"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function AboutPage({ data: { wpPage: { aboutUs } }, pageContext, location }) {
    return (
        <main>
            <Hero data={aboutUs.heroSection} />
            <Grid data={aboutUs.gridSection}/>
            <TwoColumnFlex data={aboutUs.twoColumnFlex}/>
            <TwoColumnGray data={aboutUs.twoColumnFlexWithGrayBackground}/>
        </main>
    )
}

export const query = graphql`
    query about($id: String!) {
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
            aboutUs {
              heroSection {
                pageTitle
                backgroundImage {
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
              }
              gridSection {
                tekstUnderTitle
                sectionTitle
                imageUnderText {
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
                imageOnTheRight {
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
              }
              twoColumnFlex {
                textUnderTitle
                sectionTitle
                imageOnTheLeft {
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
              }
              twoColumnFlexWithGrayBackground {
                textOnTheRight
                imageOnTheLeft {
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
              }
            }
        }
    }
`
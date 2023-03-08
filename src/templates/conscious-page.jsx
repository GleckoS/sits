import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import TwoColumnFlex from "../components/sections/conscious-two-column-flex"
import Grid from "../components/sections/consious-grid"
import Hero from "../components/sections/hero-conscious"
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

export default function ConsciousPage({ data: { wpPage: { conscious } }, pageContext, location }) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <Hero data={conscious.heroSectionConscious} />
      <TwoColumnFlex data={conscious.twoColumnFlexConscious} />
      <TwoColumnFlex alt={true} data={conscious.twoColumnFlexConsciousSecond} />
      <Grid data={conscious.gridSectionConsious} />
      <TwoColumnFlex alt={true} data={conscious.twoColumnFlexConsciousThird} />
      <Map language={pageContext.language} />
    </Wrapper>
  )
}

export const query = graphql`
    query conscious($id: String!) {
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
            conscious {
              heroSectionConscious {
                pageTitle
                backgroundVideo {
                  altText
                  localFile {
                    publicURL
                  }
                }
                backgroundImage {
                  altText
                  localFile {
                    publicURL
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              gridSectionConsious{
                sectionTitle
                textUnderTitle
                imageOnTheLeft{
                    altText
                    localFile {
                      publicURL
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                }
                imageUnderSection{
                    altText
                    localFile {
                      publicURL
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                }
              }
              twoColumnFlexConscious {
                sectionTitle
                textUnderTitle
                imageOnTheLeftSide {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              twoColumnFlexConsciousSecond {
                sectionTitle
                textUnderTitle
                imageOnTheLeftSide {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
              twoColumnFlexConsciousThird {
                sectionTitle
                textUnderTitle
                imageOnTheLeftSide {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
        }
    }
`
import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '../components/sections/about-grid';
import TwoColumnFlex from '../components/sections/about-two-column-flex';
import TwoColumnGray from '../components/sections/about-two-column-flex-gray';
import Hero from '../components/sections/hero-about';
import Wrapper from '../components/sections/page-wrapper';
import { myContext } from '../hooks/provider';
import Seo from '../layout/seo';

export function Head({
  pageContext,
  data: {
    wpPage: { seo },
  },
}) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  );
}

export default function AboutPage({
  pageContext,
  data: {
    wpPage: { aboutUs },
  },
}) {
  console.log(aboutUs);
  return (
    <Wrapper>
      <myContext.Consumer>
        {(context) => {
          context.setLanguage(pageContext.language);
        }}
      </myContext.Consumer>
      <Hero data={aboutUs.heroSection} />
      <Grid data={aboutUs.gridSection} />
      <TwoColumnFlex data={aboutUs.twoColumnFlex} />
      <TwoColumnGray data={aboutUs.twoColumnFlexWithGrayBackground} />
    </Wrapper>
  );
}

export const query = graphql`
  query about($id: String!) {
    wpPage(id: { eq: $id }) {
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
      aboutUs {
        heroSection {
          pageTitle
          backgroundImage {
            altText
            localFile {
              childImageSharp {
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
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imageOnTheRight {
            altText
            localFile {
              childImageSharp {
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
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        twoColumnFlexWithGrayBackground {
          textOnTheRight
          imageOnTheLeft {
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
`;

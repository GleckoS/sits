import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/sections/hero-career';
import NoJobOffers from '../components/sections/no-job-offers';
import NoSpecificOffer from '../components/sections/no-specific-offer';
import OfferList from '../components/sections/offer-list';
import Wrapper from '../components/sections/page-wrapper';
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

export default function CareerPage({
  pageContext,
  data: {
    wpPage: { career },
    allWpJobOffers: { nodes: offers },
  },
}) {
  const langOffers = offers.filter((offer) => offer.language.code === pageContext.language);

  return (
    <Wrapper>
      <Hero data={{ ...career.careerHero, language: pageContext.language }}></Hero>
      {!career.noOffersVisible && langOffers.length > 0 ? (
        <>
          <OfferList data={{ heading: career.listTitle, offers: langOffers, language: pageContext.language }} />
          <NoSpecificOffer data={{ ...career.offersAvailable, language: pageContext.language, citiesAvailable: career.citiesAvailable }} />
        </>
      ) : (
        <NoJobOffers data={{ listTitle: career.listTitle, ...career.noOffers, language: pageContext.language, citiesAvailable: career.citiesAvailable }} />
      )}
    </Wrapper>
  );
}

export const query = graphql`
  query career($id: String!) {
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
      career {
        noOffersVisible
        listTitle
        careerHero {
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          heading
          paragraph
        }
        offersAvailable {
          heading
          paragraph
        }
        noOffers {
          heading
          paragraph
        }
        citiesAvailable {
          city
          email
        }
      }
    }
    allWpJobOffers {
      nodes {
        id
        title
        uri
        language {
          name
          code
        }
        jobOfferDetails {
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          city
          employmentType
          shiftType
          validUntil
          createdAt
        }
      }
    }
  }
`;

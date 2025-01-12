import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import CareerFormWrapper from '../components/organism/career-form-wrapper';
import JobOfferContent from '../components/sections/job-offer-content';
import JobOfferGrid from '../components/sections/job-offer-gird';
import JobOfferHeader from '../components/sections/job-offer-header';
import Wrapper from '../components/sections/page-wrapper';
import { parseDate } from '../helpers/parse-date';
import Seo from '../layout/seo';
import { navigate } from '@reach/router';

export function Head({
  pageContext,
  data: {
    wpJobOffers: { seo, language, jobOfferDetails },
  },
}) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} noindex={parseDate(jobOfferDetails.validUntil) < new Date()} />
    </>
  );
}

export default function JobOfferPage({ pageContext, data: { wpJobOffers } }) {
  React.useEffect(() => {
    if (parseDate(wpJobOffers.jobOfferDetails.validUntil) < new Date() || !wpJobOffers) {
      navigate('/404');
    }
  }, [wpJobOffers.jobOfferDetails.validUntil]);

  return (
    <Wrapper>
      <JobOfferGrid>
        <JobOfferHeader data={{ title: wpJobOffers.title, ...wpJobOffers.jobOfferDetails, language: wpJobOffers.language.code, city: wpJobOffers.jobOfferDetails.city.split(',')[0] }} />
        <JobOfferContent data={{ ...wpJobOffers.jobOfferDetails, language: wpJobOffers.language.code }} />
        <CareerFormWrapper data={{ language: wpJobOffers.language.code, jobTitle: wpJobOffers.title, selectedCity: wpJobOffers.jobOfferDetails.city.split(',')[0], receiverEmail: wpJobOffers.jobOfferDetails.city.split(',')[1] }} />
      </JobOfferGrid>
    </Wrapper>
  );
}

export const query = graphql`
  query jobOffer($id: String!) {
    wpJobOffers(id: { eq: $id }) {
      title
      language {
        id
        code
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
        noExpirationDate
        validUntil
        createdAt
        jobFields {
          heading
          content
        }
      }
    }
  }
`;

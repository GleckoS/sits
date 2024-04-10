import { graphql } from "gatsby";
import React from "react";
import Seo from "../layout/seo";
import { Helmet } from "react-helmet";
import Wrapper from "../components/sections/page-wrapper";
import { myContext } from "../hooks/provider";
import EventForm from "../components/sections/event-form";

export function Head({
  pageContext,
  data: {
    wpEvent: { seo },
  },
}) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo
        seo={seo}
        pageContext={pageContext}
        language={pageContext.language}
      />
    </>
  );
}

export default function Event({
  data: {
    wpEvent: { title, event },
  },
  pageContext,
}) {
  return (
    <Wrapper>
      <myContext.Consumer>
        {(context) => {
          context.setLanguage(pageContext.language);
        }}
      </myContext.Consumer>
      <EventForm language={pageContext.language} title={title} event={event} />
    </Wrapper>
  );
}

export const query = graphql`
  query bestsellers($id: String!) {
    wpEvent(id: { eq: $id }) {
      title
      event {
        placeAtEventForm
        idOfContactForm
        additionalDescriptionAboveForm
        additionalDescriptionUnderForm
        privacyPolicyCheckboxText
        dates
        endDate
        place
        startDate
        imageNextToContactForm {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
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
`;

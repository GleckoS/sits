import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Title } from '../components/moleculas/title-sub';
import Map from '../components/sections/map';
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

export default function InformPage({
  data: {
    wpPage: { informPage },
  },
  pageContext,
}) {
  console.log(informPage);
  return (
    <Wrapper>
      <Title title={informPage?.heading} text={informPage?.content} />
      <Map language={pageContext.language} />
    </Wrapper>
  );
}

export const query = graphql`
  query conscious($id: String!) {
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
      informPage {
        heading
        content
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

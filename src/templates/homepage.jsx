import { graphql } from "gatsby";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import About from "../components/sections/about";
import Bestsellers from "../components/sections/bestsellers-carousel";
import DividerCollection from "../components/sections/divider-collection";
import Hero from "../components/sections/hero-homepage";
import Map from "../components/sections/map";
import NewArrivals from "../components/sections/new-arrivals";
import ProductGrid from "../components/sections/products-grid";
import ThreeInformCards from "../components/sections/three-inform-cards";
import Seo from "../layout/seo";
import Wrapper from "../components/sections/page-wrapper";
import UpcomingEvents from "../components/sections/upcoming-events";

export function Head({
  pageContext,
  data: {
    wpPage: { seo },
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

export default function Homepage({
  data: {
    allWpEvent,
    wpPage: { language, translations, homepage },
  },
  pageContext,
}) {
  const [filteredEvents] = useState(() => {
    return allWpEvent.nodes
      .filter((el) => {
        const [day, month, year] = el.event.endDate.split("/");
        const date = new Date(year, month - 1, day);
        const today = new Date();

        if (date.getTime() < today.getTime()) return false;

        return true;
      })
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.event.startDate.split("/");
        const dateA = new Date(yearA, monthA - 1, dayA);
        const [dayB, monthB, yearB] = b.event.startDate.split("/");
        const dateB = new Date(yearB, monthB - 1, dayB);

        if (dateA.getTime() < dateB.getTime()) return -1;
        if (dateA.getTime() > dateB.getTime()) return 1;

        return 0;
      })
      .slice(0, 2);
  }, [allWpEvent]);

  return (
    <Wrapper>
      <Hero data={homepage.heroH} />
      <Bestsellers
        language={pageContext.language}
        data={homepage.bestsellersCarousel}
      />
      <About data={homepage.aboutSection} />
      <ProductGrid data={homepage.productsGrid} />
      <DividerCollection data={homepage.dividerSection} />
      <NewArrivals
        language={pageContext.language}
        mt={true}
        data={homepage.newArrivalsH}
      />
      <ThreeInformCards data={homepage.sectionWithThreeInformCardsH} />
      <UpcomingEvents data={filteredEvents} language={pageContext.language} />
      <Map language={pageContext.language} />
    </Wrapper>
  );
}

export const query = graphql`
  query homepage($id: String!, $language: WpLanguageCodeEnum) {
    allWpEvent(filter: { language: { code: { eq: $language } } }) {
      nodes {
        title
        event {
          dates
          endDate
          place
          startDate
          fairFolder {
            localFile {
              publicURL
              prettySize
            }
            mediaItemUrl
          }
          previewImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 80)
              }
            }
          }
        }
      }
    }
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
      homepage {
        sectionWithThreeInformCardsH {
          cards {
            title
            text
            link {
              title
              url
              target
            }
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
        heroH {
          backgroundImageMobile {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          backgroundVideo {
            altText
            localFile {
              publicURL
            }
          }
          pageTitle
          linkUnderPageTitle {
            url
            title
            target
          }
          backgroundImage {
            altText
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
        }
        bestsellersCarousel {
          text
          sectionTitle
          seeAllLink {
            url
            title
            target
          }
          carousel {
            selectedCollection {
              ... on WpCollection {
                id
                slug
                title
                collections {
                  generalCollectionInformation {
                    homepageSliderPreviewImage {
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
          }
        }
        aboutSection {
          sectionTitle
          text
          linkUnderText {
            url
            title
            target
          }
          imageOnTheLeftSide {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        productsGrid {
          sectionTitle
          text
          firstLink {
            url
            title
            target
          }
          firstImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          secondLink {
            url
            title
            target
          }
          secondImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          thirdLink {
            url
            title
            target
          }
          thirdImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          fourthLink {
            url
            title
            target
          }
          fourthImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          sixthLink {
            url
            title
            target
          }
          sixthImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          seventhLink {
            url
            title
            target
          }
          seventhImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          eightsLink {
            url
            title
            target
          }
          eightsImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        dividerSection {
          sectionTitle
          text
          link {
            url
            title
            target
          }
          squareImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          rectangularImageOnTheRight {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        newArrivalsH {
          sectionTitle
          text
          chosenProducts {
            products {
              ... on WpProduct {
                types {
                  nodes {
                    name
                    collectionTypes {
                      typeArchive {
                        url
                      }
                    }
                  }
                }
                products {
                  collection {
                    ... on WpCollection {
                      slug
                      title
                      covers {
                        nodes {
                          name
                        }
                      }
                      upholsterys {
                        nodes {
                          name
                        }
                      }
                      types {
                        nodes {
                          name
                          collectionTypes {
                            typeArchive {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                  isNewArrival
                  productGallery {
                    popupNames {
                      fabric
                      cover
                      leather
                      model
                    }
                    productsImages {
                      isMainImage
                      featuredProductImage {
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
            }
          }
        }
      }
    }
  }
`;

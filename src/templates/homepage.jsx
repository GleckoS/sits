import { graphql } from "gatsby"
import React from "react"
import About from "../components/sections/about"
import Bestsellers from "../components/sections/bestsellers-carousel"
import DividerCollection from "../components/sections/divider-collection"
import Hero from "../components/sections/hero-homepage"
import Map from "../components/sections/map"
import NewArrivals from "../components/sections/new-arrivals"
import ProductGrid from "../components/sections/products-grid"
import ThreeInformCards from "../components/sections/three-inform-cards"

// export function Head({ data: { wpPage: { seo } } }) {

//     const canonical = 'https://splatapozyczek.pl' + seo.canonical

//     return (
//         <>
//             <meta charSet="utf-8" />
//             <meta name="robots" content="noindex" />
//             <meta property="og:site_name" content={seo.opengraphSiteName} />
//             <meta name="google-site-verification" content="M2kghTKPmXOB2ezGLw7ShbO3sdW6rMn_uhsSVbHCt7I" />

//             <script type="application/ld+json">
//                 {JSON.stringify(
//                     { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": "https://splatapozyczek.pl/#organization", "name": "Splatapozyczek.pl", "url": "https://splatapozyczek.pl/", "sameAs": ["https://www.facebook.com/splatapozyczek", "https://www.instagram.com/splatapozyczek.pl/", "https://www.youtube.com/channel/UCdpboPGWbJy_e8Je_Xw9i9Q"], "logo": { "@type": "ImageObject", "@id": "https://splatapozyczek.pl/#logo", "inLanguage": "pl-PL", "url": "https://splatapozyczek.pl/wp-content/uploads/2019/01/splatapozyczek-logo-x2.png", "width": 262, "height": 120, "caption": "Splatapozyczek.pl" }, "image": { "@id": "https://splatapozyczek.pl/#logo" } }, { "@type": "WebSite", "@id": "https://splatapozyczek.pl/#website", "url": "https://splatapozyczek.pl/", "name": "Splatapozyczek.pl", "description": "SplataPozyczek.pl \u2013 \u2705 kredyty got\u00f3wkowe, kredyt dla firm, po\u017cyczka konsolidacyjna, odd\u0142u\u017canie.", "publisher": { "@id": "https://splatapozyczek.pl/#organization" }, "potentialAction": [{ "@type": "SearchAction", "target": "https://splatapozyczek.pl/?s={search_term_string}", "query-input": "required name=search_term_string" }], "inLanguage": "pl-PL" }, { "@type": "WebPage", "@id": "https://splatapozyczek.pl/#webpage", "url": "https://splatapozyczek.pl/", "name": "Z nami uzyskasz nawet najtrudniejszy kredyt - Splatapozyczek.pl", "isPartOf": { "@id": "https://splatapozyczek.pl/#website" }, "about": { "@id": "https://splatapozyczek.pl/#organization" }, "datePublished": "2015-11-18T08:37:53+00:00", "dateModified": "2022-07-20T09:58:31+00:00", "description": "Niestandardowa umowa pracownicza? Brak zdolno\u015bci kredytowej? Inne zobowi\u0105zania? Mo\u017cemy uzyska\u0107 kredyt dla Ciebie nawet w 24 H.", "inLanguage": "pl-PL", "potentialAction": [{ "@type": "ReadAction", "target": ["https://splatapozyczek.pl/"] }] }] }
//                 )}
//             </script>

//             {canonical
//                 ? (
//                     <>
//                         <link rel="canonical" href={canonical} />
//                         <meta property="og:url" content={canonical} />
//                     </>
//                 )
//                 : null}

//             {seo?.title
//                 ? (
//                     <>
//                         <title>{seo.title}</title>
//                         <meta property="twitter:title" content={seo.title} />
//                         <meta property="og:title" content={seo.title} />
//                     </>
//                 )
//                 : null}

//             {seo?.metaDesc
//                 ? (
//                     <>
//                         <meta name="description" content={seo.metaDesc} />
//                         <meta property="twitter:description" content={seo.metaDesc} />
//                         <meta property="og:description" content={seo.metaDesc} />
//                     </>
//                 )
//                 : null}

//             {seo.opengraphImage?.localFile?.publicURL
//                 ? (
//                     <>
//                         <meta property="og:image" content={'https://splatapozyczek.pl' + seo.opengraphImage.localFile.publicURL} />
//                         <meta property="twitter:image" content={'https://splatapozyczek.pl' + seo.opengraphImage.localFile.publicURL} />
//                     </>
//                 )
//                 : null}
//         </>
//     )
// }

export function Head() {
  return (
    <meta name="robots" content="noindex"/>
  )
}

export default function Homepage({ data: { wpPage: { homepage } }, pageContext }) {
  return (
    <main>
      <Hero data={homepage.heroH} />
      <Bestsellers data={homepage.bestsellersCarousel} />
      <About data={homepage.aboutSection} />
      <ProductGrid data={homepage.productsGrid} />
      <DividerCollection data={homepage.dividerSection} />
      <NewArrivals mt={true} data={homepage.newArrivalsH} />
      <ThreeInformCards data={homepage.sectionWithThreeInformCardsH}/>
      <Map/>
    </main>
  )
}

export const query = graphql`
    query homepage($id: String!) {
        wpPage(id: {eq: $id}){
          homepage {
            sectionWithThreeInformCardsH{
              cards{
                title
                text
                link{
                  title
                  url
                  target
                }
                image{
                  altText
                  localFile{
                    childImageSharp{
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            heroH {
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
                    gatsbyImageData
                  }
                }
              }
            }
            bestsellersCarousel {
              text
              sectionTitle
              seeAllLink{
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
            dividerSection{
              sectionTitle
              text
              link{
                url
                title
                target
              }
              squareImage{
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              rectangularImageOnTheRight{
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            newArrivalsH{
              sectionTitle
              text
              chosenProducts {
                products {
                  ... on WpProduct {
                    types {
                      nodes {
                        name
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
                          upholsterys{
                            nodes{
                              name
                            }
                          }
                          types {
                            nodes {
                              name
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
`
import { graphql } from "gatsby"
import React from "react"
import Hero from "../components/sections/hero-materials"
import Map from "../components/sections/map"
import RecomendedCovers from "../components/sections/recomended-covers"
import SimilarProducts from "../components/sections/similar-products"
import Video from "../components/sections/video"

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
    <meta name="robots" content="noindex" />
  )
}

const similarTitle = {
  en: ' is a popular choice for these models'
}

const coversTitle = {
  en: 'Similar Covers'
}

export default function Material({ location, data: { wpMaterials }, pageContext }) {

  return (
    <main>
      <Hero isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video && !wpMaterials.materials.popularProductsUsingThisMaterial.productList} variant={location?.state?.variant} data={wpMaterials} />
      {wpMaterials.materials.popularProductsUsingThisMaterial.productList
        && <SimilarProducts isLast={!wpMaterials.materials.similarCovers.covers && !wpMaterials.materials.videoSection?.video} materials={true} title={wpMaterials.title + similarTitle['en']} data={wpMaterials.materials.popularProductsUsingThisMaterial.productList} />}

      {wpMaterials.materials.videoSection?.video
        && <Video isLast={!wpMaterials.materials.similarCovers.covers} materials={true} data={wpMaterials.materials.videoSection} />}

      {wpMaterials.materials.similarCovers.covers
        && <RecomendedCovers background='white' title={coversTitle['en']} data={wpMaterials.materials.similarCovers} />}

      <Map />
    </main>
  )
}

export const query = graphql`
    query material($id: String!) {
        wpMaterials(id: {eq: $id}) {
          title
          features {
            nodes {
              name
              taxonomy {
                tooltip
                image {
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
            }
          }
          textures {
            nodes {
              name
              taxonomy {
                tooltip
                image {
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
            }
          }
          careInstructions {
            nodes {
              name
              taxonomy {
                tooltip
                image {
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
            }
          }
          materials {
            popularProductsUsingThisMaterial {
              productList {
                product {
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
            similarCovers {
              covers {
                cover {
                  ... on WpMaterials {
                    title
                    slug
                    materials {
                        materialColorVariants {
                            variantColor
                            variantColorImage{
                              altText
                              localFile{
                                publicURL
                              }
                            }
                            variantName
                            colorGroup
                            isMainColor
                            squarePreviewImage {
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
            videoSection {
              video {
                altText
                localFile{
                  publicURL
                }
              }
              previewImage {
                altText
                localFile{
                  publicURL
                  childImageSharp{
                    gatsbyImageData
                  }
                }
              }
            }
            generalMaterialInformation: generalMaterialInformationCopy {
              materialQuickDescription
              textUnderCareInstructionIcons
              materialProductSheet {
                altText
                localFile {
                  publicURL
                }
              }
            }
            materialColorVariants {
              colorGroup
              isMainColor
              variantName
              variantColor
              variantColorImage{
                altText
                localFile{
                  publicURL
                }
              }
              variantGallery {
                altText
                localFile {
                    publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              squarePreviewImage {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              landscapePreviewImage {
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
import { graphql } from "gatsby"
import React from "react"
import { useMemo } from "react"
import Hero from "../components/sections/hero-collection"
import About from "../components/sections/about"
import RecomendedCovers from "../components/sections/recomended-covers"
import Accessories from "../components/sections/accessories"
import SimilarProducts from "../components/sections/similar-products"
import Map from "../components/sections/map"
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
    <meta name="robots" content="noindex"/>
  )
}

export default function Collection({ data: { wpCollection, allWpProduct }, pageContext }) {

  const products = useMemo(() => {
    return allWpProduct.nodes.filter(el => el.products?.collection?.id === wpCollection.id)
  }, [allWpProduct, wpCollection])

  return (
    <main>
      <Hero
        itemCategories={wpCollection.types.nodes}
        products={products}
        data={wpCollection}
      />
      {wpCollection.collections.twoColumn.imageOnTheLeftSide && <About color={true} data={wpCollection.collections.twoColumn} />}
      {wpCollection.collections.videoSection?.video && <Video data={wpCollection.collections.videoSection}/>}
      {wpCollection.collections.recommendedCovers.covers && <RecomendedCovers title={wpCollection.title} data={wpCollection.collections.recommendedCovers} />}
      {wpCollection.collections.accessoriesSection.accessories && <Accessories data={wpCollection.collections.accessoriesSection.accessories} />}
      {wpCollection.collections.similarCollectionsSection.similarCollections && <SimilarProducts data={wpCollection.collections.similarCollectionsSection.similarCollections} />}
      <Map />
    </main>
  )
}

export const query = graphql`
    query collection($id: String!) {
          wpCollection(id: {eq: $id}){
            id
            collections {
              videoSection {
                video{
                  altText
                  localFile {
                    publicURL
                  }
                }
                previewImage{
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
              similarCollectionsSection {
                similarCollections {
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
              accessoriesSection {
                accessories {
                  accessoryTitle
                  accessoryImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
              recommendedCovers {
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
              twoColumn {
                sectionTitle
                text
                linkUnderText {
                  target
                  title
                  url
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
              sidebarCollectionInformation {
                legs {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions : legsDimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                        childImageSharp{
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
                dimensions {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                        childImageSharp{
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
                armrest {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions : armrestDimensions {
                    textUnderTitle
                    title
                    image {
                      altText
                      localFile{
                        publicURL
                        childImageSharp{
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
                accessories {
                  featuredImageTitle
                  featuredImageTextUnderTitle
                  featuredImage {
                    altText
                    localFile{
                      childImageSharp{
                        gatsbyImageData
                      }
                    }
                  }
                  dimensions {
                    title
                    textUnderTitle
                    image {
                      altText
                      localFile{
                        publicURL
                        childImageSharp{
                          gatsbyImageData
                        }
                      }
                    }
                  }
                }
              }
              generalCollectionInformation {
                collectionQuickDescription
                collectionGallery {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                collectionProductSheet {
                  localFile {
                    publicURL
                  }
                }
                collectionPagePreviewImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                popupNames {
                  material
                  tableTopMaterial
                  materialOfTheLegs
                  accessories
                  armrest
                  comfort
                  fabric
                  cover
                  leather
                  legs
                  model
                }
              }
            }
            title
            types {
              nodes {
                name
              }
            }
            comfort {
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
            covers {
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
            upholsterys {
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
          }
          allWpProduct{
            nodes{
              types {
                nodes {
                  name
                }
              }
            products {
                collection {
                  ... on WpCollection {
                    id
                  }
                }
                productGallery {
                  productsImages {
                    isMainImage
                    featuredProductImage {
                      altText
                      width
                      height
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                  }
                  popupNames {
                    material
                    tableTopMaterial
                    materialOfTheLegs
                    accessories
                    armrest
                    comfort
                    fabric
                    cover
                    leather
                    legs
                    model
                  }
                }
              }
            }
        }
    }
`
import React from "react"
import { searchParamName } from "../texts/filter"

const siteUrl = 'https://sits.eu'

export default function Seo({ language, isArchive = false, pageContext, seo }) {
    const canonical = siteUrl + pageContext.uri


    const thing = isArchive && {
        "thing": {
            "@type": "ProductGroup",
            "name": pageContext.productType,
            "description": seo.metaDesc,
            // "keywords": "dining chairs",
            // "image": "https://www.sits.eu/sites/default/files/styles/product_view_top_slider/public/SOPHIA_technical_3seater_nori_1_nature_1.jpg?itok=iT3cN9eI",
            "url": canonical
        }
    }
    return (
        <>
            <meta charSet="utf-8" />
            <meta property="og:site_name" content={seo.opengraphSiteName} />
            <meta name="google-site-verification" content="M2kghTKPmXOB2ezGLw7ShbO3sdW6rMn_uhsSVbHCt7I" />
            <meta name="facebook-domain-verification" content="Kgqyu3tcp9asb3ha11p2x50c0lzfxnm" />

            {/* 
            <link rel="alternate" href="https://www.sits.eu/" hreflang="x-default" />
            <link rel="alternate" href="https://www.sits.eu/" hreflang="en" />
            <link rel="alternate" href="https://www.sits.eu/fr" hreflang="fr" />
            <link rel="alternate" href="https://www.sits.eu/pl" hreflang="pl" />
            <link rel="alternate" href="https://www.sits.eu/sv" hreflang="sv" />
            <link rel="alternate" href="https://www.sits.eu/he" hreflang="he" /> */}

            {canonical
                ? (
                    <>
                        <link rel="canonical" href={canonical} />
                        <meta property="og:url" content={canonical} />
                    </>
                )
                : null}

            {seo?.title
                ? (
                    <>
                        <title>{seo.title}</title>
                        <meta property="twitter:title" content={seo.title} />
                        <meta property="og:title" content={seo.title} />
                    </>
                )
                : null}

            {seo?.metaDesc
                ? (
                    <>
                        <meta name="description" content={seo.metaDesc} />
                        <meta property="twitter:description" content={seo.metaDesc} />
                        <meta property="og:description" content={seo.metaDesc} />
                    </>
                )
                : null}

            {seo.opengraphImage?.localFile?.publicURL
                ? (
                    <>
                        <meta property="og:image" content={siteUrl + seo.opengraphImage.localFile.publicURL} />
                        <meta property="twitter:image" content={siteUrl + seo.opengraphImage.localFile.publicURL} />
                    </>
                )
                : (
                    <>
                        <meta property="og:image" content={siteUrl + '/og-image.jpg'} />
                        <meta property="twitter:image" content={siteUrl + '/og-image.jpg'} />
                    </>
                )}

            <script type="application/ld+json">
                {JSON.stringify(
                    {
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        "name": "Sits",
                        "mainEntityOfPage": siteUrl,
                        "url": siteUrl,
                        "sameAs": [
                            "https://www.instagram.com/sits_furniture/",
                            "https://www.youtube.com/channel/UCrrbGKeNadbEzjNtwEQeazA",
                            "https://pl.pinterest.com/sitseu/",
                            "https://twitter.com/sitseu",
                            "https://www.facebook.com/sitseu/"
                        ],
                        "email": "sits@sits.eu",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+48 564 930 700",
                            "contactType": "customer support",
                            "contactOption": "TollFree",
                            "areaServed": "PL"
                        },

                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Brodnica, Poland",
                            "postalCode": "87-300",
                            "streetAddress": "Gen. Sikorskiego 60"
                        },
                        "logo": "https://sits.eu/sites/default/files/logo.png",
                        "vatId": "8741704017",
                        thing,
                        "ispartof": {
                            "@type": "WebSite",
                            "name": "Sits Furniture",
                            "url": siteUrl,
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": canonical + "?" + searchParamName[language] + "=" + "{search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        }

                    }
                )}
            </script>
        </>
    )
}
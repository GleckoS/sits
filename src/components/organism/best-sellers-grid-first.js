import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { TextBlock } from "../moleculas/best-sellers-grid-text-block"

export const First = ({ data: { slug, title, collections: { collectionBestsellerImageGrid } } }) => (
    <Wrapper>
        <TextBlock title={title} slug={slug} description={collectionBestsellerImageGrid.collectionShortBestsellerPageDescription} />
        <GatsbyImage className="s" image={collectionBestsellerImageGrid.smallSquare.localFile.childImageSharp.gatsbyImageData} alt={collectionBestsellerImageGrid.smallSquare.altText} />
        <GatsbyImage className="b desctop" image={collectionBestsellerImageGrid.bigLandscape.localFile.childImageSharp.gatsbyImageData} alt={collectionBestsellerImageGrid.bigLandscape.altText} />
        <GatsbyImage className="b tablet" image={collectionBestsellerImageGrid.smallLandscape.localFile.childImageSharp.gatsbyImageData} alt={collectionBestsellerImageGrid.smallLandscape.altText} />
    </Wrapper>
)

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
    height: clamp(0px, ${900 / 1920 * 100}vw, 900px);
    grid-template-areas: 
    't b b b'
    's b b b';

    .mobile, .tablet{
        display: none;
    }

    .t{
        grid-area: t;
    }

    .s{
        grid-area: s;
    }

    .b{
        grid-area: b;
        min-height: 343px;
        
        @media (max-width: 640px) {
            margin: 0 -24px;
            min-height: 250px;
        }

        @media (max-width: 389px) {
            min-height: 200px;
        }
    }

    @media (max-width: 1440px) {
        margin: 0 -21px;
    }

    @media (max-width: 1240px) {
        margin: 0;
        height: clamp(0px, ${900 / 1194 * 100}vw, 900px);
        max-height: 1020px;
        grid-template-areas: 
        'b b b b'
        't t s s';
        grid-template-rows: auto auto;

        .desctop{
            display: none;
        }

        .tablet{
            display: block;
        }
    }

    @media (max-width: 1000px) {
        height: unset;
    }

    @media (max-width: 640px) {

        .s{
            display: none;
        }

        grid-template-areas: 
        'b b b b'
        't t t t';
    }
`

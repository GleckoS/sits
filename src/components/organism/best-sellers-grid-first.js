import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const First = ({ data: { slug, title, collections: { collectionBestsellerImageGrid } } }) => (
    <Wrapper>
        <TextBlock className="t">
            <h2 className="title">{title}</h2>
            <div className="text" dangerouslySetInnerHTML={{ __html: collectionBestsellerImageGrid.collectionShortBestsellerPageDescription }}></div>
            <Link className="link" to={'/' + slug + '/'}>EXPLORE</Link>
        </TextBlock>
        <GatsbyImage className="s" image={collectionBestsellerImageGrid.smallSquare.localFile.childImageSharp.gatsbyImageData} alt={collectionBestsellerImageGrid.smallSquare.altText} />
        <GatsbyImage className="b" image={collectionBestsellerImageGrid.bigLandscape.localFile.childImageSharp.gatsbyImageData} alt={collectionBestsellerImageGrid.bigLandscape.altText} />
    </Wrapper>
)

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
    grid-template-areas: 
    't b b b'
    's b b b';

    .t{
        grid-area: t;
    }

    .s{
        grid-area: s;
    }

    .b{
        grid-area: b;
    }

    @media (max-width: 1194px) {
        max-height: 1020px;
        grid-template-areas: 
        'b b b b'
        't t s s';
    }
`

const TextBlock = styled.div`
    height: 100%;
    max-width: 380px;
    display: flex;
    justify-content : center;
    flex-direction: column;
    margin: 0 auto;

    .title{
        font-family: 'Ivy';
        font-size: 40px;
        font-weight: 300;
        text-decoration: underline;
        margin-bottom: 24px;
    }

    .text{
        font-size: clamp(20px, ${20 / 1194 * 100}vw, 24px);
        font-weight: 300;
        margin-bottom: 40px;

        @media (max-width: 1194px) {
            font-size: 24px;
        }
    }

    .link{
        font-size: 18px;
        font-weight: 300;
        text-decoration: underline;
    }
`
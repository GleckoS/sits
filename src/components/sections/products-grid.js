import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function ProductGrid({ title, data: {
    sectionTitle, text,
    firstLink, firstImage,
    secondLink, secondImage,
    thirdLink, thirdImage,
    fourthLink, fourthImage,
    sixthLink, sixthImage,
    seventhLink, seventhImage,
    eightsLink, eightsImage } }) {
    return (
        <Wrapper>
            <Container>
                {title
                    ? <h1 className="title">{title}</h1>
                    : <h2 className="title">{sectionTitle}</h2>}
                {text && <p className="text">{text}</p>}
            </Container>
            <Grid>
                <Item to={firstLink.url} target={firstLink.target ? firstLink.target : null} className="first">
                    <p >{firstLink.title}</p>
                    <GatsbyImage image={firstImage.localFile.childImageSharp.gatsbyImageData} alt={firstImage.altText} />
                </Item>
                <Item to={secondLink.url} target={secondLink.target ? secondLink.target : null} className="second">
                    <p >{secondLink.title}</p>
                    <GatsbyImage image={secondImage.localFile.childImageSharp.gatsbyImageData} alt={secondImage.altText} />
                </Item>
                <Item to={thirdLink.url} target={thirdLink.target ? thirdLink.target : null} className="third">
                    <p >{thirdLink.title}</p>
                    <GatsbyImage image={thirdImage.localFile.childImageSharp.gatsbyImageData} alt={thirdImage.altText} />
                </Item>
                <Item to={fourthLink.url} target={fourthLink.target ? fourthLink.target : null} className="fourth">
                    <p >{fourthLink.title}</p>
                    <GatsbyImage image={fourthImage.localFile.childImageSharp.gatsbyImageData} alt={fourthImage.altText} />
                </Item>
                <Item to={sixthLink.url} target={sixthLink.target ? sixthLink.target : null} className="sixth">
                    <p >{sixthLink.title}</p>
                    <GatsbyImage image={sixthImage.localFile.childImageSharp.gatsbyImageData} alt={sixthImage.altText} />
                </Item>
                <Item to={seventhLink.url} target={seventhLink.target ? seventhLink.target : null} className="seventh">
                    <p >{seventhLink.title}</p>
                    <GatsbyImage image={seventhImage.localFile.childImageSharp.gatsbyImageData} alt={seventhImage.altText} />
                </Item>
                <Item to={eightsLink.url} target={eightsLink.target ? eightsLink.target : null} className="eights">
                    <p >{eightsLink.title}</p>
                    <GatsbyImage image={eightsImage.localFile.childImageSharp.gatsbyImageData} alt={eightsImage.altText} />
                </Item>
            </Grid>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    max-width: 1832px;
    margin: clamp(40px, ${100 / 1194 * 100}vw,110px) auto 0 auto;

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-align: center;
    }

    .text{
        margin: 0 auto;
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 40px);
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        text-align: center;
        max-width: 816px;

        @media (max-width: 768px) {
            max-width: 480px;
        }
    }
`

const Grid = styled.div`
    margin-top: clamp(40px, ${80 / 1194 * 100}vw, 80px);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 71fr 60fr 60fr 71fr;
    grid-template-areas: 
    'first first second'
    'third sixth sixth'
    'fourth sixth sixth'
    'seventh eights eights';
    grid-gap: 16px;

    @media (max-width: 640px) {
        grid-gap: 4px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: 
        'first first'
        'second third'
        'sixth sixth'
        'fourth seventh'
        'eights eights';
    }

    .first{
        grid-area: first;
    }

    .second{
        grid-area: second;
    }

    .third{
        grid-area: third;
    }

    .fourth{
        grid-area: fourth;
    }

    .sixth{
        grid-area: sixth;
    }

    .seventh{
        grid-area: seventh;
    }

    .eights{
        grid-area: eights;
    }
`

const Item = styled(Link)`
    position: relative;
    display: block;
    background: #000;
    overflow: hidden;

    &:hover{
        p{
            background-color: rgba(0, 0, 0, 0.4);
        }
        img{
            transform: scale(1.05);
        }
    }

    p{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        font-size: clamp(24px, ${44 / 1194 * 100}vw, 44px);
        font-weight: 300;
        text-transform: uppercase;
        color: #fff;
        transition: background-color var(--animation);
    }

    .gatsby-image-wrapper{
        height: 100%;
        img{
            transition: transform var(--animation);
        }
    }

    @media (max-width: 640px){
        height: calc(50vw - 2px);
        min-height: 193px;
    }
`
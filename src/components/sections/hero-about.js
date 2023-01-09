import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Hero({ data: { pageTitle, backgroundImage } }) {
    return (
        <Wrapper>
            <GatsbyImage className="image" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} />
            <Container className="container">
                <h1 className="archive-title">{pageTitle}</h1>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section` 
    position: relative;
    .image{
        min-height: 540px;
        max-height: calc(100vh - 94px);
    }
    .container{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        h1{
            text-align: center;
            font-family: 'Ivy';
            font-weight: 300;
            text-decoration: unset;
            font-size: clamp(56px, ${71 / 1194 * 100}vw, 88px);
            color: #fff;
        }
    }
`
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Hero({ data: { pageTitle, text, backgroundImage } }) {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <GatsbyImage className="image" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} />
                    <div className="text">
                        <h1>{pageTitle}</h1>
                        {text && <p>{text}</p>}
                    </div>
                </Content>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 50px;
    overflow-x: hidden;
    position: relative;

    @media (max-width: 1800px) {
        margin-top: 0;
    }
`

const Content = styled.div`
    position: relative;

    .image{
        min-height: 800px;
        width: 1800px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .text{
        position: absolute;
        right: 35px;
        top: 40%;
        transform: translateY(-50%);
        width: 450px;

        h1{
            font-family: 'Ivy';
            font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            text-decoration: underline;
            font-weight: 300;
            color: #FFFFFF;
        }

        p{
            width: 380px;
            margin-top: 40px;
            color: #FFFFFF;
            font-size: 24px;
            font-weight: 300;
        }
    }

`
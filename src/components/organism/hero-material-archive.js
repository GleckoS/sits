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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet laoreet neque. Curabitur et efficitur est. Quisque ac nulla ipsum. Aliquam ut erat.</p>
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

        @media (max-width: 1800px) {
            left: 100%;
            transform: translateX(calc(-100% + 45px));
        }

        @media (max-width: 1024px) {
            left: unset;
            transform: unset;
            width: unset;
            min-height: unset;
            margin-top: 45px;
        }

        @media ( max-width: 768px) {
            margin-top: 24px;
            min-height: 210px;
            
        }

        @media (max-width: 389px) {
            margin: 0 -24px;
        }
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
            margin-top: clamp(24px, ${40 / 1194 * 100}vw, 40px);
            color: #FFFFFF;
            font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
            font-weight: 300;
        }

        @media (max-width: 1800px){
            right: 0;
            width: 400px;
        }

        @media (max-width: 1024px) {
            position: static;
            transform: unset;

            h1{
                margin-top: 40px;
                color: #31231E;
            }
            p{
                color: #31231E;
                max-width: 380px;
                width: 100%;
            }

            width: unset;
        }
    }

`
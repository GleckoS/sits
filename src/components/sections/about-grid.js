import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Grid({ data: { tekstUnderTitle, sectionTitle, imageUnderText, imageOnTheRight } }) {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <GatsbyImage className="image" image={imageOnTheRight.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheRight.altText} />
                    <GatsbyImage className="item" image={imageUnderText.localFile.childImageSharp.gatsbyImageData} alt={imageUnderText.altText} />
                    <div className="text">
                        <h2>{sectionTitle}</h2>
                        <div dangerouslySetInnerHTML={{ __html: tekstUnderTitle }} />
                    </div>
                </Content>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(40px, ${90 / 1194 * 100}vw, 250px);
`

const Content = styled.div`
    max-width: 1540px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: clamp(26px, ${50 / 1194 * 100}vw, 50px) clamp(26px, ${40 / 1194 * 100}vw, 40px);

    grid-template-areas: 
    'text image'
    'item image';

    @media (max-width: 1300px) {
        grid-template-rows: auto auto;
    }

    @media (max-width: 640px) {
        grid-template-areas: 
        'text'
        'item'
        'image';
        grid-template-columns: unset;
        grid-template-rows: unset;
        max-width: 640px;
        margin: 0 auto;

        .text{
            max-width: 500px;
        }
    }

    .image{
        grid-area: image;

        @media (max-width: 420px) {
            margin: 0 -24px;
        }
    }

    .item{
        grid-area: item;

        @media (max-width: 420px) {
            margin: 0 -24px;
        }

        img{
            height: 80%;
            

            @media (max-width: 1300px) {
             height: auto ;
            }
        }
    }

    .text{
        grid-area: text;
        height: fit-content;
        margin-top: auto;

        h2{
            font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            font-family: 'Ivy';
            font-weight: 300;
        }
        div{
            display: grid;
            grid-gap: clamp(16px, ${24 / 1194 * 100}vw, 24px);
            margin-top: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            *{
                font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
                font-weight: 300;

                @media (max-width: 1150px) {
                    font-size: clamp(16px, ${20 / 1150 * 100}vw, 20px);
                }
            }
        }   
    }
`
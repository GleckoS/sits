import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export default function Grid({ data: { sectionTitle, textUnderTitle, imageOnTheLeft, imageUnderSection } }) {
    return (
        <Wrapper>
            <div>
                <GatsbyImage image={imageOnTheLeft.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheLeft.altText} />
                <GatsbyImage className="second" image={imageUnderSection.localFile.childImageSharp.gatsbyImageData} alt={imageUnderSection.altText} />
            </div>
            <div className="text">
                <h2>{sectionTitle}</h2>
                <div dangerouslySetInnerHTML={{ __html: textUnderTitle }} />

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    max-width: 1520px;
    margin: 0 auto;
    margin-top: clamp(60px, ${90 / 1194 * 100}vw, 250px);


    display: grid;
    grid-template-columns: 768fr 686fr;
    grid-gap: 80px;

    @media (max-width: 1400px){
        align-items: center;
    }

    @media (max-width: 1194px){
        align-items: center;
        grid-gap: 40px;
    }

    @media (max-width: 640px) {
        display: flex;
        flex-direction: column-reverse;
    }

    .second{
        margin-top: -250px;
        margin-right: -50%;
        margin-left: 50%;
        max-height: 500px;
        aspect-ratio: 768/500;

        @media (max-width: 1400px){
            margin-left: auto;
            margin-right: auto;
            max-width: calc(100% - 120px);
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        @media (max-width: 1194px){
            margin-top: -150px;
        }
        @media (max-width: 964px){
            margin-top: -100px;
            max-width: calc(100% - 60px);
        }
    }

    .text{
        margin-top: auto;
        margin-bottom: 600px;
        margin-right: 80px;

        @media (max-width: 1400px) {
            margin-bottom: 200px;
            margin-top: 0;
        }

        @media (max-width: 1194px) {
            margin-bottom: 150px;
            margin-right: 45px;
        }

        @media (max-width: 964px){
            margin-bottom: 100px;
        }

        @media (max-width: 640px){
            margin: 0 24px;
        }


        h2{
            font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            font-family: 'Ivy';
            text-decoration: underline;
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
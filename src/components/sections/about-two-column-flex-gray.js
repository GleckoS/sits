import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export default function TwoColumnGray({ data: { textOnTheRight, imageOnTheLeft } }) {
    return (
        <Wrapper>
            <GatsbyImage image={imageOnTheLeft.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheLeft.altText} />
            <div className="text" dangerouslySetInnerHTML={{ __html: textOnTheRight }} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(60px, ${90 / 1194 * 100}vw, 250px);
    background-image: linear-gradient(90deg, #ebebeb 0%, #cecece 100%);
        margin-bottom: -120px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: clamp(40px, ${40 / 1194 * 100}vw, 60px);

    @media (max-width: 640px) {
        display: flex;
        flex-direction: column-reverse;
        margin-top: 0;
        padding-top: 50px;
        align-items: unset;
    }
    
    .text{
        margin-right: 45px;
        display: grid;
        grid-gap: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        margin-top: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        max-width: 734px;

        @media (max-width: 640px){
            max-width: 500px;
            margin: 0 24px;
        }

        *{
            font-size: clamp(16px, ${24 / 1194 * 100}vw, 32px);
            font-weight: 300;

            @media (max-width: 1150px) {
                font-size: clamp(16px, ${20 / 1150 * 100}vw, 20px);
            }
        }
    }  
`
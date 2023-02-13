import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import InView from "./in-view-provider"

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .3, delay: .3 } }
}

const textAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .3, delay: .6 } }
}

const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .5, delay: .9 } }
}

export default function TwoColumnFlex({ alt, data: { textUnderTitle, sectionTitle, imageOnTheLeftSide } }) {
    return (
        <InView>
            <Wrapper className={alt ? 'alt' : ''}>
                <motion.div variants={imageAnimation}>
                    <GatsbyImage className="image" image={imageOnTheLeftSide.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheLeftSide.altText} />
                </motion.div>
                <div className="text">
                    <motion.h2 variants={titleAnimation}>{sectionTitle}</motion.h2>
                    <motion.div variants={textAnimation} dangerouslySetInnerHTML={{ __html: textUnderTitle }} />
                </div>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
margin-top: clamp(60px, ${90 / 1194 * 100}vw, 250px);
display: grid;
grid-template-columns: auto auto;
align-items: center;
grid-gap: 80px;
grid-template-areas: 'image text';


&.alt{
    grid-template-areas: 'text image';
    grid-template-columns: 1fr auto;
    .text{
        margin-right: 0;
        margin-left: 200px;
    }

    @media (max-width: 1440px) {
        .text{
            margin-left: 100px;
            min-width: 440px;
        }
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        .text{
            min-width: unset;
        }
    }

    @media (max-width: 840px) {
        .text{
            margin-left: 24px;
        }
    }
}

@media (max-width: 1194px){
    grid-gap: 40px;
}

@media (max-width: 864px) {
    grid-template-columns: 1fr 1fr;
}

@media (max-width: 640px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 60px;
    align-items: unset;
}

.image{
    min-width: 576px;
    min-height: 630px;
    grid-area: image;

    @media (max-width: 1194px) {
        min-width: 400px;
    min-height: 530px;
    }

    @media (max-width:740px) {
        min-width: 300px;
        min-height: 500px;
    }   
}

.text{
    min-width: 435px;
    max-width: 734px;
    margin-right: 200px;
    position: relative;
    grid-area: text;

    @media (max-width: 1194px) {
        margin-right: 45px;
        min-width: 400px;
    }

    @media (max-width: 864px) {
        min-width: unset;
    }

    @media (max-width: 640px) {
        margin: 0 24px;
        max-width: 500px;
    }

    svg{
        position: absolute;
        right: 0;
        top: 0;
    }

    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
    }
    div{
        display: grid;
        grid-gap: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        margin-top: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        a{
            width: fit-content;
            position: relative;
            padding-bottom: 3px;
            text-decoration: unset !important;

            transition: background-size 0.5s ease-out;

            background-image: linear-gradient(#222b40, #222b40);
            background-size: 80% 1px;
            background-position: left bottom;
            background-repeat: no-repeat;

            &:hover {
                background-size: 100% 1px;
            }
        }
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


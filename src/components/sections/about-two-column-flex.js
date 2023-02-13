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

const svgAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: .1, delayChildren: 1.4 } }
}

const svgItemAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: .2, transition: { duration: .4 } }
}

export default function TwoColumnFlex({ data: { textUnderTitle, sectionTitle, imageOnTheLeft } }) {

    return (
        <InView>
            <Wrapper>
                <motion.div className="image" variants={imageAnimation}>
                    <GatsbyImage image={imageOnTheLeft.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheLeft.altText} />
                </motion.div>
                <div className="text">
                    <motion.h2 variants={titleAnimation}>{sectionTitle}</motion.h2>
                    <motion.div variants={textAnimation} dangerouslySetInnerHTML={{ __html: textUnderTitle }} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="205.044" height="204.42" viewBox="0 0 205.044 204.42">
                        <motion.g variants={svgAnimation} id="Group_654" data-name="Group 654" transform="translate(-795.5 -3069)" opacity="0.2">
                            <motion.path variants={svgItemAnimation} id="Polygon_5" data-name="Polygon 5" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(883.999 3069)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_6" data-name="Polygon 6" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(928.249 3081.465)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_7" data-name="Polygon 7" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(960.657 3113.873)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_8" data-name="Polygon 8" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(972.498 3158.122)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_11" data-name="Polygon 11" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(960.657 3202.372)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_12" data-name="Polygon 12" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(928.249 3234.78)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_14" data-name="Polygon 14" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(883.999 3246.621)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_13" data-name="Polygon 13" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(839.75 3234.78)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_10" data-name="Polygon 10" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(807.341 3202.372)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_9" data-name="Polygon 9" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(795.5 3158.122)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_3" data-name="Polygon 3" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(807.341 3113.873)" fill="#31231e" opacity="0.3" />
                            <motion.path variants={svgItemAnimation} id="Polygon_4" data-name="Polygon 4" d="M14.023,0l3.506,9.966,10.517.27-8.35,6.43L22.689,26.8l-8.667-5.992L5.356,26.8,8.35,16.666,0,10.236l10.517-.27Z" transform="translate(839.75 3081.465)" fill="#31231e" opacity="0.3" />
                        </motion.g>
                    </svg>
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

    @media (max-width: 1194px) {
        min-width: 400px;
    }

    @media (max-width: 864px) {
        min-width: unset;
    }
}

.text{
    min-width: 435px;
    max-width: 734px;
    margin-right: 200px;
    position: relative;

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


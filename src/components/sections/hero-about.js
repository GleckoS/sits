import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .5, delay: .3 } }
}

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .5, delay: .8 } }
}

export default function Hero({ data: { pageTitle, backgroundImage } }) {

    return (
        <InView>
            <Wrapper>
                <motion.div variants={imageAnimation}>
                    <GatsbyImage className="image" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} />
                </motion.div>
                <Container className="container">
                    <motion.h1 variants={titleAnimation} className="archive-title">{pageTitle}</motion.h1>
                </Container>
            </Wrapper>
        </InView>
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
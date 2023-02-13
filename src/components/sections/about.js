import { motion } from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6, delay: .3 } }
}

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4, delay: .5 } }
}

const textAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4, delay: .7 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0 1px' },
    animate: { opacity: 1, transition: { duration: .4, delay: .9 }, transitionEnd: { backgroundSize: '80% 1px' } }
}

export default function About({ color, data: { sectionTitle, text, linkUnderText, imageOnTheLeftSide } }) {

    return (
        <InView>
            <Wrapper className={color ? 'alt' : ''}>
                <motion.div variants={imageAnimation}>
                    <GatsbyImage image={imageOnTheLeftSide.localFile.childImageSharp.gatsbyImageData} alt={imageOnTheLeftSide.altText} />
                </motion.div>
                <Container className="container">
                    <div className="content">
                        <motion.h2 variants={titleAnimation} className="title">{sectionTitle}</motion.h2>
                        {text && <motion.div variants={textAnimation} className="text" dangerouslySetInnerHTML={{ __html: text }} />}
                        {linkUnderText?.url &&
                            <motion.div variants={linkAnimation} className="underline">
                                <Link className="link" to={linkUnderText.url} target={linkUnderText.target ? linkUnderText.target : null}>{linkUnderText.title}</Link>
                            </motion.div>}
                    </div>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`

    margin: clamp(60px, ${100 / 1194 * 100}vw, 100px) 0;
    display: grid;
    grid-template-columns: 126fr 47fr;
    gap: clamp(40px, ${40 / 1194 * 100}vw,90px);
    align-items: center;
    margin-right: clamp(40px, ${40 / 1194 * 100}vw,90px);

    .content{
        min-width: 260px;
    }

    .container{
        @media (min-width: 769px) {
        padding: 0;
        }
    }

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
    }

    .text{
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 40px);
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        max-width: 480px;
    }

    .link{
        margin-top: 24px;
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
        display: block;
    }

    @media (max-width: 768px){
        grid-template-columns: 1fr;
        grid-gap: 0;
        margin-right: 0;
        .container{
            background-color: #F9F5F0;
        }

&.alt{
    margin-top: 0;
    .container{
        background-color: unset;
    }
}
        .content{
            padding: 24px 0;
        }
    }
`
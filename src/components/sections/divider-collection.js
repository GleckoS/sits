import { motion} from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4, delay: .3 } }
}

const textAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4, delay: .5 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0 1px' },
    animate: { opacity: 1, backgroundSize: '80% 1px', transition: { duration: .4, delay: .7 } }
}

const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6, delay: 1.1 } }
}

const secondImageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6, delay: 1.1 } }
}


export default function DividerCollection({ data: { sectionTitle, text, link, squareImage, rectangularImageOnTheRight } }) {

    return (
        <InView>
            <Wrapper>
                <Container>
                    <Grid>
                        <div className="content">
                            <div>
                                <motion.h2 variants={titleAnimation} className="title">{sectionTitle}</motion.h2>
                                {text && <motion.p variants={textAnimation} className="text">{text}</motion.p>}
                                {link?.url && <motion.div className="underline" variants={linkAnimation}><Link className="link" to={link.url} target={link.target ? link.target : null}>{link.title}</Link></motion.div>}
                            </div>
                            <motion.div className="square" variants={imageAnimation}>
                                <GatsbyImage className="image" image={squareImage.localFile.childImageSharp.gatsbyImageData} alt={squareImage.altText} />
                            </motion.div>
                        </div>
                        <motion.div className="rectangle" variants={secondImageAnimation}>
                            <GatsbyImage className="image" image={rectangularImageOnTheRight.localFile.childImageSharp.gatsbyImageData} alt={rectangularImageOnTheRight.altText} />
                        </motion.div>
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(45px, ${120 / 1200 * 100}vw, 120px);
    .rectangle{
        margin-top: 20px;

        @media (max-width: 1194px) {
            margin-top: 0;
        }

        @media (max-width: 768px) {
            margin: 0 -24px;
        }
    }

    .image{
        height: 100%;
    }

    .square{
        @media (max-width: 1194px) {
            display: none;
        }
    }

    .title{
        font-family: 'Ivy';
        font-weight: 300;
        font-size: clamp(28px, ${40 / 1194 * 100}vw, 40px);
        position: relative;

        @media (max-width: 768px){
            text-align: center;
        }
    }

    .text{
        margin-top: clamp(20px, ${20 / 768 * 100}vw, 32px);
        max-width: 464px;
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;

        @media (max-width: 768px){
            text-align: center;
            margin: 0 auto;
            margin-top: clamp(20px, ${20 / 768 * 100}vw, 32px);
        }
    }

    .link{
        display: block;
        width: fit-content;
        font-size: 18px;
        margin-top: 40px;
        text-transform: uppercase;

        @media (max-width: 768px){
            text-align: center;
            margin: 0 auto;
            margin-top: 24px;
            font-size: 16px;
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;

    @media (max-width: 768px){
        .underline{
            margin: 0 auto;
        }
    }

    @media (max-width: 1194px) {
        align-items: center;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-gap: 36px;
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        min-width: 300px;

        @media (max-width: 768px){
            min-width: unset;
        }
    }
`
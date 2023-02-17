import { motion } from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { imageTransition, linkTransition, textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const imageAnimation = imageTransition(1)
const titleAnimation = textTransition(2)
const textAnimation = textTransition(3)
const linkAnimation = linkTransition(4)

export default function ThreeInformCards({ data: { cards } }) {
    return (
        <Wrapper>
            <Container>
                <Grid>
                    {cards.map((el, index) => (
                        <InView key={el.title + index}>
                            <Item>
                                <Link to={el.link.url ? el.link.url : null} target={el.link.target ? el.link.target : null}>
                                    <motion.div variants={imageAnimation}>
                                        <GatsbyImage className="image" image={el.image.localFile.childImageSharp.gatsbyImageData} alt={el.image.altText} />
                                    </motion.div>
                                    <div className="content">
                                        <motion.h3 variants={titleAnimation}>{el.title}</motion.h3>
                                        {el.text && <motion.p variants={textAnimation}>{el.text}</motion.p>}
                                        {el.link.title && <motion.span variants={linkAnimation} className="underline">{el.link.title}</motion.span>}
                                    </div>
                                </Link>
                            </Item>
                        </InView>
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 50px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px 16px;

    @media (max-width: 892px) {
        display: flex;
        flex-wrap: wrap;
        width: fit-content;
        justify-content: center;
        margin: 0 auto;
    }

    @media (max-width: 640px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`

const Item = styled.div`
    .image{
        height: 33vw;
        max-height: 666px;
        min-height: 200px;
    }

    @media (max-width: 892px){
        flex: 48.5% 0 0;
        .image{
            height: 50vw;
        }
    }

    @media (max-width: 640px) {
    
        .image{
            height: 80vw;
        }

        .underline{
            margin: 20px auto 0 auto;
        }
    }

    @media (max-width: 375px){
        .image{
            margin: 0 -24px;
        }
    }

    .content{
        padding: 20px 12px 0 12px;

        @media (max-width: 892px){
            padding: 20px 0 0 0 ;
        }

        @media (max-width: 640px) {
            background-color: #FFFFFF;
            margin: 0 20px;
            margin-top: -42px;
            padding: 20px 6px;
            position: relative;
            z-index: 2;
            text-align: center;
        }

        @media (max-width: 375px) {
            margin: -42px 0 0 0;
        }

        h3{
            font-family: 'Ivy';
            font-size: clamp(26px, ${30 / 1194 * 100}vw, 36px);
            font-weight: 300;
        }

        p{
            margin-top: 24px;
            font-size: clamp(16px, ${20 / 1194 * 100}vw, 24px);
            line-height: 1.6;
            font-weight: 300;
        }

        span{
            margin-top: 20px;
            display: block;
            font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
            text-transform: uppercase;
        }
    }

    .image{
        img{
            transition: transform .5s cubic-bezier(0.42, 0, 0.58, 1);
        }
    }

    &:hover{
        .image{
            img{
                transform: scale(1.03);
            }
        }
        span{
            background-size: 100% 1px;
        }
    }
`
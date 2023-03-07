import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const titleAnimation = textTransition(1)
const gridAnimation = {
    animate: { transition: { staggerChildren: .2, delayChildren: .5 } }
}
const itemAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4 } }
}



export default function Accessories({ data, title }) {
    return (
        <InView>
            <Wrapper>
                <Container>
                    <motion.h2 variants={titleAnimation}>
                        {title}
                    </motion.h2>
                    <Grid variants={gridAnimation}>
                        {data.map((el, index) => (
                            <Item variants={itemAnimation} key={el.accessoryTitle + index}>
                                <GatsbyImage image={el.accessoryImage.localFile.childImageSharp.gatsbyImageData} alt={el.accessoryImage.altText} />
                                <h3>{el.accessoryTitle}</h3>
                            </Item>
                        ))}
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    padding: 80px 0 0 0;
    background-color: #F9F5F0;
    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        font-family: 'Ivy';
        text-decoration: underline;
    }
`

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    margin-top: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`

const Item = styled(motion.div)`

    h3{
        font-size: clamp(16px, ${26 / 768 * 100}vw, 28px);
        font-weight: 300;
        margin-top: clamp(6px, ${16 / 1194 * 100}vw, 20px);
    }
`
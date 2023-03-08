import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import { MaterialCard } from "../moleculas/material-card"
import InView from "./in-view-provider"

const titleAnimation = textTransition(1)
const gridAnimation = {
    animate: { transition: { staggerChildren: .2, delayChildren: .5 } }
}
const itemAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4 } }
}

export default function RecomendedCovers({ language, isMarginTop, background, title, data: { covers } }) {
    return (
        <InView>
            <Wrapper data-margin-top={isMarginTop ? 'true' : 'false'} className={background}>
                <Container>
                    <motion.h2 variants={titleAnimation}>{title}</motion.h2>
                    <Grid variants={gridAnimation}>
                        {covers.map((el, index) => (
                            <motion.div variants={itemAnimation} key={el.cover.title + index}>
                                <MaterialCard language={language} variant={el.colorVariantName} data={el.cover} />
                            </motion.div>
                        ))}
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(60px, ${90 / 1194 * 100}vw, 120px);
    padding: 40px 0 0 0;
    background-color: #F9F5F0;

    &[data-margin-top="false"]{
        margin-top: 0;
    }
    
    &.white{
        background-color: #fff;
        padding-top: 60px;
        margin-top: 0;
    }

    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        font-family: 'Ivy';
    }
`

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 40px 0 0 0;

    @media (max-width: 864px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 40px 20px;
    }

    @media (max-width: 400px) {
        margin: 40px -12px 0 -12px;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
        margin: 40px 0 0 0;
    }
    
`
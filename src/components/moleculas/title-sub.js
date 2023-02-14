import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import InView from "../sections/in-view-provider"

const titleAnimation = textTransition(1)

export const Title = ({ small, title }) => (
    <InView>
        <Wrapper className={small ? 'small' : ''}>
            <Container>
                <motion.h1 variants={titleAnimation}>{title}</motion.h1>
            </Container>
        </Wrapper>
    </InView>
)

const Wrapper = styled.div`
    h1{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);
    }

    &.small{
        h1{
            margin: 30px 0;
        }
    }
`
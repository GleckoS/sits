import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import { File } from "../atoms/file"
import InView from "./in-view-provider"

const titleAnimation = textTransition(1)
const textAnimation = textTransition(2)
const flexAnimation = {
    animate: { opacity: 1, transition: { staggerChildren: .1, delayChildren: .7 } }
}

const fileAnimation = {
    initial: { opacity: 0, backgroundSize: '0% 1px' },
    animate: {
        opacity: 1,
        transition: { duration: .4 },
        transitionEnd: {
            backgroundSize: '80% 1px',
            transition: { duration: .4 }
        }
    }
}

export default function Handbook({ data: { title, text, filesUnderText } }) {
    return (
        <InView>
            <Wrappers>
                <Container>
                    <Content>
                        <motion.h2 variants={titleAnimation}>{title}</motion.h2>
                        <motion.div variants={textAnimation} className="text" dangerouslySetInnerHTML={{ __html: text }} />
                        <Flex variants={flexAnimation}>
                            {filesUnderText.map(el => (
                                <File variants={fileAnimation} file={el.file} />
                            ))}
                        </Flex>
                    </Content>
                </Container>
            </Wrappers>
        </InView>
    )
}

const Wrappers = styled.section`
    margin-top: 160px;
`

const Content = styled.div`
    max-width: 826px;
    
    h2{
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-family: 'Ivy';
        font-weight: 300;
        margin-bottom: clamp(24px, ${32 / 1194 * 100}vw, 32px);

        @media (max-width: 375px) {
            font-size: 20px;
        }
    }

    .text{
        display: grid;
        grid-gap: 12px;
        *{
            font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
            font-weight: 300;
            line-height: 1.6;

            @media (max-width: 375px) {
                font-size: 14px;
            }
        }
    }
`

const Flex = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 32px;
`
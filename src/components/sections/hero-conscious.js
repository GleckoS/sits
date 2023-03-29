import { motion } from "framer-motion"
import React, { useRef } from "react"
import styled from "styled-components"
import { imageTransition, textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

const imageAnimation = imageTransition(1)
const titleAnimation = textTransition(2)

export default function Hero({ data: { pageTitle, backgroundImage, backgroundVideo } }) {
    const videoRef = useRef();
    const setPlayBack = () => {
        videoRef.current.playbackRate = 0.5;
    };
    return (
        <InView margin='0px 0px 0px 0px'>
            <Wrapper>
                <motion.video
                    variants={imageAnimation}
                    ref={videoRef}
                    onCanPlay={() => setPlayBack()}
                    className="image" playsInline autoPlay muted loop poster={backgroundImage.localFile.publicURL}>
                    <source src={backgroundVideo.localFile.publicURL} type="video/mp4" />
                </motion.video>
                <Container className="container">
                    <motion.h1 variants={titleAnimation} className="archive-title">{pageTitle}</motion.h1>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section` 
    position: relative;
    overflow: hidden;
    max-height: calc(100vh - 92px);
    transform: translateY(-3px);
    .image{
        width: 100%;
        max-width: 1920px;
        min-width: 832px;
        min-height: 470px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        aspect-ratio: 1.77/1;
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
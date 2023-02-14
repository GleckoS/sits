// import { GatsbyImage } from "gatsby-plugin-image"
// import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"  
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import InView from "./in-view-provider"

// const title = {
//     en: 'Perhaps inspirational video content?'
// }

const titleAnimation = textTransition(1, 'slow')
const textAnimation = textTransition(1, 'slow')

export default function Hero({ data: { backgroundVideo, pageTitle, text, backgroundImage } }) {

    // const videoRef = useRef()
    // const [isPaused, changeIsPaused] = useState(true)

    // const videoState = () => {
    //     if (videoRef.current.paused) {
    //         videoRef.current.play()
    //         changeIsPaused(false)
    //     } else {
    //         videoRef.current.pause()
    //         changeIsPaused(true)
    //     }
    // }

    // useEffect(() => {
    //     if (window.matchMedia('(hover: none)').matches && window.matchMedia('(pointer: coarse)').matches) {
    //         videoRef.current.play()
    //     }
    // }, [])

    return (
        <InView>
            <Wrapper>
                {/* <Video onClick={() => { videoState() }}>
                <GatsbyImage className="background image" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} />
                <video ref={videoRef} className="background video" playsInline muted loop poster={backgroundImage.localFile.publicURL} >
                    <source src={backgroundVideo.localFile.publicURL} type="video/mp4" />
                </video>
                <div className={isPaused ? 'content visible' : 'content'}>
                    <span>{title['en']}</span>
                    <button >
                        <svg xmlns="http://www.w3.org/2000/svg" width="164" height="164" viewBox="0 0 164 164">
                            <g id="Group_133" data-name="Group 133" transform="translate(-863 -616)">
                                <circle id="Ellipse_94" data-name="Ellipse 94" cx="82" cy="82" r="82" transform="translate(863 616)" fill="#fff" opacity="0.404" />
                                <path id="Polygon_1" data-name="Polygon 1" d="M39.175,7.457a5,5,0,0,1,8.65,0l34.82,60.034A5,5,0,0,1,78.32,75H8.68a5,5,0,0,1-4.325-7.509Z" transform="translate(993 654) rotate(90)" fill="#fff" />
                            </g>
                        </svg>
                    </button>
                </div>
            </Video> */}
                <Container>
                    <div className="content">
                        <motion.h1 variants={titleAnimation} className="title">{pageTitle}</motion.h1>
                        {text && <motion.p variants={textAnimation}>{text}</motion.p>}
                    </div>
                </Container>
            </Wrapper>
        </InView>
    )
}

// const Video = styled.div`
//     position: relative;
//     cursor: pointer;

//     .image{
//         display: none;
//     }

//     @media (max-width: 768px){
//         .image{
//             display: block;
//         }
//         .video{
//             display: none;
//         }
//         .content{
//             display: none !important;
//         }
//     }

//     .content{
//         display: flex;
//         flex-direction: column;
//         align-items: center;

//         position: absolute;
//         z-index: 1;
//         width: fit-content;
//         padding: 100px;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);

//         opacity: 0;
//         transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

//         &.visible{
//             opacity: 1;
//         }

//         &:hover{
//             opacity: 1;
//         }

//         span{
//             margin-bottom: 20px;
//             display: block;
//             font-size: clamp(16px, ${24 / 768 * 100}vw, 24px);
//             font-weight: 300;
//             color: #fff;
//         }

//         button{
//             border: none;
//             background-color: transparent;
//             cursor: pointer;
//         }

//         svg{
//             width: clamp(102px, ${164 / 1194 * 100}vw, 164px);
//             height: clamp(102px, ${164 / 1194 * 100}vw, 164px);
//         }
//     }

//     @media (hover: none) and (pointer: coarse){
//         .content{
//             display: none;
//         }
//     }
// `

const Wrapper = styled.section`
    position: relative;
    overflow: hidden;
    max-height: 100vh;

    @media (max-width: 1440px) {
        max-height: calc(100vh - 95px);
        top: unset;
    }
    .background{
        max-width: 100%;
        min-width: 700px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .content{
        max-width: 734px;
        margin: clamp(40px,8.375209380234507vw,110px) auto 0 auto;

        @media (max-width: 500px) {
            width: 100%;
        }
    }
    /* .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 768 * 100}vw, 40px);
        text-decoration: underline;
        font-weight: 300;
        margin-top: clamp(40px, ${40 / 1194 * 100}vw, 76px);
        margin-bottom: 15px;
    }
    p{
        font-size: clamp(16px, ${24 / 768 * 100}vw, 24px);
        font-weight: 300;
        position: relative;
    } */

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-align: center;
    }

    p{
        margin: 0 auto;
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 40px);
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        text-align: center;
        max-width: 816px;

        @media (max-width: 768px) {
            max-width: 480px;
        }
    }
`
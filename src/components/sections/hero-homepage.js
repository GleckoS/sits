import { motion } from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { imageTransition } from "../../helpers/animation-controller"
import InView from "./in-view-provider"

const sliderAnimation = imageTransition(1)

export default function Hero({ data: { backgroundVideo, pageTitle, linkUnderPageTitle, backgroundImage, backgroundImageMobile } }) {

    // const [documentWidth, setDocumentWidth] = useState(0)
    // const [videoActive, setVideoActive] = useState(false)
    // const videoRef = React.useRef(null)

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         videoRef.current.load()

    //         videoRef.current.addEventListener('loadeddata', () => {
    //             debugger
    //             setVideoActive(true)
    //             videoRef.current.play()
    //         }, { once: true })
    //     }
    // }, [])

    return (
        <InView margin='0px 0px 0px 0px'>
            <Wrapper >
                <motion.div className="background wrapper" variants={sliderAnimation} >
                    {/* <GatsbyImage loading="eager" quality={50} objectPosition='50% 100%' className="background image" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} /> */}
                    <video
                        // ref={videoRef}
                        className="background video"
                        // className={videoActive ? "background video active" : "background video"}
                        playsInline muted loop autoPlay
                    >
                        <source src={backgroundVideo.localFile.publicURL} type="video/mp4" />
                    </video>
                </motion.div>
                <div className="content">
                    <h1 className="title">
                        {pageTitle}
                    </h1>
                    <div className="link underline" >
                        {linkUnderPageTitle
                            ? <Link className="white-focus" to={linkUnderPageTitle.url} target={linkUnderPageTitle ? linkUnderPageTitle : null}>{linkUnderPageTitle.title}</Link>
                            : null}
                    </div>
                </div>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    position: relative;
    overflow: hidden;
    max-height: 100vh;
    top: -95px;
    margin-bottom: -95px;
    min-height: 100vh;

    @media (max-width: 1440px) {
        max-height: calc(100vh - 95px);
        top: unset;
        margin-bottom: unset;
    }

    @media (max-width: 1024px) {
        min-height: 520px;
        height: 100%;
    }

    @media (max-width: 540px) {
        min-height: 440px;
    }

    @media (max-width: 389px) {
        min-height: 400px;
    }
/* 
    .video{
        clip-path: inset(0px 0px);
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        min-width: 964px;
        *:focus-visible{
            outline: none;
        }
    } */

    .background{
        &.image{
            position: absolute;
            inset: 0;
            z-index: -1;
        }

        &.video{
            height: 100%;
            width: 100%;
            object-fit: cover;
            opacity: 1;

            &.active{
                opacity: 1;
            }
        }

        &.wrapper{
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    .content{
        position: absolute;
        left: 50%;
        top: calc(50% + 45px);
        transform: translate(-50%, -50%);
        width: 80%;
        text-align: center;


        @media (max-width: 1440px) {
            top: 50%;
        }

        @media (max-width: 500px) {
            width: 100%;
            padding: 0 20px;
            top: 45%;
        }

        @media (max-width: 389px) {
            top: 50%;
        }
    }
    .title{
        font-family: 'Ivy';
        font-size: clamp(48px, ${54 / 768 * 100}vw, 64px);
        letter-spacing: 2px;
        color: #fff;
        font-weight: 300;
        line-height: 1.2;
        display: inline-block;
        margin-bottom: 30px;
    }
    .link{
        font-size: 18px;
        color: #fff;
        text-transform: uppercase;
        position: relative;
        padding-bottom: 3px;
        margin: 0 auto;
        background-image: linear-gradient(#fff, #fff);

        .white-focus:focus-visible{
            outline-color: #fff;
        }

        &:hover{
            background-size: 100% 1px !important;
        }
        a{
            color: #fff;
        }
    }
`
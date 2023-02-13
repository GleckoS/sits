import { motion, useInView } from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import scrollLock from './../../helpers/scroll-lock'

const sliderAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .5, delay: .5 } }
}

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .3, delay: 1 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0 1px' },
    animate: { opacity: 1, backgroundSize: '80% 1px', transition: { duration: .3, delay: 1.3 } }
}

export default function Hero({ data: { backgroundVideo, pageTitle, linkUnderPageTitle, backgroundImage, backgroundImageMobile } }) {

    const video = useRef(null)
    const section = useRef(null)
    const isSectionInView = useInView(section, { once: true })

    const [canScroll, setCanScroll] = useState(false);

    useEffect(() => {
        if (canScroll) {
            video.current.play()
            // scrollLock.disable('hero')
        } else {
            // scrollLock.enable('hero')
        }

        // return () => {
        //     scrollLock.disable('hero')
        // }
    }, [canScroll]);


    return (
        <Wrapper
            onAnimationComplete={() => setCanScroll(true)}
            initial='initial'
            animate={isSectionInView ? 'animate' : 'initial'}
            exit='exit'
            ref={section}
        >
            <motion.div variants={sliderAnimation} >
                <GatsbyImage objectPosition='50% 100%' className="background image mobile" image={backgroundImageMobile.localFile.childImageSharp.gatsbyImageData} alt={backgroundImageMobile.altText} />
            </motion.div>
            <motion.video
                ref={video}
                variants={sliderAnimation}
                className="background video"
                playsInline muted loop
                preload="none"
                poster={backgroundImage.localFile.publicURL} >
                <source src={backgroundVideo.localFile.publicURL} type="video/mp4" />
            </motion.video>
            <div className="content">
                <motion.h1 variants={titleAnimation} className="title">
                    {pageTitle}
                </motion.h1>
                <motion.div
                    className="link underline"
                    variants={linkAnimation}
                >
                    {linkUnderPageTitle
                        ? <Link className="" to={linkUnderPageTitle.url} target={linkUnderPageTitle ? linkUnderPageTitle : null}>{linkUnderPageTitle.title}</Link>
                        : null}
                </motion.div>
            </div>
        </Wrapper >
    )
}

const Wrapper = styled(motion.section)`
    position: relative;
    overflow: hidden;
    max-height: 100vh;
    top: -95px;
    margin-bottom: -95px;

    @media (max-width: 1440px) {
        max-height: calc(100vh - 95px);
        top: unset;
        margin-bottom: unset;
    }
    @media (max-width: 840px) {
        max-height: calc(100vh - 75px);
    }

    .background{
        max-width: 100%;
        min-width: 964px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        min-height: 530px;

        @media (max-width: 540px) {
            min-height: 440px;
        } 

        @media (max-width: 389px) {
            min-height: 400px;
            min-width: unset;
        }
    }

    .image{
        display: none;
    }

    @media (max-width: 768px) {
        .video{
            display: none;
        }
        .image{
            display: block;
        }
        .background{
            min-width: unset;
            max-height: calc(100vh - 75px);
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
        background-size: 0 1px;

        &:hover{
            background-size: 100% 1px !important;
        }
        a{
            color: #fff;
        }
    }
`
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import InView from "./in-view-provider"
import { imageTransition, linkTransition, textTransition } from "../../helpers/animation-controller"
import { exploreButton } from "../../texts"

const titleAnimation = textTransition(1)
const textAnimation = textTransition(2)
const sliderAnimation = imageTransition(3)
const sliderTitleAnimation = textTransition(5)
const sliderLinkAnimation = linkTransition(6)
const linkAnimation = linkTransition(3)


export default function Bestsellers({ data: { seeAllLink, text, sectionTitle, carousel } }) {
    const slickRef = useRef(null);
    var settings = {
        fade: true,
        infinite: carousel.length > 5,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: "32px",
                    infinite: false,
                    dots: false,
                    fade: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: "24px",
                    infinite: false,
                    dots: false,
                    fade: false,
                }
            }
        ],
        beforeChange: () => setAnimationStarted(true),
        afterChange: (current) => { setItem(current); setAnimationStarted(false) }
    };

    const [item, setItem] = useState(0)
    const [animationStarted, setAnimationStarted] = useState(false)

    return (
        <InView margin="-100px 0px -300px 0px">
            <Wrapper>
                <Container>
                    <motion.h2
                        variants={titleAnimation}
                        className="title"
                    >
                        {sectionTitle}
                    </motion.h2>
                    {text &&
                        <motion.p
                            variants={textAnimation}
                            className="text">
                            {text}
                        </motion.p>
                    }
                </Container>
                <Container
                    variants={sliderAnimation}
                    className="container"
                >
                    <div className="content desctop">
                        <div className={animationStarted ? 'sticky hide' : "sticky"}>
                            <motion.h3 variants={sliderTitleAnimation}>{carousel[item].selectedCollection.title}</motion.h3>
                            <motion.div variants={sliderLinkAnimation} className="underline">
                                <Link tabIndex={-1} to={'/collection/' + carousel[item].selectedCollection.slug + '/'} >{exploreButton['en']}</Link>
                            </motion.div>
                        </div>
                    </div>
                    <Slider ref={slickRef} {...settings}>
                        {carousel.map((el, index) => {
                            if (el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage) {
                                return (
                                    <div key={index} className="slide">
                                        <GatsbyImage
                                            className="image"
                                            image={el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage.localFile.childImageSharp.gatsbyImageData}
                                            alt={el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage.altText} />
                                        <div className="content mobile">
                                            <h3>{el.selectedCollection.title}</h3>
                                            <Link className="underline" tabIndex={-1} to={'/collection/' + el.selectedCollection.slug + '/'} >{exploreButton['en']}</Link>
                                        </div>
                                    </div>
                                )
                            }
                            return <div className="placeholder">Chosen collection dont have provided "homepage slider preview image"</div>
                        })}
                    </Slider>
                    <Control>
                        <button aria-label='prev slide' onClick={() => { slickRef.current.slickPrev() }} className="left">
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.5 17L1.5 9L9.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {carousel.length <= 5 ? (
                            <div className="dots">
                                {carousel.map((el, index) => (
                                    <button onClick={() => { slickRef.current.slickGoTo(index) }} aria-label={'go to ' + (index + 1) + ' slide'} className={item === (index) ? 'active dot' : "dot"}>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="data">
                                    {item + 1} / {carousel.length}
                                </div>
                            </>
                        )}
                        <button aria-label='next slide' onClick={() => { slickRef.current.slickNext() }} className="right">
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 17L9.5 9L1.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </Control>
                </Container>
                <Container>
                    <motion.div
                        className="underline"
                        variants={linkAnimation}>
                        <Link className="link " to={seeAllLink.url} target={seeAllLink.target ? seeAllLink.target : null}>{seeAllLink.title}</Link>
                    </motion.div>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Control = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;

    @media (max-width: 768px) {
        display: none;
    }

    .dots{
        display: flex;
        gap: 26px;
    }

    .dot{
        cursor: pointer;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fff;
        border: none;
        position: relative;

        &::after{
            content: '';
            position: absolute;
            border: 1px solid #fff;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);
        }

        &.active::after{
            left: -6px;
            right: -6px;
            top: -6px;
            bottom: -6px;
        }
    }

    .data{
        font-weight: 300;
        font-size: 20px;
        line-height: 160%;
        letter-spacing: 0.003em;
        color: #FFFFFF;
        width: 80px;
        display: flex;
        justify-content: center;
    }

    .left{
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
        height: 28px;
        padding: 5px 0;
        background-color: transparent;
        border: none;
        z-index: 4;
        cursor: pointer;

        &:focus-visible{
            outline-color: #fff;
        }

        svg{
            width: clamp(20px, ${20 / 768 * 100}vw, 28px);
            transition: transform .5s cubic-bezier(0.42, 0, 0.58, 1);
        }

        &:hover{
            svg{
                transform: translateX(-2px);
            }
        }
    }

    .right{
        position: absolute;
        right: -50px;
        top: 50%;
        transform: translateY(-50%);
        height: 28px;
        padding: 5px 0;
        background-color: transparent;
        border: none;
        z-index: 4;
        cursor: pointer;

        &:focus-visible{
            outline-color: #fff;
        }

        svg{
            width: clamp(20px, ${20 / 768 * 100}vw, 28px);
            transition: transform .5s cubic-bezier(0.42, 0, 0.58, 1);
        }

        &:hover{
            svg{
                transform: translateX(2px);
            }
        }
    }
`

const Wrapper = styled.section`
    margin-top: clamp(45px, ${85 / 1200 * 100}vw, 120px);

    .title{
        font-family: 'Ivy';
        font-weight: 300;
        font-size: clamp(28px, ${40 / 1194 * 100}vw, 40px);
        position: relative;
        padding: 0 20px 10px 20px;
        margin: 0 auto clamp(20px, ${20 / 768 * 100}vw, 32px) auto;
        text-align: center;
        width: fit-content;
    }

    .underline{
        background-size: 80% 1px;
        a{
            display: block;
            width: fit-content;
            font-size: 18px;
            margin-top: 20px;
            text-transform: uppercase;
            position: relative;
            z-index: 40;
        }
    }


    
    .slick-slide{
        transition: all var(--animation) !important;
        pointer-events: none;
        

        cursor: pointer;
        cursor: hand;
        cursor: grab;

        &:active{
        cursor: grabbing;

        }

        @media (max-width: 768px) {
            transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
        }
        &.slick-active{
            pointer-events: all;
        }
    }


    .slick-dots{
        bottom: -40px !important;

            li{
                &::before{
                    content: "";
                    position: absolute;
                    left: 2px;
                    right: 2px;
                    bottom: 2px;
                    top: 2px;
                    border-radius: 50%;
                    border: 1px solid black;
                    opacity: 0;
                    transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);
                }

                &.slick-active::before{
                    opacity: 1;
                }
            }
    }

    .text{
        font-weight: 300;
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        margin: 0 auto;
    }

    .slide{
        .image{
            position: relative;

            &::after{
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 66.15%, rgba(0, 0, 0, 0.3) 100%);

            }
        }
    }

    .placeholder{
        text-align: center;
    }

    .container{
        margin-top: clamp(60px, ${90 / 1194 * 100}vw, 120px);
        position: relative;

        .slide{
            position: relative;
        }

        .content{
            position: absolute;
            top: 30px;
            bottom: 30px;
            right: 85px;
            z-index: 3;

            &.mobile{
                display: none;
            }

            &.desctop{
                pointer-events: none;

                .underline{
                    background-size: 80% 1px;
                    margin-left: auto;
                    background-image: linear-gradient(#fff, #fff);

                    a{
                        text-decoration: unset;
                        margin-top: 0;
                    }
                }
            }

            @media (max-width: 768px) {
                &.mobile{
                    display: flex;
                    gap: 5px;
                    flex-wrap: wrap;
                }

                &.desctop{  
                    display: none;
                }
            }

            .sticky{

                &.hide{
                    opacity: 0;
                }
                transition:  opacity .4s cubic-bezier(0.42, 0, 0.58, 1);
                position: sticky;
                top: 120px;
                z-index: 5;
                pointer-events: all;

                @media (max-width: 840px) {
                    top: 100px;
                }
            }

            h3{
                font-family: 'Ivy';
                font-size: clamp(32px, ${32 / 768 * 100}vw, 42px);

                @media (max-width: 768px) {
                    font-size: 42px;
                }

                font-weight: 300;
                color: #fff;
                letter-spacing: 2px;

            }

            a{
                text-align: right;
                display: block;
                color: #fff;
                font-size: clamp(14px, ${14 / 768 * 100}vw, 18px); 

                @media (max-width: 768px) {
                    font-size: 18px;
                }
                letter-spacing: 0.55px;
            }
        }
    }

    @media (max-width: 768px) {
        .link{
            margin: 24px auto 0 auto;
            font-size: 16px;
        }
        .container{
            padding: 0;
                
            .right{
                display: none;
            }

            .left{
                display: none;
            }

            .content{
                position: static;
                background-color: #F9F5F0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 20px;


                h3{
                    color: #31231E;
                    font-size: 28px;
                }

                a{
                    color: #31231E;
                    font-size: 10px;
                }
            }
        }
        .slick-slide{
            transform: scale(.94);
            transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);
            &.slick-active{
                transform: scale(1);
            }
        }
    }
`


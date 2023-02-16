import React, { useEffect, useRef } from "react"
import Slider from "react-slick";
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState } from "react";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import InView from "./in-view-provider";
import { imageTransition, textTransition } from "../../helpers/animation-controller";

const getElCount = () => {
    if (typeof window !== 'undefined') {
        return window?.innerWidth < 641 ? 0 : 1
    }

    return 0
}

const titleAnimation = textTransition(1)
const textAnimation = textTransition(2)
const sliderAnimation = imageTransition(3)
const sliderBarAnimation = imageTransition(5)

export default function NewArrivals({ mt, data: { sectionTitle, text, chosenProducts } }) {
    const slickRef = useRef(null);
    var settings = {
        infinite: false,
        dots: false,
        arrows: false,
        slidesToShow: 2,
        initialSlide: 0,
        beforeChange: (b, n) => { setActiveSlide(n) },
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "24px",
                    infinite: false,
                    dots: false,
                }
            }
        ]
    };

    const [mouseMoved, setMouseMoved] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)
    const itemsCount = useRef()

    useEffect(() => {
        slickRef.current.slickGoTo(activeSlide)
    }, [activeSlide])

    const handleClick = (e, url) => {
        e.preventDefault()
        if (!mouseMoved) {
            if (e.button === 0) {
                navigate(url)
            }
        }
    }
    itemsCount.current = 0
    return (
        <InView>
            <Wrapper className={mt ? 'nomargin' : ''}>
                <Container className="container">
                    <motion.h2 variants={titleAnimation} className="title">{sectionTitle}</motion.h2>
                    {text && <motion.p variants={textAnimation} className="text">{text}</motion.p>}
                    <Grid id='slider-new-arrivals'>
                        <motion.div variants={sliderAnimation}>
                            <Slider ref={slickRef} {...settings}>
                                {chosenProducts?.map(el => {
                                    let isOnePostRendered = false
                                    return el.products.products.productGallery?.map(inEl => {
                                        return inEl.productsImages?.map((imageEl, index) => {
                                            if (imageEl.isMainImage && !isOnePostRendered) {
                                                isOnePostRendered = true
                                                itemsCount.current += 1
                                                return <div onMouseMove={() => setMouseMoved(true)}
                                                    onMouseDown={() => setMouseMoved(false)}
                                                    key={inEl.popupNames.model + index}>
                                                    <ProductCard onMouseUp={handleClick} model={inEl.popupNames.model} types={el.products.products.collection.types.nodes} data={el.products.products.collection} image={imageEl.featuredProductImage} />
                                                </div>
                                            }
                                            return null
                                        })
                                    })
                                })}
                            </Slider>
                        </motion.div>
                        <motion.label variants={sliderBarAnimation}>
                            <span>Slider control</span>
                            <SliderInputWrapper value={activeSlide} width={100 / (itemsCount.current - getElCount())}>
                                <SliderInput
                                    value={activeSlide}
                                    id='slider'
                                    onChange={(e) => { setActiveSlide(e.currentTarget.value) }}
                                    width={100 / (itemsCount.current - getElCount())}
                                    type='range'
                                    min='0'
                                    max={(itemsCount.current - getElCount())} />
                            </SliderInputWrapper>
                        </motion.label>
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const SliderInputWrapper = styled.div`
    position: relative;
    margin-top: 30px;
    height: 8px;

    &::after{
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: ${props => props.value * props.width}%;
        height: 100%;
        width: ${props => props.width}%;
        background: #ADA194;
        transition: left .4s ease-out;
        cursor: pointer;
        pointer-events: none;
    }

`

const SliderInput = styled.input`
    width: 100%;
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: transparent; /* Otherwise white in Chrome */
    height: 8px;
    transform: translateY(-10px);

    &::-ms-track {
        width: 100%;
        cursor: pointer;

        /* Hides the slider so custom styles can be added */
        background: transparent; 
        border-color: transparent;
        color: transparent;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 100%;
        width: ${props => props.width}%;
        background: #ADA194;
        cursor: pointer;
        opacity: 0;
    }

    /* All the same stuff for Firefox */
    &::-moz-range-thumb {
        height: 100%;
        width: ${props => props.width}%;
        background: #ADA194;
        cursor: pointer;
        opacity: 0;
    }

    /* All the same stuff for IE */
    &::-ms-thumb {
        height: 100%;
        width: ${props => props.width}%;
        background: #ADA194;
        cursor: pointer;
        opacity: 0;
    }

&::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #F2EEE6;
}

&:focus::-webkit-slider-runnable-track {
  background: #F2EEE6;
}

&::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #F2EEE6;
}

&::-ms-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

&::-ms-fill-lower {
  background: #F2EEE6;
}
&:focus::-ms-fill-lower {
  background: #F2EEE6;
}
&::-ms-fill-upper {
  background: #F2EEE6;
}
&:focus::-ms-fill-upper {
  background: #F2EEE6;
}
`

const Wrapper = styled(motion.section)`
    margin-top: clamp(80px, ${120 / 1194 * 100}vw, 160px);
    background-color: #F9F5F0;
    padding: clamp(40px, ${80 / 768 * 100}vw, 80px) 0;
    overflow: hidden;


    label{
        span{
            display: none;
        }
    }

    .container{
        padding: 0 45px;

        @media(max-width: 640px){
            padding: 0 24px;
        }

    }

    @media (max-width: 768px) {
        &.nomargin{
            margin-top: 0;
        }
    }

    @media (max-width: 1920px) {
        .slick-list{
            overflow: unset;
        }
    }

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-align: center;
    }

    .text{
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        text-align: center;
        max-width: 804px;
        margin: 0 auto;
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 24px);


        @media (max-width: 768px) {
            max-width: 480px;
        }
    }
`

const Grid = styled.div`
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
    /* grid-gap: clamp(40px, ${60 / 1194 * 100}vw, 80px) 16px; */
    margin-top: 80px;

    /* @media (max-width: 768px) { */
        /* grid-gap: 16px; */
    /* } */

    @media (max-width: 640px) {
        /* grid-template-columns: 1fr; */
        margin-top: 40px;
    }

    .product-card{
        max-width: calc(100% - 20px);
        transform: translateX(10px);
        @media (max-width: 640px) {
            max-width: 100%;
            transform: unset;
        }
    }

    .slick-dots{
        bottom: -50px;

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

    @media (max-width: 1240px) {
        .slick-slide{
            transform: scale(.94);
            transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);
        }
        .slick-active{
            transform: unset;
        }
    }

`
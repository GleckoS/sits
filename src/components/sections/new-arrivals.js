import React, { useRef } from "react"
import Slider from "react-slick";
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState } from "react";
import { navigate } from "gatsby";

export default function NewArrivals({ mt, data: { sectionTitle, text, chosenProducts } }) {
    const slickRef = useRef(null);
    var settings = {
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 2,
        initialSlide: 0,
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

    const handleClick = (e, url) => {
        e.preventDefault()
        if (!mouseMoved) {
            navigate(url)
        }
    }

    return (
        <Wrapper className={mt ? 'nomargin' : ''}>
            <Container className="container">
                <h2 className="title">{sectionTitle}</h2>
                {text && <p className="text">{text}</p>}
                <Grid>
                    <Slider ref={slickRef} {...settings}>
                        {chosenProducts?.map(el => {
                            let isOnePostRendered = false
                            return el.products.products.productGallery?.map(inEl => {
                                return inEl.productsImages?.map((imageEl, index) => {
                                    if (imageEl.isMainImage && !isOnePostRendered) {
                                        isOnePostRendered = true
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
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(80px, ${120 / 1194 * 100}vw, 160px);
    background-color: #F9F5F0;
    padding: clamp(40px, ${80 / 768 * 100}vw, 80px) 0;
    overflow: hidden;

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

    @media (max-width: 1240px) {
        .slick-list{
            overflow: unset;
        }
    }

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-decoration: underline;
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
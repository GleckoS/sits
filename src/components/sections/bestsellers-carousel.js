import React, { useRef } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

export default function Bestsellers({ data: { seeAllLink, text, sectionTitle, carousel } }) {
    const slickRef = useRef(null);
    return (
        <Wrapper>
            <Container>
                <h2 className="title">{sectionTitle}</h2>
                {text && <p className="text">{text}</p>}
                {/* <Slider
                    centerMode={true}
                    focusOnSelect={true}
                    infinite={true}
                    dots={true}
                    ref={slickRef}
                    slidesToShow={1}
                >
                    {carousel.map((slide) => (
                        <div key={slide} className="slide">
                            {slide}
                        </div>
                    ))}
                </Slider> */}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 120px;

    .title{
        font-weight: 300;
        font-size: 40px;
        position: relative;
        padding: 0 20px 10px 20px;
        margin: 0 auto 32px auto;
        text-align: center;
        width: fit-content;

        &::after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background-color: #000;
        }
    }

    .text{
        font-weight: 300;
        font-size: 24px;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
`


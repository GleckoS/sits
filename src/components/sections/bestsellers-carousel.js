import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function Bestsellers({ data: { seeAllLink, text, sectionTitle, carousel } }) {
    const slickRef = useRef(null);
    var settings = {
        fade: true,
        infinite: true,
        dots: true,
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
                }
            }
        ],
        beforeChange: () => setAnimationStarted(true),
        afterChange: (current) => { setItem(current); setAnimationStarted(false) }
    };

    const [item, setItem] = useState(0)
    const [animationStarted, setAnimationStarted] = useState(false)

    return (
        <Wrapper>
            <Container>
                <h2 className="title">{sectionTitle}</h2>
                {text && <p className="text">{text}</p>}
            </Container>
            <Container className="container">
                <div className="content desctop">
                    <div className={animationStarted ? 'sticky hide' : "sticky"}>
                        <h3>{carousel[item].selectedCollection.title}</h3>
                        <Link tabIndex={-1} to={'/collection/' + carousel[item].selectedCollection.slug + '/'} >EXPLORE</Link>
                    </div>
                </div>
                <button aria-label='prev slide' onClick={() => { slickRef.current.slickPrev() }} className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28.694" height="81.072" viewBox="0 0 28.694 81.072">
                        <path id="Path_5" data-name="Path 5" d="M10077.916,8682.179l-25.641,40.619,25.641,38.826" transform="translate(-10050.49 -8681.378)" fill="none" stroke="#fff" strokeWidth="3" />
                    </svg>
                </button>
                <Slider ref={slickRef} {...settings}>
                    {carousel.map((el, index) => {
                        if (el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage) {
                            return (
                                <div key={index} className="slide">
                                    <GatsbyImage
                                        image={el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage.localFile.childImageSharp.gatsbyImageData}
                                        alt={el.selectedCollection.collections.generalCollectionInformation.homepageSliderPreviewImage.altText} />
                                    <div className="content mobile">
                                        <h3>{el.selectedCollection.title}</h3>
                                        <Link tabIndex={-1} to={'/collection/' + el.selectedCollection.slug + '/'} >EXPLORE</Link>
                                    </div>
                                </div>
                            )
                        }

                        return <div className="placeholder">Chosen collection dont have provided "homepage slider preview image"</div>
                    })}
                </Slider>
                <button aria-label='next slide' onClick={() => { slickRef.current.slickNext() }} className="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28.694" height="81.072" viewBox="0 0 28.694 81.072">
                        <path id="Path_4" data-name="Path 4" d="M10052.275,8682.179l25.641,40.619-25.641,38.826" transform="translate(-10051.007 -8681.378)" fill="none" stroke="#fff" strokeWidth="3" />
                    </svg>
                </button>
            </Container>
            <Container>
                <Link className="link" to={seeAllLink.url} target={seeAllLink.target ? seeAllLink.target : null}>{seeAllLink.title}</Link>
            </Container>
        </Wrapper>
    )
}

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
        text-decoration: underline;
    }

    .link{
        margin-left: auto;
        display: block;
        width: fit-content;
        font-size: 18px;
        margin-top: 20px;
        text-transform: uppercase;
        text-decoration: underline;
        position: relative;
        z-index: 40;
    }


    
    .slick-slide{
        transition: all var(--animation) !important;
        pointer-events: none;

        @media (max-width: 768px) {
            transition: all .6s ease;
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
    }

    .placeholder{
        text-align: center;
    }

    .container{
        margin-top: clamp(60px, ${90 / 1194 * 100}vw, 120px);
        position: relative;

        .left{
            position: absolute;
            left: 80px;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            z-index: 4;
            cursor: pointer;

            svg{
                width: clamp(20px, ${20 / 768 * 100}vw, 28px);
            }
        }

        .right{
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            z-index: 4;
            cursor: pointer;

            svg{
                width: clamp(20px, ${20 / 768 * 100}vw, 28px);
            }
        }

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
                transition:  opacity .4s ease;
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
                text-decoration: underline;
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


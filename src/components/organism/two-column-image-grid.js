import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ImageGridItem } from "../moleculas/image-grid-item"
import { Popup } from "../moleculas/popup"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import AddToFauvorite from "../atoms/add-to-favourite"

export const TwoColumnImageGrid = ({ gallery, popupNames, collectionPagePreviewImage, products, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    var settings = {
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
    };

    const [popUpImages, setPopImages] = useState(() => {
        let images = []

        if (collectionPagePreviewImage) {
            images.push({ image: collectionPagePreviewImage, popupNames: popupNames })
        }

        products.forEach(el => {
            el.products.productGallery.forEach(el => {
                el.productsImages.forEach(inInEl => {
                    images.push({ image: inInEl.featuredProductImage, popupNames: el.popupNames })
                })
            })
        })
        return images
    })

    useEffect(() => {
        if (isPopUpOpened) {
            let arr = []
            popUpImages.forEach(el => {
                if (el.image.title === isPopUpOpened) {
                    arr.unshift(el)
                    return
                }
                arr.push(el)
            })
            console.log('scroll')
            document.getElementById('popup').scrollTo(0, 0);
            setPopImages(arr)
        }
    }, [isPopUpOpened])

    const [mouseMoved, setMouseMoved] = useState(false)

    const handleClick = (collectionPagePreviewImage) => {
        if (!mouseMoved) {
            setPopUpOpened(collectionPagePreviewImage.title)
        }
    }

    const [rerender, setRerender] = useState(false)

    return (
        <Box>
            <Popup id='popup' title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                <PopupGrid>
                    {popUpImages?.map((el, index) => (
                        <React.Fragment key={el.popupNames.model + index}>
                            <ImageGridItem setRerender={setRerender} rerender={rerender} image={el.image} popupNames={el.popupNames} />
                        </React.Fragment>
                    ))}
                </PopupGrid>
            </Popup>
            <Wrapper>
                {collectionPagePreviewImage
                    ? <div className="image-wrap">
                        <AddToFauvorite setRerender={setRerender}  rerender={rerender} type={'product'} title={popUpImages[0].popupNames.model} />
                        <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(popUpImages[0].image.title) }}>
                            <GatsbyImage image={popUpImages[0].image.localFile.childImageSharp.gatsbyImageData} alt={popUpImages[0].image.altText} />
                            <span className="in"> In this image <b>+</b> </span>
                        </button>
                    </div>
                    : null}
                <ImagesGrid>
                    {popUpImages?.map((el, index) => (
                        <div className="image-wrap">
                            <AddToFauvorite setRerender={setRerender}  rerender={rerender} type={'product'} title={el.popupNames.model} />
                            <button key={el.image.title + index} aria-label='open pop-up with images' onClick={() => { setPopUpOpened(el.image.title) }}>
                                <GatsbyImage className="image" image={el.image.localFile.childImageSharp.gatsbyImageData} alt={el.image.altText} />
                                <span className="in"> In this image <b>+</b> </span>
                            </button>
                        </div>
                    ))}
                </ImagesGrid>
            </Wrapper>
            <SliderWrapper>
                <Slider {...settings}>
                    {collectionPagePreviewImage
                        ? <button
                            aria-label='open pop-up with images'
                            onMouseMove={() => setMouseMoved(true)}
                            onMouseDown={() => setMouseMoved(false)}
                            onMouseUp={() => handleClick(collectionPagePreviewImage)}
                        >
                            <GatsbyImage className="image" image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                            <span className="in">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <g id="Group_510" data-name="Group 510" transform="translate(-1557.5 -1810.5)">
                                        <line id="Line_134" data-name="Line 134" y2="14" transform="translate(1564.5 1810.5)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                        <line id="Line_137" data-name="Line 137" y2="14" transform="translate(1571.5 1817.5) rotate(90)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                        : null}
                    {gallery?.map((el, index) => (
                        <button
                            key={el.title + index}
                            aria-label='open pop-up with images'
                            onMouseMove={() => setMouseMoved(true)}
                            onMouseDown={() => setMouseMoved(false)}
                            onMouseUp={() => handleClick(el)}
                        >
                            <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            <span className="in">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <g id="Group_510" data-name="Group 510" transform="translate(-1557.5 -1810.5)">
                                        <line id="Line_134" data-name="Line 134" y2="14" transform="translate(1564.5 1810.5)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                        <line id="Line_137" data-name="Line 137" y2="14" transform="translate(1571.5 1817.5) rotate(90)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                    ))}
                </Slider>
            </SliderWrapper>
        </Box>
    )
}

const Box = styled.div`
    .in{
        background-color: #F9F5F0;
    }
`

const SliderWrapper = styled.div`
    width: calc(100% + 90px);
    margin: 0 -45px 36px -45px;
    display: none;
    transform: translateY(-2px);

    @media (max-width: 1024px) {
        display: block;
    }

    @media (max-width: 768px) {
        width: calc(100% + 48px);
        margin: 0 -24px 36px -24px;
    }

    .image{
        width: 100%;
        aspect-ratio: 1.51750972763;
    }

    .slick-dots{
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

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.58px);
        position: relative;
        cursor: pointer;

        span{
            font-size: 18px;
            font-weight: 300;
            position: absolute;
            width: clamp(26px, ${40 / 768 * 100}vw, 40px);
            height: clamp(26px, ${40 / 768 * 100}vw, 40px);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            right: 20px;
            bottom: 20px;
            transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

            b{
                font-size: 24px;
                font-weight: 900;
            }

            &::after{
                content: "";
                position: absolute;
                right: -4px;
                left: 4px;
                bottom: -4px;
                height: 1px;
                background-color: #31231E;
            }

            &::before{
                content: "";
                position: absolute;
                right: -4px;
                top: 4px;
                bottom: -4px;
                width: 1px;
                background-color: #31231E;
            }
        }
    }
`


const Wrapper = styled.div`

    .image-wrap{
        position: relative;
    }

    .hearth{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
        opacity: 0;
        transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

        @media (max-width: 1024px) {
            opacity: 1;
        }
    }

    .image-wrap{
        &:hover{
            .hearth{
                opacity: 1;
            }
        }
    }

    b{
        font-weight: 300 !important;
    }

    @media (max-width: 1024px) {
        display: none;
    }

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.58px);
        position: relative;
        cursor: pointer;

        &:active{
            span{
                transform: translate(6px, 6px);

                &::after{
                    right: 0;
                    left: 0;
                    bottom: 0;
                }

                &::before{
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
            }
        }

        span{
            font-size: 18px;
            font-weight: 300;
            position: absolute;
            display: block;
            padding: 8px 18px 12px 18px;
            background-color: #fff;
            right: 20px;
            bottom: 20px;
            opacity: 0;
            transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);

            &:hover{
                background-color: #fff;
            }

            b{
                font-size: 24px;
                font-weight: 900;
            }

            &::after{
                content: "";
                position: absolute;
                right: -6px;
                left: 6px;
                bottom: -6px;
                height: 1px;
                background-color: #31231E;
                transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
            }

            &::before{
                content: "";
                position: absolute;
                right: -6px;
                top: 6px;
                bottom: -6px;
                width: 1px;
                background-color: #31231E;
                transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
            }
        }

        &:hover, &:focus{
            span{
                opacity: 1;
            }
        }
    }
`

const ImagesGrid = styled.div`
    columns: 2;
    column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);
`

const PopupGrid = styled.div`
    display: grid;
    grid-gap: clamp(40px, ${80 / 768 * 100}vw, 80px);
`
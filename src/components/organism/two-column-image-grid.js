import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { ImageGridItem } from "../moleculas/image-grid-item"
import { Popup } from "../moleculas/popup"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

export const TwoColumnImageGrid = ({ gallery, popupNames, collectionPagePreviewImage, products, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    var settings = {
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
    };

    // const images = useMemo(() => {
    //     let arr = []
    //     let sumValue = 0
    //     let difference = 0

    //     products.forEach(el => el.products.productGallery.forEach(el => el.productsImages.forEach(el => {
    //         let square = el.featuredProductImage.width > el.featuredProductImage.height
    //         if (square) {
    //             arr.push({ state: 1, image: el.featuredProductImage })
    //             sumValue += 1
    //         } else {
    //             arr.push({ state: 2, image: el.featuredProductImage })
    //             sumValue += 2
    //         }
    //     })))


    //     let firstColumn = arr.slice(0, Math.ceil(arr.length / 2))
    //     let firstValue = 0
    //     firstColumn.forEach(el => firstValue += el.state)

    //     let secondColumn = arr.slice(Math.ceil(arr.length / 2))
    //     let secondValue = 0
    //     secondColumn.forEach(el => secondValue += el.state)

    //     const checkDifferenceSecond = () => {
    //         difference = secondValue - firstValue
    //         if (difference > 2) {
    //             secondColumn.every((el, index) => {
    //                 if (el.state > 1) {
    //                     secondValue -= el.state
    //                     firstValue += el.state
    //                     firstColumn.push(el)
    //                     secondColumn.splice(index, 1)
    //                     return false
    //                 }
    //                 return true
    //             })
    //             checkDifferenceSecond()
    //         } else if (difference === 2) {
    //             secondColumn.every((el, index) => {
    //                 if (el.state > 1) {
    //                     secondValue -= el.state
    //                     firstValue += el.state
    //                     firstColumn.push(el)
    //                     secondColumn.splice(index, 1)
    //                     return false
    //                 }
    //                 return true
    //             })
    //         }
    //     }

    //     const checkDifferenceFirst = () => {
    //         difference = firstValue - secondValue
    //         if (difference > 2) {
    //             firstColumn.every((el, index) => {
    //                 if (el.state > 1) {
    //                     secondValue += el.state
    //                     firstValue -= el.state
    //                     secondColumn.push(el)
    //                     firstColumn.splice(index, 1)
    //                     return false
    //                 }
    //                 return true
    //             })
    //             checkDifferenceFirst()
    //         } else if (difference === 2) {
    //             firstColumn.every((el, index) => {
    //                 if (el.state === 1) {
    //                     secondValue += el.state
    //                     firstValue -= el.state
    //                     secondColumn.push(el)
    //                     firstColumn.splice(index, 1)
    //                     return false
    //                 }
    //                 return true
    //             })
    //         }
    //     }
    //     if (firstValue > secondValue) {
    //         checkDifferenceFirst()
    //     } else if (firstValue < secondValue) {
    //         checkDifferenceSecond()
    //     }

    //     return [...firstColumn, ...secondColumn]
    // })

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
            document.getElementById('popup').scrollTo(0, 0);
            setPopImages(arr)
        }
    }, [isPopUpOpened])

    return (
        <>
            <Popup id='popup' title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                <PopupGrid>
                    {popUpImages?.map(el => (
                        <ImageGridItem image={el.image} popupNames={el.popupNames} />
                    ))}
                </PopupGrid>
            </Popup>
            <Wrapper>
                {collectionPagePreviewImage
                    ? <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(collectionPagePreviewImage.title) }}>
                        <GatsbyImage image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                        <span> In this image <b>+</b> </span>
                    </button>
                    : null}
                <ImagesGrid>
                    {gallery?.map(el => (
                        <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(el.title) }}>
                            <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            <span> In this image <b>+</b> </span>
                        </button>
                    ))}
                </ImagesGrid>
            </Wrapper>
            <SliderWrapper>
                <Slider {...settings}>
                    {collectionPagePreviewImage
                        ? <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(collectionPagePreviewImage.title) }}>
                            <GatsbyImage className="image" image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <g id="Group_510" data-name="Group 510" transform="translate(-1557.5 -1810.5)">
                                        <line id="Line_134" data-name="Line 134" y2="14" transform="translate(1564.5 1810.5)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                        <line id="Line_137" data-name="Line 137" y2="14" transform="translate(1571.5 1817.5) rotate(90)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                        : null}
                    {gallery?.map(el => (
                        <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(el.title) }}>
                            <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            <span>
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
        </>
    )
}

const SliderWrapper = styled.div`
    width: calc(100% + 90px);
    margin: 0 -45px 36px -45px;
    display: none;

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

@media (max-width: 1024px) {
    display: none;
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
            display: block;
            padding: 12px 18px;
            background-color: #fff;
            right: 20px;
            bottom: 20px;
            opacity: 0;
            transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

            b{
                font-size: 24px;
                font-weight: 900;
            }

            &::after{
                content: "";
                position: absolute;
                right: -6px;
                left: 10px;
                bottom: -6px;
                height: 1px;
                background-color: #31231E;
            }

            &::before{
                content: "";
                position: absolute;
                right: -6px;
                top: 10px;
                bottom: -6px;
                width: 1px;
                background-color: #31231E;
            }
        }

        &:hover{
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
    grid-gap: 80px;

    
`
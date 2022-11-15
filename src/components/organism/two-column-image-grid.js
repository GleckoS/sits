import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"
import { ImageGridItem } from "../moleculas/image-grid-item"
import { Popup } from "../moleculas/popup"

export const TwoColumnImageGrid = ({ popupNames, collectionPagePreviewImage, products, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    return (
        <>
            <Popup title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                <PopupGrid>
                    <ImageGridItem image={collectionPagePreviewImage} popupNames={popupNames} />
                    {products.map(el => {
                        return el.products.productGallery.map(el => {
                            return el.productsImages.map(inEl => (
                                <ImageGridItem image={inEl.featuredProductImage} popupNames={el.popupNames} />
                            ))
                        })
                    })}
                </PopupGrid>
            </Popup>
            <Wrapper>
                <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(true) }}>
                    <GatsbyImage image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                </button>
                <ImagesGrid>
                    {products.map(el => {
                        return el.products.productGallery.map(el => {
                            return el.productsImages.map(el => (
                                <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(true) }}>
                                    <GatsbyImage className="image" image={el.featuredProductImage.localFile.childImageSharp.gatsbyImageData} alt={el.featuredProductImage.altText} />
                                </button>
                            ))
                        })
                    })}
                </ImagesGrid>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.71px);
    }
`

const ImagesGrid = styled.div`
    margin-top: 40px;
    columns: 2;
    column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);
`

const PopupGrid = styled.div`
    display: grid;
    grid-gap: 80px;
`

const Item = styled.div`
    .image{
        margin: 0 auto;
        display: block;
        width: fit-content;
        max-height: 722px;
    }
`

const Data = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 20px;

    span{
        font-weight: 300;
    }
`
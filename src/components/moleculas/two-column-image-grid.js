import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"
import { Popup } from "../atoms/popup"

export const TwoColumnImageGrid = ({ collectionPagePreviewImage, products, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    return (
        <>
            <Popup title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                <PopupGrid>
                    {products.map(el => {
                        return el.products.productGallery.map(el => {
                            return el.productsImages.map(inEl => (
                                <Item>
                                    <GatsbyImage className="image" image={inEl.featuredProductImage.localFile.childImageSharp.gatsbyImageData} alt={inEl.featuredProductImage.altText} />
                                    <Data>
                                        <span>Model: <strong>{el.popupNames.model}</strong></span>

                                        {el.popupNames.leather
                                            ? <span>Leather: <strong>{el.popupNames.leather}</strong></span>
                                            : <span>Fabric: <strong>{el.popupNames.fabric}</strong></span>}

                                        {el.popupNames.legs
                                            ? <span>Legs: <strong>{el.popupNames.legs}</strong></span>
                                            : null}

                                        {el.popupNames.comfort
                                            ? <span>Comfort: <strong>{el.popupNames.comfort}</strong></span>
                                            : null}

                                        {el.popupNames.cover
                                            ? <span>Cover: <strong>{el.popupNames.cover}</strong></span>
                                            : null}

                                        {el.popupNames.armrests
                                            ? <span>Armrests: <strong>{el.popupNames.armrests}</strong></span>
                                            : null}

                                        {el.popupNames.accessories
                                            ? <span>Accessories: <strong>{el.popupNames.accessories}</strong></span>
                                            : null}

                                    </Data>
                                </Item>
                            ))
                        })
                    })}
                </PopupGrid>
            </Popup>
            <Wrapper >
                <GatsbyImage image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
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

`

const ImagesGrid = styled.div`
    margin-top: 40px;
    columns: 2;
    column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.71px);
    }
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
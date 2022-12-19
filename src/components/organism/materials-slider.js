import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"

export const MaterialsSlider = ({ variant, variants }) => {
    const [choosenVariant, setChoosenVariant] = useState(() => {
        if (variant) {
            return variant
        }
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].isMainColor) {
                return i
            }
        }
        return 0
    })

    const [newVariant, setNewVariant] = useState(choosenVariant)

    const onVariantChange = (index) => {
        document.getElementById('background').style.backgroundColor = variants[choosenVariant].landscapePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor

        setNewVariant(index)
        setTimeout(() => {
            setNewVariant(choosenVariant)
            setChoosenVariant(index)
        }, 50)
    }

    return (
        <>
            <div className="slider">
                <SliderWrapper id='background'>
                    {variants.map((el, index) => {
                        if (index === choosenVariant || index === newVariant) {
                            return (
                                <SliderContent key={el.landscapePreviewImage.altText + index} className={index === choosenVariant ? 'active' : ''}>
                                    <GatsbyImage className="image" image={el.landscapePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.landscapePreviewImage.altText} />
                                </SliderContent>
                            )
                        }
                    })}
                </SliderWrapper>
                <VariantsPicker>
                    {variants.map((el, index) => (
                        <VariantCircle key={el.variantColor + index} onClick={() => { onVariantChange(index) }} className={index === choosenVariant ? 'active' : ''} image={el.variantColorImage?.localFile?.publicURL} color={el.variantColor}>
                            <svg id="Selected_Color" data-name="Selected Color" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                <path id="Path_132" data-name="Path 132" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(-8670.342 10076.238) rotate(-90)" fill="none" stroke="#31231e" stroke-width="3" />
                                <g id="Ellipse_199" data-name="Ellipse 199" fill="none" stroke="#31231e" stroke-width="3">
                                    <circle cx="20" cy="20" r="20" stroke="none" />
                                    <circle cx="20" cy="20" r="18.5" fill="none" />
                                </g>
                            </svg>
                        </VariantCircle>
                    ))}
                </VariantsPicker>
            </div>
            <div className="relative">
                {variants.map((el, index) => (
                    <VariantGallery key={el.variantName + index} className={index === choosenVariant ? 'active' : ''}>
                        <span className="variant-name">{el.variantName}</span>
                        <div className="grid">
                            {el.variantGallery?.map((el, inIndex) => (
                                <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            ))}
                        </div>
                    </VariantGallery>
                ))}
            </div>
        </>
    )
}

const VariantsPicker = styled.div`
    margin-top: 32px;
    margin-bottom: clamp(20px, ${40 / 1194 * 100}vw, 40px);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .item {
        
    }
`

const VariantCircle = styled.button`
    background-color: ${props => props.color};
    background-image: url(${props => props.image});
    width: 40px;
    height: 40px;

    @media (max-width: 640px){
        width: 32px;
        height: 32px;
    }

    border-radius: 50%;
    border: 1px solid #BABABA;
        transition: border .2s cubic-bezier(0.39, 0.575, 0.565, 1);

    display: flex;
    align-items: center;
    justify-content: center;

    svg{
        opacity: 0;
        transition: opacity .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        mix-blend-mode: color-burn;
    }

    &.active{
        border: 0px solid #BABABA;
        transition: border 0s cubic-bezier(0.39, 0.575, 0.565, 1);
        svg{
            opacity: 1;
        }
    }
`

const VariantGallery = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &.active{
        position: relative;
        opacity: 1;
    }

    .variant-name{
        font-size: 32px;
        font-weight: 300;
        margin-bottom: 40px;
        display: block;

        @media (max-width: 1024px) {
            display: none;
        }
    }

    .grid{
        columns: 2;
        column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);
    }

    .image{
        margin-top: clamp(10px, ${10 / 1024 * 100}vw, 20px);
    }
`

const SliderWrapper = styled.div`
    position: relative;
    background-color: #777;

    @media (max-width: 640px) {
        margin: 0 -24px;
    }
`

const SliderContent = styled.div`
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &.active{
        position: relative;
        opacity: 1;
    }
`
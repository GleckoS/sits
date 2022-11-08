import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"

export const MaterialsSlider = ({ variants }) => {

    const [choosenVariant, setChoosenVariant] = useState(() => {
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].isMainColor) {
                return i
            }
        }
        return 0
    })

    const onVariantChange = (index) => {
        document.getElementById('background').style.backgroundColor = variants[choosenVariant].landscapePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor
        setChoosenVariant(index)
    }

    return (
        <Wrapper>
            <SliderWrapper id='background'>
                {variants.map((el, index) => (
                    <SliderContent className={index === choosenVariant ? 'active' : ''}>
                        <GatsbyImage className="image" image={el.landscapePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.landscapePreviewImage.altText} />
                    </SliderContent>
                ))}
            </SliderWrapper>
            <VariantsPicker>
                {variants.map((el, index) => (
                    <VariantCircle onClick={() => { onVariantChange(index) }} className={index === choosenVariant ? 'active' : ''} color={el.variantColor}>
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
            <div className="relative">
                {variants.map((el, index) => (
                    <VariantGallery className={index === choosenVariant ? 'active' : ''}>
                        <span className="variant-name">{el.variantName}</span>
                        <div className="grid">
                            {el.variantGallery?.map(el => (
                                <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            ))}
                        </div>
                    </VariantGallery>
                ))}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    transition: height .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    .relative{
        position: relative;
    }
`

const VariantsPicker = styled.div`
    margin-top: 32px;
    margin-bottom: 40px;
    display: flex;
    gap: 8px;

    .item {
    }
`

const VariantCircle = styled.button`
    background-color: ${props => props.color};
    width: 40px;
    height: 40px;
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
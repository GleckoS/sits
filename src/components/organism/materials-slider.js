import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"

export const MaterialsSlider = ({ animation, variant, variants }) => {
    const [choosenVariant, setChoosenVariant] = useState(() => {
        if (variant) {
            let isActual = false
            for (let i = 0; i < variants.length; i++) {
                if (variants[i].variantName === variant) {
                    isActual = true
                }
            }
            if (isActual) return variant
        }

        for (let i = 0; i < variants.length; i++) {
            if (variants[i].isMainColor) return variants[i].variantName
        }

        return variants[0].variantName
    })

    const [newVariant, setNewVariant] = useState(choosenVariant)

    const onVariantChange = (index, direction) => {
        let number = index
        if (index >= 0) {
            let curIndex = 0
            for (let i = 0; i < variants.length; i++) {
                if (variants[i].variantName === choosenVariant) {
                    curIndex = i
                    i = variants.length
                }
            }

            number = curIndex + direction
            if (number < 0) {
                number = variants.length - 1
            }
            if (number > variants.length - 1) {
                number = 0
            }
        }
        document.getElementById('background').style.backgroundColor = variants.filter(el => el.variantName === choosenVariant)?.[0]?.landscapePreviewImage?.localFile?.childImageSharp?.gatsbyImageData?.backgroundColor || '#F9F5F0'

        setNewVariant(variants[number].variantName)
        setTimeout(() => {
            setNewVariant(choosenVariant)
            setChoosenVariant(variants[number].variantName)
        }, 50)
    }

    return (
        <motion.div variants={animation}>
            <div className="slider">
                <SliderWrapper id='background'>
                    <button aria-label='prev slide' onClick={() => { onVariantChange(null, -1) }} className="left slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28.694" height="81.072" viewBox="0 0 28.694 81.072">
                            <path id="Path_5" data-name="Path 5" d="M10077.916,8682.179l-25.641,40.619,25.641,38.826" transform="translate(-10050.49 -8681.378)" fill="none" stroke="#fff" strokeWidth="3" />
                        </svg>
                    </button>
                    {variants.map((el, index) => {
                        if (variants[index].variantName === choosenVariant || variants[index].variantName === newVariant) {
                            return (
                                <SliderContent key={el.landscapePreviewImage.altText + index} className={variants[index].variantName === choosenVariant ? 'active' : ''}>
                                    <AddToFauvorite type={'colors'} title={el.variantName} />
                                    <GatsbyImage className="image" image={el.landscapePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.landscapePreviewImage.altText} />
                                </SliderContent>
                            )
                        }
                    })}
                    <button aria-label='next slide' onClick={() => { onVariantChange(null, 1) }} className="right slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28.694" height="81.072" viewBox="0 0 28.694 81.072">
                            <path id="Path_4" data-name="Path 4" d="M10052.275,8682.179l25.641,40.619-25.641,38.826" transform="translate(-10051.007 -8681.378)" fill="none" stroke="#fff" strokeWidth="3" />
                        </svg>
                    </button>
                </SliderWrapper>
                <VariantsPicker>
                    {variants.map((el, index) => (
                        <VariantCircle key={el.variantColor + index} onClick={() => { onVariantChange(index) }} className={variants[index].variantName === choosenVariant ? 'active' : ''} image={el.variantColorImage?.localFile?.publicURL} color={el.variantColor}>
                            <svg id="Selected_Color" data-name="Selected Color" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                <path id="Path_132" data-name="Path 132" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(-8670.342 10076.238) rotate(-90)" fill="none" stroke="#31231e" strokeWidth="3" />
                                <g id="Ellipse_199" data-name="Ellipse 199" fill="none" stroke="#31231e" strokeWidth="3">
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
                    <VariantGallery key={el.variantName + index} className={variants[index].variantName === choosenVariant ? 'active' : ''}>
                        <span className="variant-name">{el.variantName}</span>
                        <div className="grid">
                            {el.variantGallery?.map((el, inIndex) => (
                                <GatsbyImage key={inIndex} className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            ))}
                        </div>
                    </VariantGallery>
                ))}
            </div>
        </motion.div>
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
    cursor: pointer;

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
    }

    .grid{
        columns: 2;
        column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);

        @media (max-width: 640px) {
            columns: 1;
        }
    }

    .image{
        margin-top: clamp(10px, ${10 / 1024 * 100}vw, 20px);
    }
`

const SliderWrapper = styled.div`
    position: relative;
    background-color: #777;

    .slide{
        position: absolute;
        border: none;
        background-color: transparent;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        svg{
            width: clamp(18px, ${18 / 1024 * 100}vw, 28px);

            @media (max-width: 1024px) {
            width: clamp(18px, ${18 / 480 * 100}vw, 28px);
            }

            @media (max-width: 380px) {
                width: 14px;
            }

        }
        &.left{
            left: 20px;
        }

        &.right{
            right: 20px;
        }
    }

    .hearth{
        opacity: 0;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
        transition: opacity .2s cubic-bezier(0.39, 0.575, 0.565, 1);

        @media (max-width: 1024px) {
            opacity: 1;
        }
    }

    &:hover{
        .hearth{
            opacity: 1;
        }
    }

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
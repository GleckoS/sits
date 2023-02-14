import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"

export const MaterialCard = ({ variant = '', color, data: { materials: { materialColorVariants }, title, slug } }) => {
    const variants = useMemo(() => {
        let arr = materialColorVariants
        if (color && color !== 'All') {
            arr = arr.filter(el => el.colorGroup === color)
        }
        return arr
    }, [color])

    const [choosenVariant, setChoosenVariant] = useState(() => {
        for (let i = 0; i < variants.length; i++) {
            if (variant) {
                if (variants[i].variantName === variant)
                    return i
            }
            else {
                if (variants[i].isMainColor)
                    return i
            }
        }
        return 0
    })

    const [newVariant, setNewVariant] = useState(choosenVariant)

    useEffect(() => {
        setChoosenVariant(() => {
            for (let i = 0; i < variants.length; i++) {
                if (variant) {
                    if (variants[i].variantName === variant)
                        return i
                }
                else {
                    if (variants[i].isMainColor)
                        return i
                }
            }
            return 0
        })
    }, [variants])

    const onVariantChange = (index) => {
        document.getElementById('background').style.backgroundColor = variants[choosenVariant].squarePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor

        setNewVariant(index)
        setTimeout(() => {
            setNewVariant(choosenVariant)
            setChoosenVariant(index)
        }, 50)

    }

    return (
        <Wrapper>
            <div className="wrap">
                <AddToFauvorite type={'colors'} title={variants[choosenVariant]?.variantName ? variants[choosenVariant]?.variantName : variants[0].variantName} />
                <Link aria-label={'material: ' + title} to={'/material/' + slug + '/'} state={{ variant: choosenVariant }}>
                    <SliderWrapper id='background'>
                        {variants.map((el, index) => {
                            if (index === choosenVariant || index === newVariant) {
                                return (
                                    <SliderContent key={el.variantName} className={index === choosenVariant ? 'active' : ''}>
                                        <GatsbyImage className="image" image={el.squarePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.squarePreviewImage.altText} />
                                    </SliderContent>
                                )
                            }
                            return null
                        })}
                    </SliderWrapper>
                </Link>
            </div>
            <span className="archive-title">{title}</span>
            <VariantsPicker>
                {variants.map((el, index) => (
                    <VariantCircle aria-label={'change color to: ' + el.colorGroup} key={el.variantColor} onClick={() => { onVariantChange(index) }} className={index === choosenVariant ? 'active' : ''} image={el.variantColorImage?.localFile?.publicURL} color={el.variantColor}>
                    </VariantCircle>
                ))}
            </VariantsPicker>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: 430px;

    .archive-title{
        margin-top: 10px;
        margin-bottom: 16px;
        display: block;
        font-size: clamp(23px, ${36 / 1194 * 100}vw, 36px);
        font-weight: 300;
        line-height: 110%;
        font-family: 'Ivy';
    }
    
    .hearth {
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 2;
    }

    .wrap{
        position: relative;

        
        &:hover{
            img{
                transform: scale(1.05);
            }
        }
    }
`

const VariantsPicker = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    padding: 0 6px;

    @media (max-width: 480px) {
        gap: 8px;
    }
`

const VariantCircle = styled.button`
    background-color: ${props => props.color};
    background-image: url(${props => props.image});
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #BABABA;
    transition: border .4s ease-out;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        border: 1px solid #0B0B0B;
        border-radius: 50%;
        opacity: 0;
        transition: all .25s ease-out;
    }

    &:hover{
        &::after{
            opacity: 1;
        }
    }

    svg{
        opacity: 0;
        transition: opacity .4s ease-out;
        mix-blend-mode: color-burn;
    }

    &.active{
        &::after{
        left: -6px;
        right: -6px;
        bottom: -6px;
        top: -6px;
        opacity: 1;
        }
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
    transition: opacity .6s ease-out;

    &.active{
        position: relative;
        opacity: 1;
    }

    .image img{
        transition: transform .6s ease-out;
    }

`
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
                return variant
            }
            else {
                if (variants[i].isMainColor)
                    return variants[i].variantName
            }
        }
        return variants[0].variantName
    })

    const [newVariant, setNewVariant] = useState(choosenVariant)

    useEffect(() => {
        setChoosenVariant(() => {
            for (let i = 0; i < variants.length; i++) {
                if (variant) {
                    if (variants[i].variantName === variant)
                        return variants[i].variantName
                }
                else {
                    if (variants[i].isMainColor)
                        return variants[i].variantName
                }
            }
            return variants[0].variantName
        })
    }, [variants])

    const onVariantChange = (i) => {
        document.getElementById('background').style.backgroundColor = variants.filter(el => el.variantName === choosenVariant)[0].squarePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor

        setNewVariant(variants[i].variantName)
        setTimeout(() => {
            setNewVariant(choosenVariant)
            setChoosenVariant(variants[i].variantName)
        }, 50)

    }
    return (
        <Wrapper>
            <div className="wrap">
                <AddToFauvorite type={'colors'} title={variants.filter(el => el.variantName === choosenVariant)[0]?.variantName ? variants.filter(el => el.variantName === choosenVariant)[0]?.variantName : variants[0].variantName} />
                <Link aria-label={'material: ' + title} to={'/material/' + slug + '/'} state={{ variant: choosenVariant }}>
                    <SliderWrapper id='background'>
                        {variants.map((el, index) => {
                            if (variants[index].variantName === choosenVariant || variants[index].variantName === newVariant) {
                                return (
                                    <SliderContent key={el.variantName} className={variants[index].variantName === choosenVariant ? 'active' : ''}>
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
                    <VariantCircle aria-label={'change color to: ' + el.colorGroup} key={el.variantColor} onClick={() => { onVariantChange(index) }} className={variants[index].variantName === choosenVariant ? 'active' : ''} image={el.variantColorImage?.localFile?.publicURL} color={el.variantColor}>
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
    transition: border .4s cubic-bezier(0.42, 0, 0.58, 1);
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
        transition: all .25s cubic-bezier(0.42, 0, 0.58, 1);
    }

    &:hover{
        &::after{
            opacity: 1;
        }
    }

    svg{
        opacity: 0;
        transition: opacity .4s cubic-bezier(0.42, 0, 0.58, 1);
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
    transition: opacity .6s cubic-bezier(0.42, 0, 0.58, 1);

    &.active{
        position: relative;
        opacity: 1;
    }

    .image img{
        transition: transform .6s cubic-bezier(0.42, 0, 0.58, 1);
    }

`
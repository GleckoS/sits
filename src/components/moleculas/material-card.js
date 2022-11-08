import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"

export const MaterialCard = ({ data: { materials: { materialColorVariants: variants }, title, slug } }) => {

    const [choosenVariant, setChoosenVariant] = useState(() => {
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].isMainColor) {
                return i
            }
        }
        return 0
    })

    const onVariantChange = (index) => {
        document.getElementById('background').style.backgroundColor = variants[choosenVariant].squarePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor
        setChoosenVariant(index)
    }

    return (
        <Wrapper>
            <Link to={'/' + slug + '/'}>
                <SliderWrapper id='background'>
                    {variants.map((el, index) => (
                        <SliderContent className={index === choosenVariant ? 'active' : ''}>
                            <GatsbyImage className="image" image={el.squarePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.squarePreviewImage.altText} />
                        </SliderContent>
                    ))}
                </SliderWrapper>
            </Link>
            <span className="title">{title}</span>
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
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: 430px;

    .title{
        margin-top: 10px;
        margin-bottom: 16px;
        display: block;
        font-size: 32px;
        font-weight: 300;
    }
`

const VariantsPicker = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
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
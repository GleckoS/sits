import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { materialUrl } from "../../texts/urls"
import AddToFauvorite from "../atoms/add-to-favourite"

export const Card = ({ language, setRerender, variant, rerender, type, model, slug, title, image }) => {
        return (
        <Wrapper>
            <AddToFauvorite language={language} setRerender={setRerender} rerender={rerender} type={type} title={model} />
            <Link to={materialUrl[language] + slug + '/'} state={{ variant: variant !== undefined ? model : null }}>
                <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
                <span>{title}</span>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    span{
        font-weight: 300;
        line-height: 110%;
        font-family: 'Ivy';
        font-size: clamp(18px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        margin-top: clamp(8px, ${12 / 1194 * 100}vw, 12px);
        display: block;
    }
    button{
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 2;
    }
    .image{
        width: 100%;
    }
    .image{
        img{
            transition: transform var(--animation);
        }
    }
    &:hover{
        .image{
            img{
                transform: scale(1.07);
            }
        }
    }
`
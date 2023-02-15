import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"

export const Card = ({ setRerender, rerender, type = 'products', model, image, data: { title, slug } }) => {

    return (
        <Wrapper>
            <AddToFauvorite setRerender={setRerender} rerender={rerender} type={type} title={model} />
            <Link to={'/collection/' + slug + '/'}>
                <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
                <span>{model}</span>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;

    button{
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 2;
    }
    
    span{
        font-weight: 300;
        line-height: 110%;
        font-family: 'Ivy';
        font-size: clamp(18px, ${28 / 1194 * 100}vw, 28px);
        margin-top: 12px;
        display: block;
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
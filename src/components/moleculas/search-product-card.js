import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"

export const Card = ({ rerender, type='products', model, image, data: { title, slug } }) => {

    return (
        <Wrapper>
            <Link to={'/collection/' + slug + '/'}>
                <AddToFauvorite rerender={rerender} type={type} title={model} />
                <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
                <span>{title}</span>
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
        font-size: clamp(18px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        margin-top: 12px;
        display: block;
    }
`
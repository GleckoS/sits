import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const Card = ({ slug, title, data: { squarePreviewImage } }) => {
    return (
        <Wrapper>
            <Link to={'/material/' + slug + '/'}>
                <GatsbyImage image={squarePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={squarePreviewImage.altText} />
                <span>{title}</span>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    span{
        font-size: clamp(18px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        margin-top: clamp(8px, ${12 / 1194 * 100}vw, 12px);
        display: block;
    }
`
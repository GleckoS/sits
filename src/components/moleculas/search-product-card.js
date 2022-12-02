import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const Card = ({ image, data: { title, slug } }) => (
    <Wrapper>
        <Link to={'/collection/' + slug + '/'}>
            <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
            <span>{title}</span>
        </Link>
    </Wrapper>
)

const Wrapper = styled.div`
    span{
        font-size: clamp(18px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        margin-top: 12px;
        display: block;
    }
`
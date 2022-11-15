import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const ImageGridItem = ({ image, popupNames }) => (
    <Item>
        <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
        <Data>
            <span>Model: <strong>{popupNames.model}</strong></span>

            {popupNames.leather
                ? <span>Leather: <strong>{popupNames.leather}</strong></span>
                : <span>Fabric: <strong>{popupNames.fabric}</strong></span>}

            {popupNames.legs
                ? <span>Legs: <strong>{popupNames.legs}</strong></span>
                : null}

            {popupNames.comfort
                ? <span>Comfort: <strong>{popupNames.comfort}</strong></span>
                : null}

            {popupNames.cover
                ? <span>Cover: <strong>{popupNames.cover}</strong></span>
                : null}

            {popupNames.armrests
                ? <span>Armrests: <strong>{popupNames.armrests}</strong></span>
                : null}

            {popupNames.accessories
                ? <span>Accessories: <strong>{popupNames.accessories}</strong></span>
                : null}

        </Data>
    </Item>
)

const Item = styled.div`
    .image{
        margin: 0 auto;
        display: block;
        width: fit-content;
        max-height: 722px;
    }
`

const Data = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 20px;

    span{
        font-weight: 300;
    }
`
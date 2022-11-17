import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const ImageGridItem = ({ image, popupNames }) => (
    <Item>
        <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
        <Data>
            <span>Model: <strong>{popupNames.model}</strong></span>

            {popupNames.material
                ? <span>Material: <strong>{popupNames.material}</strong></span>
                : null}

            {popupNames.tableTopMaterial
                ? <span>Table top material: <strong>{popupNames.tableTopMaterial}</strong></span>
                : null}

            {popupNames.leather
                ? <span>Leather: <strong>{popupNames.leather}</strong></span>
                : null}

            {popupNames.fabric
                ? <span>Fabric: <strong>{popupNames.fabric}</strong></span>
                : null}

            {popupNames.legs
                ? <span>Legs: <strong>{popupNames.legs}</strong></span>
                : null}

            {popupNames.materialOfTheLegs
                ? <span>Material of the legs: <strong>{popupNames.materialOfTheLegs}</strong></span>
                : null}

            {popupNames.comfort && !popupNames.tableTopMaterial && !popupNames.materialOfTheLegs && !popupNames.material
                ? <span>Comfort: <strong>{popupNames.comfort}</strong></span>
                : null}

            {popupNames.cover && !popupNames.tableTopMaterial && !popupNames.materialOfTheLegs && !popupNames.material
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
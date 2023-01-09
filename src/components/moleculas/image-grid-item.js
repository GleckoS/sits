import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export const ImageGridItem = ({ image, popupNames }) => (
    <Item>
        <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
        <Data>
            <span><span>Model:</span> <strong>{popupNames.model}</strong></span>

            {popupNames.material
                ? <span><span>Material:</span> <strong>{popupNames.material}</strong></span>
                : null}

            {popupNames.tableTopMaterial
                ? <span><span>Table top material:</span> <strong>{popupNames.tableTopMaterial}</strong></span>
                : null}

            {popupNames.leather
                ? <span><span>Leather:</span> <strong>{popupNames.leather}</strong></span>
                : null}

            {popupNames.fabric
                ? <span><span>Fabric:</span> <strong>{popupNames.fabric}</strong></span>
                : null}

            {popupNames.legs
                ? <span><span>Legs:</span> <strong>{popupNames.legs}</strong></span>
                : null}

            {popupNames.materialOfTheLegs
                ? <span><span>Material of the legs:</span> <strong>{popupNames.materialOfTheLegs}</strong></span>
                : null}

            {popupNames.comfort && !popupNames.tableTopMaterial && !popupNames.materialOfTheLegs && !popupNames.material
                ? <span><span>Comfort:</span> <strong>{popupNames.comfort}</strong></span>
                : null}

            {popupNames.cover && !popupNames.tableTopMaterial && !popupNames.materialOfTheLegs && !popupNames.material
                ? <span><span>Cover:</span> <strong>{popupNames.cover}</strong></span>
                : null}

            {popupNames.armrests
                ? <span><span>Armrests:</span> <strong>{popupNames.armrests}</strong></span>
                : null}

            {popupNames.accessories
                ? <span><span>Accessories:</span> <strong>{popupNames.accessories}</strong></span>
                : null}

        </Data>
    </Item>
)

const Item = styled.div`
    .image{
        margin: 0 auto;
        display: block;
        width: fit-content;
    }
`

const Data = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 20px;

    @media (max-width: 768px) {
        display: grid;
        grid-gap: 4px;

        span{
            display: grid;
            grid-template-columns: clamp(90px, ${90/390*100}vw, 160px) auto;
            span, strong{
                font-size: clamp(10px, ${10/390*100}vw, 18px);
            }
        }
    }


    span{
        font-weight: 300;
        font-size: 18px;
    }
`
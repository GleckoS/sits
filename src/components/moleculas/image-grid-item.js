import { GatsbyImage } from "gatsby-plugin-image"
import React, { useRef } from "react"
import { toast } from "react-toastify"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"

const copySuccessed = {
    en: 'Configuration copied successfully'
}

export const ImageGridItem = ({ setRerender, rerender, image, popupNames }) => {

    const data = useRef(null)

    return (
        <Item>
            <div className="image-wrap"> 
                <AddToFauvorite setRerender={setRerender} rerender={rerender} type={'product'} title={popupNames.model} />
                <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
            </div>
            <Flex>
                <Data ref={data}>
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
                <button onClick={() => { navigator.clipboard.writeText(data.current.innerText); toast(copySuccessed['en']) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24.762" height="30.471" viewBox="0 0 24.762 30.471">
                        <g id="Group_777" data-name="Group 777" transform="translate(-1637 -2205.529)">
                            <g id="Rectangle_98" data-name="Rectangle 98" transform="translate(1637 2210)" fill="none" stroke="#707070" stroke-width="1.5">
                                <rect width="20" height="26" stroke="none" />
                                <rect x="0.75" y="0.75" width="18.5" height="24.5" fill="none" />
                            </g>
                            <path id="Path_57" data-name="Path 57" d="M3577.607,933.279h19.405V957.7" transform="translate(-1936 1273)" fill="none" stroke="#707070" stroke-width="1.5" />
                        </g>
                    </svg>

                    <span className="underline">
                        Copy Configuration
                    </span>
                </button>
            </Flex>
        </Item>
    )
}

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;

    @media (max-width: 375px) {
        flex-direction: column;
        gap: 0;
    }

    button{
        height: fit-content;
        margin-top: 20px;
        min-width: max-content;
        width: fit-content;
        cursor: pointer;
        display: grid;
        grid-template-columns:auto 1fr ;
        align-items: center;
        grid-gap: clamp(10px, ${5 / 390 * 100}vw, 15px);
        border: none;
        background-color: transparent;
        svg{
            width: clamp(15px, ${15 / 390 * 100}vw, 25px);
        }
        span{
            font-size: clamp(10px, ${10 / 390 * 100}vw, 18px);
        }

        &:hover{
            span{
                background-size: 100% 1px;
            }
        }
    }
`

const Item = styled.div`
    position: relative;
    .image{
        margin: 0 auto;
        display: block;
        width: fit-content;
    }
    .hearth{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
    }
    .image-wrap{
        width: fit-content;
        position: relative;
        margin: 0 auto;
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
            grid-template-columns: clamp(90px, ${90 / 390 * 100}vw, 160px) auto;
            span, strong{
                font-size: clamp(10px, ${10 / 390 * 100}vw, 18px);
            }
        }
    }


    span{
        font-weight: 300;
        font-size: 18px;
    }
`
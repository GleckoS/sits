import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"
import { Popup } from "../atoms/popup"


export const PopupButton = ({ data, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    return (
        <>
            <Popup title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                <PopupContent>
                    {data.featuredImage
                        ? (
                            <PopupFeatured>
                                <GatsbyImage image={data.featuredImage.localFile.childImageSharp.gatsbyImageData} alt={data.featuredImage.altText} />
                                {data.featuredImageTitle
                                    ? <div dangerouslySetInnerHTML={{ __html: data.featuredImageTitle }} />
                                    : null}
                                {data.featuredImageTextUnderTitle
                                    ? <div dangerouslySetInnerHTML={{ __html: data.featuredImageTextUnderTitle }} />
                                    : null}
                            </PopupFeatured>
                        ) : null}
                    <PopupGrid>
                        {data.dimensions?.map(el => (
                            <div>
                                {el.image.localFile.childImageSharp
                                    ? <GatsbyImage image={el.image.localFile.childImageSharp.gatsbyImageData} alt={el.image.altText} />
                                    : <img className="svg" src={el.image.localFile.publicURL} alt={el.image.altText} />}
                                <div dangerouslySetInnerHTML={{ __html: el.title }} />
                                {el.textUnderTitle
                                    ? <div dangerouslySetInnerHTML={{ __html: el.textUnderTitle }} />
                                    : null}
                            </div>
                        ))}
                    </PopupGrid>
                </PopupContent>
            </Popup>
            <Wrapper onClick={() => { setPopUpOpened(true) }}>
                <span>
                    {title}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.513" height="17.37" viewBox="0 0 9.513 17.37">
                    <path id="Path_3" data-name="Path 3" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(-10051.731 -8681.662)" fill="none" stroke="#31231e" stroke-width="1.5" />
                </svg>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.button`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    border: none;
    background-color: transparent;
    padding: 16px 0;
    border-bottom: 1px solid var(--text-color);
`

const PopupFeatured = styled.div`
    margin-bottom: 80px;
`

const PopupContent = styled.div`
`

const PopupGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;

    .svg{
        background-color: #fff;
    }
`
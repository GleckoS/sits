import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"
import { Popup } from "../moleculas/popup"


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
                        {data.dimensions?.map((el, index) => (
                            <div key={el.title + index}>
                                <div className="image-wrap">
                                    <img className="svg" src={el.image.localFile.publicURL} alt={el.image.altText} />
                                </div>
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
                    <path id="Path_3" data-name="Path 3" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(-10051.731 -8681.662)" fill="none" stroke="#31231e" strokeWidth="1.5" />
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
    padding: 0 6px;
    height: clamp(45px, ${56 / 1194 * 100}vw, 66px);
    border-bottom: 1px solid var(--text-color);
    transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
    cursor: pointer;

    &:hover{
        background-color: #EDC53D40;
        padding-left: 24px;
    }

    span{
        font-size: clamp(20px, ${21 / 1920 * 100}vw, 21px);
        font-weight: 300;
    }
`

const PopupFeatured = styled.div`
    margin-bottom: clamp(32px, ${80 / 1194 * 100}vw, 80px);
`

const PopupContent = styled.div`
`

const PopupGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }

    .image-wrap{
        position: relative;
    }

    .svg{
        background-color: #fff;
    }
`
import React, { useState } from "react"
import styled from "styled-components"
import { selectLanguage } from "../../texts"
import { Link } from "gatsby"
import { icons } from "../../texts/icons"

export const LangChanger = ({ setMobileMenuOpened, data, language, tabIndex = 0 }) => {

    const [isOpened, setIsOpened] = useState(false)

    const locData = data.wpPage || data.wpCollection || data.wpMaterials

    if(!locData.language){
        return null
    }

    return (
        <>
            <Button onClick={() => { setIsOpened(!isOpened) }} onBlur={() => { setIsOpened(false) }} tabIndex={tabIndex}>
                {selectLanguage[language]}
                <svg className="planet" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
                    <g id="Group_551" data-name="Group 551" transform="translate(-190 -981)">
                        <g id="Ellipse_319" data-name="Ellipse 319" transform="translate(190 981)" fill="none" stroke="#bababa" strokeWidth="1.5">
                            <circle cx="9.5" cy="9.5" r="9.5" stroke="none" />
                            <circle cx="9.5" cy="9.5" r="8.75" fill="none" />
                        </g>
                        <g id="Ellipse_320" data-name="Ellipse 320" transform="translate(195 981)" fill="none" stroke="#bababa" strokeWidth="1.5">
                            <ellipse cx="4.5" cy="9.5" rx="4.5" ry="9.5" stroke="none" />
                            <ellipse cx="4.5" cy="9.5" rx="3.75" ry="8.75" fill="none" />
                        </g>
                        <line id="Line_340" data-name="Line 340" x2="16.5" transform="translate(191 987.5)" fill="none" stroke="#bababa" strokeWidth="1.5" />
                        <line id="Line_341" data-name="Line 341" x2="16.5" transform="translate(191 993.5)" fill="none" stroke="#bababa" strokeWidth="1.5" />
                    </g>
                </svg>
                <LanguageOptions onFocus={() => { setIsOpened(true) }} className={isOpened ? 'active' : ''}>
                    <div className="first">
                        <div>
                            <span className="icon" dangerouslySetInnerHTML={{ __html: icons[language] }} />
                            {locData.language.name}
                        </div>
                        <span className="dot" />
                    </div>

                    {locData.translations?.map(el => (
                        <Link tabIndex={isOpened ? '0' : '-1'} to={el.uri}>
                            <div>
                                <span className="icon" dangerouslySetInnerHTML={{ __html: icons[el.language.code] }} />
                                {el.language.name}
                            </div>
                            <span className="dot" />
                        </Link>
                    ))}
                </LanguageOptions>
            </Button>
            <LanguageOptions onFocus={() => { setIsOpened(true) }} className='active mobile'>
                <div className="first">
                    <div>
                        <span className="icon" dangerouslySetInnerHTML={{ __html: icons[language] }} />
                        {locData.language.name}
                    </div>
                    <span className="dot" />
                </div>

                {locData.translations?.map(el => (
                    <Link onClick={() => {
                        setTimeout(() => {
                            setMobileMenuOpened(false)
                        }, 200)
                    }
                    } tabIndex={isOpened ? '0' : '-1'} to={el.uri}>
                        <div>
                            <span className="icon" dangerouslySetInnerHTML={{ __html: icons[el.language.code] }} />
                            {el.language.name}
                        </div>
                        <span className="dot" />
                    </Link>
                ))}
            </LanguageOptions>
        </>
    )
}

const LanguageOptions = styled.div`
    position: absolute;
    background-color: #fff;
    bottom: -5px;
    left: -24px;
    right: -24px;
    transform: translateY(100%);

    display: grid;
    grid-gap: 16px;
    padding: 24px;
    box-sizing: content-box;

    opacity: 0;
    pointer-events: none;
    transition: opacity .4s ease-out;

    &.mobile{
        display: none;
    }

    @media (max-width: 840px) {
        display: none;

        &.mobile{
            display: block;
            position: relative;
            inset: unset;
            transform: unset;
            padding: 0;

            >a{
                margin-top: 16px;
            }

            > a, >div{
                width: 100% !important;
                max-width: 200px;
            }
        }
    }

    &.active{
        opacity: 1;
        pointer-events: all;
    }
    
    > div, > a {
        display: flex;
        gap: 6px;
        justify-content: space-between;
        align-items: center;



        >div{
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .icon{
            width: 20px;
            height: 20px;
            position: relative;
            border: 1px solid #BABABA;
            border-radius: 50%;

            svg{
                position: absolute;
                z-index: 4;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 16px;
                height: 16px;
                border-radius: 50%;
            }
        }
        
        .dot{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #BABABA;
        }
    }

    .first{
        .dot{
            position: relative;
            border-color: #31231E;

            &::after{
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #31231E;
            }
        }
    }
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #BABABA;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-right: 40px;
    position: relative;

    .planet{
        margin-top: 2px;
    }

    @media (max-width: 840px) {
        margin-bottom: 20px;
        flex-direction: row-reverse;

        svg{
            width: 20px;
            
            g,line{
                stroke: #31231E !important;
            }
        }
        @supports  (-webkit-touch-callout: none){
            margin-bottom: 120px;
        }
    }

    
    .planet g, .planet line{
        transition: stroke .4s ease-out;
    }

    &:hover{
        .planet g, .planet line{
            stroke: #edc53d;
        }
    }

`
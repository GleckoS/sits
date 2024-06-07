import React, { useState } from "react"
import styled from "styled-components"
import { langSwitcherNames, } from "../../texts"
import { Link } from "gatsby"
import { icons } from "../../texts/icons"

export const LangChanger = ({ closeAll, setSearchQuery, setMobileMenuOpened, data, language, tabIndex = 0 }) => {
    const [isOpened, setIsOpened] = useState(false)

    if (!data) return null

    const locData = data.wpCollection || data.wpMaterials || data.wpPage || data.wpEvent

    if (!locData?.language) {
        return null
    }

    return (
        <>
            <Button onClick={() => { setIsOpened(!isOpened); closeAll() }} onBlur={() => { setIsOpened(false); closeAll() }} tabIndex={tabIndex}>
                <span>{langSwitcherNames[language]}</span>
                <span className="svg" dangerouslySetInnerHTML={{ __html: icons[language] }} />
                <LanguageOptions onFocus={() => { setIsOpened(true) }} className={isOpened ? 'active' : ''}>
                    <div className="first">
                        <div>
                            <span className="icon" dangerouslySetInnerHTML={{ __html: icons[language] }} />
                            {langSwitcherNames[language]}
                        </div>
                        <span className="dot" />
                    </div>

                    {locData.translations?.filter(el => (el.language.code !== 'PL')).map(el => (
                        <Link tabIndex={isOpened ? '0' : '-1'} to={el.uri}>
                            <div>
                                <span className="icon" dangerouslySetInnerHTML={{ __html: icons[el.language.code] }} />
                                {langSwitcherNames[el.language.code]}
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
                        {langSwitcherNames[language]}
                    </div>
                    <span className="dot" />
                </div>

                {locData.translations?.filter(el => (el.language.code !== 'PL')).map(el => (
                    <div onClick={() => {
                        setTimeout(() => {
                            setMobileMenuOpened(false)
                            setSearchQuery('')
                        }, 200)
                    }
                    } tabIndex={isOpened ? '0' : '-1'} to={el.uri}>
                        <div>
                            <span className="icon" dangerouslySetInnerHTML={{ __html: icons[el.language.code] }} />
                            {langSwitcherNames[el.language.code]}
                        </div>
                        <span className="dot" />
                    </div>
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

    @media (max-width: 420px) {
        width: 140px;
        left: unset;
    }

    /* @media (max-width: 840px) {
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
    } */

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
    justify-content: flex-end;
    min-width: 150px;

    @media (max-width: 390px) {
        min-width: fit-content;
    }

    .svg{
        margin-top: 2px;
    }

    @media (max-width: 450px) {
        margin-right: 20px;
        margin-left: 10px;
        text-align: right;
    }

    /* @media (max-width: 840px) {
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
    } */

    .svg{
        display: flex;
        align-items: center;
        justify-content: center;


        svg{
            border-radius: 50%;
        border: 1px solid #BABABA;
            min-width: 21px;
            min-height: 21px;

            @media (max-width: 420px) {
                min-width: 25px;
                min-height: 25px;
            }
        }
    }

    > span{
        color: #BABABA;
        font-size: 14px;
        @media (max-width: 420px) {
            display: none;
        }
    }
    
    .svg g, .svg line{
        transition: stroke .4s ease-out;
    }

`
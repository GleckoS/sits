import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { DropDown } from "../moleculas/dropdown"
import { CloseButton } from './../atoms/close-button'
import { AnimatePresence, motion } from "framer-motion"
import { searchPlaceholder as searchTitle } from "../../texts"

export const FilterComponent = ({
    filterAnimation,
    sortBy,
    colorRange,
    texturesArr,
    featuresArr,
    setSort,
    setColor,
    setTextures,
    setFeatures,
    setMobileFilterOpened,
    sort,
    color,
    textures,
    features,
    isMobileFilterOpened,
    clearAll,
    view,
    reset,
    featuresTitle,
    texturesTitle,
    colorRangeTitle,
    sortByTitle,
    filterTitle,
    sortFilterTitle,
    inputValue,
    setInputValue,
    setSearch,
    language
}) => {

    const [openedFilter, setOpenedFilter] = useState(false)
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.onkeydown = function (e) {
                if (e.key == "Escape") {
                    setOpenedFilter(false)
                }
            }
        }
    }, [])

    useEffect(() => {
        if (pageLoaded)
            setSearch(inputValue)
        else
            setPageLoaded(true)
    }, [inputValue])

    return (
        <>
            <AnimatePresence mode="wait">
                {isMobileFilterOpened && (
                    <MobileFilters initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={isMobileFilterOpened ? 'active' : ''}>
                        <Flex>
                            <b>{filterTitle}</b>
                            <CloseButton as='button' func={setMobileFilterOpened} val={false} />
                        </Flex>
                        <FilterBlock>
                            <span>{sortByTitle}</span>
                            <div className="flex">
                                {sortBy.map(el => (
                                    <button key={el.name} onClick={() => { setSort(el.val) }} className={el.val === sort ? 'active' : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                            <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                        </svg>
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                        </FilterBlock>
                        <FilterBlock>
                            <span>{colorRangeTitle}</span>
                            <div className="flex">
                                {colorRange.map(el => (
                                    <button key={el.name} onClick={() => { setColor(el.val) }} className={el.val === color ? 'active' : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                            <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                        </svg>
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                        </FilterBlock>
                        <FilterBlock>
                            <span>{texturesTitle}</span>
                            <div className="flex">
                                {texturesArr.map(el => (
                                    <button key={el.name} onClick={() => { setTextures(el.val) }} className={el.val === textures ? 'active' : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                            <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                        </svg>
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                        </FilterBlock>
                        <FilterBlock>
                            <span>{featuresTitle}</span>
                            <div className="flex">
                                {featuresArr.map(el => (
                                    <button key={el.name} onClick={() => { setFeatures(el.val) }} className={el.val === features ? 'active' : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                            <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                        </svg>
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                        </FilterBlock>
                        <Flex className="center">
                            <button className="underlined" onClick={() => { clearAll(); setSort('Popular') }}>
                                {reset}
                            </button>
                            <button className="filled" onClick={() => { setMobileFilterOpened(false); window?.scrollTo({ top: 0 }) }}>
                                {view}
                            </button>
                        </Flex>
                    </MobileFilters>
                )}
            </AnimatePresence>
            <Filter variants={filterAnimation}>
                <Container className="container">
                    <div className="left">
                        <DropDown id='1' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={sort} func={setSort} data={sortBy} controlTitle={sortByTitle + ': ' + sort} />
                        <DropDown id='2' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={color} func={setColor} data={colorRange} controlTitle={colorRangeTitle} />
                        <DropDown id='3' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={textures} func={setTextures} data={texturesArr} controlTitle={texturesTitle} />
                        <DropDown id='4' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={features} func={setFeatures} data={featuresArr} controlTitle={featuresTitle} />
                    </div>
                    <div className="left-alt">
                        <button onClick={() => { setMobileFilterOpened(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.595" viewBox="0 0 15 14.595">
                                <g id="Group_520" data-name="Group 520" transform="translate(5432.613 -238.318)">
                                    <line id="Line_258" data-name="Line 258" y2="14.595" transform="translate(-5430.658 238.318)" fill="none" stroke="#31231e" strokeWidth="1" />
                                    <line id="Line_259" data-name="Line 259" y2="14.595" transform="translate(-5425.122 238.318)" fill="none" stroke="#31231e" strokeWidth="1" />
                                    <line id="Line_260" data-name="Line 260" y2="14.595" transform="translate(-5419.586 238.318)" fill="none" stroke="#31231e" strokeWidth="1" />
                                    <g id="Ellipse_295" data-name="Ellipse 295" transform="translate(-5432.613 243.55)" fill="#fff" stroke="#31231e" strokeWidth="1">
                                        <circle cx="2" cy="2" r="2" stroke="none" />
                                        <circle cx="2" cy="2" r="1.5" fill="none" />
                                    </g>
                                    <g id="Ellipse_296" data-name="Ellipse 296" transform="translate(-5427.113 238.55)" fill="#fff" stroke="#31231e" strokeWidth="1">
                                        <circle cx="2" cy="2" r="2" stroke="none" />
                                        <circle cx="2" cy="2" r="1.5" fill="none" />
                                    </g>
                                    <g id="Ellipse_297" data-name="Ellipse 297" transform="translate(-5421.613 248.55)" fill="#fff" stroke="#31231e" strokeWidth="1">
                                        <circle cx="2" cy="2" r="2" stroke="none" />
                                        <circle cx="2" cy="2" r="1.5" fill="none" />
                                    </g>
                                </g>
                            </svg>
                            {sortFilterTitle}
                        </button>
                    </div>
                    <div>
                        <Search className="label">
                            <span>{searchTitle[language]}</span>
                            <input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                    <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                        <circle cx="8" cy="8" r="8" stroke="none" />
                                        <circle cx="8" cy="8" r="7" fill="none" />
                                    </g>
                                    <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                </g>
                            </svg>
                        </Search>
                    </div>
                </Container>
            </Filter>
        </>
    )
}


const Search = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: all;

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;

        svg{
            transition: transform .4s cubic-bezier(0.42, 0, 0.58, 1);
        }

        :hover{
            svg{
            }
        }
    }

    &:hover{
        input{
            width: 46px;
        }
    }

    input{
        border: none;
        width: 100%;
        padding: 0 2px 2px 2px;
        margin: 0 6px 0 9px;
        width: 23px;
        border-bottom: 1px solid black;
        transition: width .3s cubic-bezier(0.39, 0.575, 0.565, 1);
        font-size: 14px;

        &:focus{
            width: 150px;

            @media (max-width: 370px) {
                width: 120px;
            }

            @media (max-width: 320px) {
                width: 100px;
            }
        }
    }

    @media (max-width: 480px) {
        span{
            display: none;
        }
    }
`

const FilterBlock = styled.div`
    margin-top: 30px;

    span{
        font-size: 24px;
        font-weight: 300;
    }

    button{
        padding: 5px 12px;
        border-radius: 50px;
        border: 2px solid #CCCCCC;
        background-color: transparent;
        display: flex;
        align-items: center;
        gap: 10px;

        svg{
            display: none;
        }

        &.active{
            border-color: var(--color-brown);
            color: var(--color-brown);

            svg{
                display: block;
            }
        }
    }

    .flex{
        margin-top: 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`

const MobileFilters = styled(motion.div)`
    position: fixed;
    z-index: 1002;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    padding: 32px 24px;
    max-height: 100vh;
    overflow: auto;

    @supports  (-webkit-touch-callout: none){
        padding-bottom: 120px;
    }

    pointer-events: none;
    opacity: 0;
    transform: translateX(50px);

    &.active{
        pointer-events: all;
        opacity: 1;
        transform: translateX(0);
    }
`

const Filter = styled(motion.div)`
    position: fixed;
    z-index: 101;
    top: 95px;
    left: 0;
    right: 0;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;
    height: 75px;

    @media (max-width: 1180px){
        height:64px;
    }

    @media (max-width: 840px) {
        top: 75px;
    }
    
    .container{
        pointer-events: none;
        display: flex;
        justify-content: space-between;

        @media (max-width: 1180px){
            align-items: center;
            height: 100%;
        }
    }

    .left{
        display: flex;
        gap: clamp(40px, ${40 / 1194 * 100}vw, 120px);

        @media (max-width: 1180px) {
            display: none;
        }
    }

    .left-alt{
        display: none;
        @media (max-width: 1180px) {
            display: block;

            button{
                border: none;
                pointer-events: all;
                background-color: transparent;
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 18px;
                cursor: pointer;

                svg{
                    margin-top: 2px;
                    width: 24px;
                    height: 24px;
                }
            }
        }

        @media (max-width: 600px) {
            button{
                font-size: 16px;

                svg{
                    width: unset;
                    height: unset;
                }
            }
        }
    }

   .label{
        padding: 16px 22px;
        margin: 12px -22px 0 -22px;
        cursor: pointer;

        
        @media (max-width: 1180px) {
            margin: 0;
            padding: 0;
        }
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    b{
        font-size: clamp(18px, ${18 / 1194 * 100}vw, 20px);
    }

    .underlined{
        background-color: transparent;
        border: unset;
        color: var(--color-brown);
        border-bottom: 1px solid var(--color-brown);
        padding: 0 7px 3px 0;
    }

    .filled{
        background-color: var(--color-brown);
        border: unset;
        color: #fff;
        padding: 12px 60px;
    }

    &.center{
            margin-top: 50px;
        justify-content: start;
        gap: 50px;
        @media (max-width: 500px) {
            justify-content: space-evenly;
        }
    }
`
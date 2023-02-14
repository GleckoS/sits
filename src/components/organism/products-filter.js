import React from "react"
import styled from "styled-components"
import { CloseButton } from "../atoms/close-button"
import { Container } from "../atoms/container"
import { DropDown } from "../moleculas/dropdown"
import { motion } from "framer-motion"

const searchTitle = {
    en: 'Search'
}

export const FilterComponent = ({
    filterAnimation,
    filterTitle,
    sortByTitle,
    sortBy,
    name,
    typeTitle,
    sofasTypes,
    upholsterysTitle,
    upholsterysArr,
    coversTitle,
    covesArr,
    reset,
    view,
    sort,
    type,
    upholsterys,
    cover,
    sortFilterTitle,
    setMobileFilterOpened,
    isMobileFilterOpened,
    setUpholsterys,
    setCover,
    setType,
    setSort,
    clearAll,
    inputValue,
    setInputValue,
    setSearch,
    setOpenedFilter,
    openedFilter
}) => (
    <>
        <MobileFilters className={isMobileFilterOpened ? 'active' : ''}>
            <Flex>
                <b>{filterTitle}</b>
                <CloseButton as='button' func={setMobileFilterOpened} val={false} />
            </Flex>
            <FilterBlock>
                <span>{sortByTitle}</span>
                <div className="flex">
                    {sortBy.map(el => (
                        <button key={el.val} onClick={() => { setSort(el.val) }} className={el.val === sort ? 'active' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                            </svg>
                            {el.name}
                        </button>
                    ))}
                </div>
            </FilterBlock>
            {name === 'Sofas' && (
                <FilterBlock>
                    <span>{typeTitle}</span>
                    <div className="flex">
                        {sofasTypes.map(el => (
                            <button key={el.val} onClick={() => { setType(el.val) }} className={el.val === type ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            {name !== "Coffee tables" && (
                <FilterBlock>
                    <span>{upholsterysTitle}</span>
                    <div className="flex">
                        {upholsterysArr.map(el => (
                            <button key={el.val} onClick={() => { setUpholsterys(el.val) }} className={el.val === upholsterys ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            {name !== "Coffee tables" && (
                <FilterBlock>
                    <span>{coversTitle}</span>
                    <div className="flex">
                        {covesArr.map(el => (
                            <button key={el.val} onClick={() => { setCover(el.val) }} className={el.val === cover ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="var(--color-brown)" strokeWidth="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            <Flex className="center">
                <button className="underlined" onClick={() => { clearAll(); setSort('Popular') }}>
                    {reset}
                </button>
                <button className="filled" onClick={() => { setMobileFilterOpened(false); window?.scrollTo({ top: 0 }) }}>
                    {view}
                </button>
            </Flex>
        </MobileFilters>
        <Filter variants={filterAnimation}>
            <Container className="container">
                <div className="left">
                    <DropDown id='1' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={sort} func={setSort} data={sortBy} controlTitle={sortByTitle + ': ' + sort} />
                    {name === 'sofas' && <DropDown id='2' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={type} func={setType} data={sofasTypes} controlTitle={typeTitle} />}
                    {name !== "coffee tables" && <DropDown id='3' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={upholsterys} func={setUpholsterys} data={upholsterysArr} controlTitle={upholsterysTitle} />}
                    {name !== "coffee tables" && <DropDown id='4' openedFilter={openedFilter} setOpenedFilter={setOpenedFilter} controller={cover} func={setCover} data={covesArr} controlTitle={coversTitle} />}
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
                        <span>{searchTitle['en']}</span>
                        <input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(inputValue)
                                setInputValue('')
                            }
                        }} value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                        <button onClick={() => { setSearch(inputValue); setInputValue('') }} aria-label={'search: ' + inputValue}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                    <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                        <circle cx="8" cy="8" r="8" stroke="none" />
                                        <circle cx="8" cy="8" r="7" fill="none" />
                                    </g>
                                    <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                </g>
                            </svg>
                        </button>
                    </Search>
                </div>
            </Container>
        </Filter>
    </>
)


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
            transition: transform .4s ease-out;
        }

        :hover{
            svg{
                transform: scale(1.15);
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

const FilterBlock = styled.div`
    margin-top: 30px;

    span{
        font-size: 18px;
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

const MobileFilters = styled.div`
    position: fixed;
    z-index: 112;
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
    transition:  all var(--menu-animation);

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
    position: sticky;
    z-index: 101;
    top: 95px;
    left: 0;
    right: 0;
    height: 75px;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;
    background-color: #fff;

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
                background-color: transparent;
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 18px;
                pointer-events: all;

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
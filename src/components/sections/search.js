import { Link, navigate } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../atoms/container'
import { MostPopularProductBlock } from '../organism/most-popular-products-block'
import { ResultMaterialBlock } from '../organism/result-material-block'
import { ResultProductBlock } from '../organism/results-product-block'
import { myContext } from "./../../hooks/provider"
import { BrownLink } from './../atoms/brown-link'

const pageTitle = 'Looking for something specific?'
const placeholder = 'Search'
const noResultTitle = 'No results'
const noResultMessage = `We couldn’t find any matches for „<search>”.
Double check your search for any typos or spelling errors - or try a different search term.`

const sofasTitle = 'Sofas'
const armchairsTitle = 'Armchairs'
const coffeeTablesTitle = 'Coffee Tables'
const diningChairsTitle = 'Dining Chairs'
const footstoolsTitle = 'Footstools'
const outdoorFurnituresTitle = 'Outdoor Furnitures'
const materialsTitle = 'Covers'

export default function Search({ Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures, location }) {

    // REWORK
    const searchValue = useMemo(() => {
        const urlParams = new URLSearchParams(location.search)
        const search = urlParams.get('search')
        return search ? search : ''
    }, [location])


    const [sofasItemCount, setSofasItemCount] = useState(0)
    const [armchairsItemCount, setArmchairsItemCount] = useState(0)
    const [coffeTablesItemCount, setCoffeTablesItemCount] = useState(0)
    const [diningChairsItemCount, setDiningChairsItemCount] = useState(0)
    const [footstoolsItemCount, setFootstoolsItemCount] = useState(0)
    const [outdoorFurnituresItemCount, setOutdoorFurnituresItemCount] = useState(0)
    const [coversItemCount, coversFurnituresItemCount] = useState(0)

    const [rerender, setRerender] = useState(false)

    const enterListener = (e, input) => {
        if (e.key === "Enter") {
            window.scrollTo(0, 0)
            navigate(input ? ('?search=' + input) : '')
        }
    }

    return (
        <Wrapper>
            <myContext.Consumer>
                {context => {
                    if ((sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0 && searchValue)) {
                        return null
                    }

                    if (searchValue) {
                        return (
                            <Content>
                                <Input>
                                    <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} placeholder={placeholder} />
                                    <Link onClick={() => { window.scrollTo(0, 0) }} aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" stroke-width="2">
                                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                                    <circle cx="8" cy="8" r="7" fill="none" />
                                                </g>
                                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" stroke-width="2" />
                                            </g>
                                        </svg>
                                    </Link>
                                </Input>
                            </Content>
                        )
                    }

                    return (
                        <Placeholder>
                            <h1>{pageTitle}</h1>
                            <Input>
                                <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} placeholder={placeholder} />
                                <Link aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                        <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                            <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" stroke-width="2">
                                                <circle cx="8" cy="8" r="8" stroke="none" />
                                                <circle cx="8" cy="8" r="7" fill="none" />
                                            </g>
                                            <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" stroke-width="2" />
                                        </g>
                                    </svg>
                                </Link>
                            </Input>
                            <BrownLink to="/contact/">Contact us</BrownLink>
                        </Placeholder>
                    )
                }}
            </myContext.Consumer>
            <Results className={searchValue ? '' : 'disable'} id='results'>
                <Container>
                    {(sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0 && searchValue) && (
                        <NoResults>
                            <myContext.Consumer>
                                {context => (
                                    <Input>
                                        <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} placeholder={placeholder} />
                                        <Link aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                                <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                                    <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" stroke-width="2">
                                                        <circle cx="8" cy="8" r="8" stroke="none" />
                                                        <circle cx="8" cy="8" r="7" fill="none" />
                                                    </g>
                                                    <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" stroke-width="2" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </Input>
                                )}
                            </myContext.Consumer>
                            <p>{noResultMessage.replace('<search>', searchValue)}</p>
                            <BrownLink to="/contact/">Contact us</BrownLink>
                        </NoResults>
                    )}
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={sofasItemCount} setCount={setSofasItemCount} title={sofasTitle} prefiltredArr={Sofas} searchValue={searchValue} />
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={armchairsItemCount} setCount={setArmchairsItemCount} title={armchairsTitle} prefiltredArr={Armchairs} searchValue={searchValue} />
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={coffeTablesItemCount} setCount={setCoffeTablesItemCount} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} searchValue={searchValue} />
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={diningChairsItemCount} setCount={setDiningChairsItemCount} title={diningChairsTitle} prefiltredArr={DiningChairs} searchValue={searchValue} />
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={footstoolsItemCount} setCount={setFootstoolsItemCount} title={footstoolsTitle} prefiltredArr={Footstools} searchValue={searchValue} />
                    <ResultProductBlock setRerender={setRerender} rerender={rerender} count={outdoorFurnituresItemCount} setCount={setOutdoorFurnituresItemCount} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} searchValue={searchValue} />
                    <ResultMaterialBlock setRerender={setRerender} rerender={rerender} count={coversItemCount} setCount={coversFurnituresItemCount} title={materialsTitle} prefiltredArr={Materials} searchValue={searchValue} />
                </Container>
            </Results>
            {(!searchValue || (sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0)) && (
                <MostPopularProducts>
                    <Container>
                        <h2>Check our most popular products</h2>
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={sofasTitle} prefiltredArr={Sofas} />
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={armchairsTitle} prefiltredArr={Armchairs} />
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} />
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={diningChairsTitle} prefiltredArr={DiningChairs} />
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={footstoolsTitle} prefiltredArr={Footstools} />
                        <MostPopularProductBlock setRerender={setRerender} rerender={rerender} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} />

                    </Container>
                </MostPopularProducts>
            )}
        </Wrapper>
    )
}

const MostPopularProducts = styled.div`
    background-color: #F9F5F0;
    padding-bottom: 80px;
    padding-top: 80px;
    margin-bottom: calc(clamp(45px, 10.050251256281408vw, 160px) * -1 );
    h2{
        font-family: "Ivy";
        font-weight: 300;
        font-size: 36px;
        line-height: 150%;
        letter-spacing: 0.003em;
    }
`

const Placeholder = styled.div`
    max-width: 600px;
    margin: 160px auto 100px;
    h1{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-align: center;
    }
    div{
        margin-top: 48px;
        margin-bottom: 24px;
    }
`

const Wrapper = styled.section`
`

const Input = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 16px;

    input{
        border: none;
        width: 100%;
        background-color: transparent;
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 300;
        border-bottom: 1px solid black;
    }

    svg{
        transition: transform .4s ease-out;
    }

    a{
        &:hover{
            svg{
                transform: scale(1.2);
            }
        }
    }

`

const Content = styled.div`
    position: fixed;
    z-index: 10;
    right: 45px;
    top: 100px;
`

const Results = styled.div`
    background-color: #F9F5F0;
    padding: 0 0 60px 0;
    margin-bottom: calc(clamp(45px, 10.050251256281408vw, 160px) * -1 );

    &.disable{
        padding: 0 0 1px 0;
        background-color: transparent;
        display: none;
    }
`

const NoResults = styled.div`
    padding: 120px 0 120px 0;
    text-align: center;
    max-width: 926px;
    margin: 0 auto ;

    div{
        max-width: 500px;
        margin: 0 auto 24px auto;
    }

    h2{
        margin-bottom: 42px;
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-decoration: underline;
        
    }

    p{
        font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
    }
`
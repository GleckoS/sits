import { Link } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../atoms/container'
import { ResultMaterialBlock } from '../organism/result-material-block'
import { ResultProductBlock } from '../organism/results-product-block'

const pageTitle = 'Looking for something specific?'
const placeholder = 'Search'
const noResultTitle = 'No results'
const noResultMessage = `We couldn’t find any matches for ”Sofabedbkghsfblng”.
Double check your search for any typos or spelling errors - or try a different search term.`

const sofasTitle = 'Sofas'
const armchairsTitle = 'Armchairs'
const coffeeTablesTitle = 'Coffee Tables'
const diningChairsTitle = 'Dining Chairs'
const footstoolsTitle = 'Footstools'
const outdoorFurnituresTitle = 'Outdoor Furnitures'
const materialsTitle = 'Covers'

export default function Search({ Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures, location }) {

    const searchValue = useMemo(() => {
        const urlParams = new URLSearchParams(location.search)
        const search = urlParams.get('search')
        return search ? search : ''
    }, [location])
    const [inputValue, setInputValue] = useState(searchValue)

    useEffect(() => {
        if (searchValue && typeof window !== 'undefined') {
            let headerHeight = window.innerWidth < 841 ? 75 : 109
            let results = document.getElementById('results')
            window.scrollTo(0, results.offsetTop - headerHeight)
        }
    }, [searchValue, location])

    const [sofasItemCount, setSofasItemCount] = useState(0)
    const [armchairsItemCount, setArmchairsItemCount] = useState(0)
    const [coffeTablesItemCount, setCoffeTablesItemCount] = useState(0)
    const [diningChairsItemCount, setDiningChairsItemCount] = useState(0)
    const [footstoolsItemCount, setFootstoolsItemCount] = useState(0)
    const [outdoorFurnituresItemCount, setOutdoorFurnituresItemCount] = useState(0)
    const [coversItemCount, coversFurnituresItemCount] = useState(0)

    return (
        <Wrapper>
            <Container>
                <Content>
                    <h1>{pageTitle}</h1>
                    <Input>
                        <input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder={placeholder} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" stroke-width="2">
                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                    <circle cx="8" cy="8" r="7" fill="none" />
                                </g>
                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" stroke-width="2" />
                            </g>
                        </svg>
                    </Input>
                    <Link className='button' to={inputValue ? ('?search=' + inputValue) : ''}>{placeholder}</Link>
                </Content>
            </Container>
            <Results className={searchValue ? '' : 'disable'} id='results'>
                <Container>
                    {(sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0 && searchValue) && (
                        <NoResults>
                            <h2>{noResultTitle}</h2>
                            <p>{noResultMessage}</p>
                        </NoResults>
                    )}
                    <ResultProductBlock count={sofasItemCount} setCount={setSofasItemCount} title={sofasTitle} prefiltredArr={Sofas} searchValue={searchValue} />
                    <ResultProductBlock count={armchairsItemCount} setCount={setArmchairsItemCount} title={armchairsTitle} prefiltredArr={Armchairs} searchValue={searchValue} />
                    <ResultProductBlock count={coffeTablesItemCount} setCount={setCoffeTablesItemCount} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} searchValue={searchValue} />
                    <ResultProductBlock count={diningChairsItemCount} setCount={setDiningChairsItemCount} title={diningChairsTitle} prefiltredArr={DiningChairs} searchValue={searchValue} />
                    <ResultProductBlock count={footstoolsItemCount} setCount={setFootstoolsItemCount} title={footstoolsTitle} prefiltredArr={Footstools} searchValue={searchValue} />
                    <ResultProductBlock count={outdoorFurnituresItemCount} setCount={setOutdoorFurnituresItemCount} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} searchValue={searchValue} />
                    <ResultMaterialBlock count={coversItemCount} setCount={coversFurnituresItemCount} title={materialsTitle} prefiltredArr={Materials} searchValue={searchValue}/>
                </Container>
            </Results>
        </Wrapper>
    )
}

const Wrapper = styled.section`
`

const Input = styled.div`
    margin-top: 48px;
    margin-bottom: 24px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input{
        border: none;
        width: 100%;
        background-color: transparent;
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 300;
    }

`

const Content = styled.div`
    max-width: 600px;
    margin: 240px auto 160px auto;

    h1{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-align: center;
    }
`

const Results = styled.div`
    background-color: #F9F5F0;
    padding: 0 0 60px 0;
    margin-bottom: -160px;

    &.disable{
        padding: 0 0 1px 0;
        background-color: transparent;
    }
`

const NoResults = styled.div`
    padding: 120px 0 120px 0;
    text-align: center;
    max-width: 926px;
    margin: 0 auto;

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
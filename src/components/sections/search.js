import { Link, navigate } from 'gatsby'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../atoms/container'
import { MostPopularProductBlock } from '../organism/most-popular-products-block'
import { ResultMaterialBlock } from '../organism/result-material-block'
import { ResultProductBlock } from '../organism/results-product-block'
import { myContext } from "./../../hooks/provider"
import { BrownLink } from './../atoms/brown-link'
import InView from './in-view-provider'
import { imageTransition } from "../../helpers/animation-controller"
import { motion } from 'framer-motion'
import {
    armchairsTitle, sofasTitle, coffeeTablesTitle, diningChairsTitle, footstoolsTitle, outdoorFurnituresTitle, materialsTitle,
    searchPlaceholder as placeholder, searchPageTitle as pageTitle, searchNoResultMessage, contatcButton
} from '../../texts'


const inputAnimation = imageTransition(1)
const popularTitleAnimation = imageTransition(1)

const popularContentAnimation = {
    animate: { transition: { staggerChildren: .3, delayChildren: .8 } }
}

const contentAnimation = {
    animate: { transition: { staggerChildren: .3, delayChildren: .6 } }
}

const contentTitleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4 } }
}

const contentGridAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6 } }
}

export default function Search({ Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures, location }) {

    const [isActive, setIsActive] = useState(false)
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
            setIsActive(!!input)
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
                                <Input onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!context.searchInputValue) }} >
                                    <span className={isActive || context.searchInputValue ? 'active' : ''}>{placeholder['en']}</span>
                                    <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} />
                                    <Link onClick={() => { window.scrollTo(0, 0); setIsActive(!!context.searchInputValue) }} aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                                    <circle cx="8" cy="8" r="7" fill="none" />
                                                </g>
                                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </Link>
                                </Input>
                            </Content>
                        )
                    }

                    return (
                        <InView>
                            <Placeholder variants={inputAnimation}>
                                <h1>{pageTitle['en']}</h1>
                                <Input onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!context.searchInputValue) }} >
                                    <span className={isActive || context.searchInputValue ? 'active' : ''}>{placeholder['en']}</span>
                                    <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} />
                                    <Link onClick={() => { setIsActive(!!context.searchInputValue) }} aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                                    <circle cx="8" cy="8" r="7" fill="none" />
                                                </g>
                                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </Link>
                                </Input>
                                <BrownLink to="/contact/">{contatcButton['en']}</BrownLink>
                            </Placeholder>
                        </InView>
                    )
                }}
            </myContext.Consumer>
            <Results className={searchValue ? '' : 'disable'} id='results'>
                <Container>
                    {(sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0 && searchValue) && (
                        <InView>
                            <NoResults variants={inputAnimation}>
                                <myContext.Consumer>
                                    {context => (
                                        <Input onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!context.searchInputValue) }} >
                                            <span className={isActive || context.searchInputValue ? 'active' : ''}>{placeholder['en']}</span>
                                            <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} value={context.searchInputValue} onChange={(e) => { context.setSearchInputValue(e.target.value) }} />
                                            <Link onClick={() => { setIsActive(!!context.searchInputValue) }} aria-label='search' tabIndex='-1' to={context.searchInputValue ? ('?search=' + context.searchInputValue) : ''}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                                    <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                                        <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                                            <circle cx="8" cy="8" r="8" stroke="none" />
                                                            <circle cx="8" cy="8" r="7" fill="none" />
                                                        </g>
                                                        <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                                    </g>
                                                </svg>
                                            </Link>
                                        </Input>
                                    )}
                                </myContext.Consumer>
                                <p>{searchNoResultMessage['en'].replace('<search>', searchValue)}</p>
                                <BrownLink to="/contact/">{contatcButton['en']}</BrownLink>
                            </NoResults>
                        </InView>
                    )}
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={sofasItemCount} setCount={setSofasItemCount} title={sofasTitle} prefiltredArr={Sofas} searchValue={searchValue} />
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={armchairsItemCount} setCount={setArmchairsItemCount} title={armchairsTitle} prefiltredArr={Armchairs} searchValue={searchValue} />
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={coffeTablesItemCount} setCount={setCoffeTablesItemCount} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} searchValue={searchValue} />
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={diningChairsItemCount} setCount={setDiningChairsItemCount} title={diningChairsTitle} prefiltredArr={DiningChairs} searchValue={searchValue} />
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={footstoolsItemCount} setCount={setFootstoolsItemCount} title={footstoolsTitle} prefiltredArr={Footstools} searchValue={searchValue} />
                    <ResultProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={outdoorFurnituresItemCount} setCount={setOutdoorFurnituresItemCount} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} searchValue={searchValue} />
                    <ResultMaterialBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={setRerender} rerender={rerender} count={coversItemCount} setCount={coversFurnituresItemCount} title={materialsTitle} prefiltredArr={Materials} searchValue={searchValue} />
                </Container>
            </Results>
            {(!searchValue || (sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount === 0)) && (
                <MostPopularProducts>
                    <Container>
                        <InView margin="-100px 0px -200px 0px" >
                            <motion.h2 variants={popularTitleAnimation}>Check our most popular products</motion.h2>
                        </InView>
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={sofasTitle} prefiltredArr={Sofas} />
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={armchairsTitle} prefiltredArr={Armchairs} />
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} />
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={diningChairsTitle} prefiltredArr={DiningChairs} />
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={footstoolsTitle} prefiltredArr={Footstools} />
                        <MostPopularProductBlock contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={popularContentAnimation} setRerender={setRerender} rerender={rerender} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} />
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
        font-size: clamp(26px, ${36 / 1194 * 100}vw, 36px);
        line-height: 150%;
        letter-spacing: 0.003em;
    }
`

const Placeholder = styled(motion.div)`
    max-width: 600px;
    margin: clamp(100px, ${160 / 1194 * 100}vw, 160px) auto 100px;
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
    padding: 32px 16px 16px 16px;
    position: relative;

    input{
        border: none;
        width: 100%;
        background-color: transparent;
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 300;
        border-bottom: 1px solid black;

        @media (max-width: 768px){
            font-size: 18px;
        }
    }

    span{
        position: absolute;
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.003em;
        color: #767676;
        left: 16px;
        top: 28px;
        pointer-events: none;
        transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);

        @media (max-width: 768px){
            font-size: 18px;
            top: 32px;
        }

        &.active{
            font-size: clamp(12px, ${16 / 1366 * 100}vw, 16px);
            top: 28px;
            transform: translateY(-100%);
        }
    }

    svg{
        transition: transform .4s cubic-bezier(0.42, 0, 0.58, 1);
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

    @media (max-width: 768px) {
        right: 24px;
    }
`

const Results = styled.div`
    background-color: #F9F5F0;
    padding: 0 0 60px 0;
    margin-bottom: calc(clamp(45px, 10.050251256281408vw, 160px) * -1 );
    @media (max-width: 480px) {
        padding-top: 80px;
    }


    &.disable{
        padding: 0 0 1px 0;
        background-color: transparent;
        display: none;
    }
`

const NoResults = styled(motion.div)`
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
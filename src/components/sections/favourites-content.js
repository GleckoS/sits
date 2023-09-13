import { motion } from "framer-motion"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { imageTransition, textTransition } from "../../helpers/animation-controller"
import { getCookie } from "../../helpers/coockie-manager"
import { Container } from "../atoms/container"
import { FavouriteCollectionBlock } from "../organism/favourite-collection-block"
import { FavouriteColorBlock } from "../organism/favourite-color-block"
import { FavouriteMaterialBlock } from "../organism/favourite-material-block"
import { FavouriteProductBlock } from "../organism/favourite-product-block"
import InView from "./in-view-provider"
import {
    noResultTitle, noResultMessage, collectionsTitle, sofasTitle, armchairsTitle, coffeeTablesTitle,
    diningChairsTitle, footstoolsTitle, outdoorFurnituresTitle, materialsTitle, colorsTitle, favouritesTitle
} from "../../texts"

const titleAnimation = textTransition(1, 'slow')
const noresultsAnimation = imageTransition(3)
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

export default function Content({ language, data: { Collections, Materials, Sofas, Armchairs, CoffeeTables, DiningChairs, Footstools, OutdoorFurnitures } }) {

    const [favourites, setFavourites] = useState({
        collections: getCookie('collections' + language),
        products: getCookie('products' + language),
        materials: getCookie('materials' + language),
        colors: getCookie('colors' + language)
    })

    const [collectionsCount, setCollectionsCount] = useState(0)
    const [sofasItemCount, setSofasItemCount] = useState(0)
    const [armchairsItemCount, setArmchairsItemCount] = useState(0)
    const [coffeTablesItemCount, setCoffeTablesItemCount] = useState(0)
    const [diningChairsItemCount, setDiningChairsItemCount] = useState(0)
    const [footstoolsItemCount, setFootstoolsItemCount] = useState(0)
    const [outdoorFurnituresItemCount, setOutdoorFurnituresItemCount] = useState(0)
    const [coversItemCount, setCoversItemCount] = useState(0)
    const [colorsItemCount, setColorsItemCount] = useState(0)

    const changeFavourites = () => {
        setFavourites({
            collections: getCookie('collections' + language),
            products: getCookie('products' + language),
            materials: getCookie('materials' + language),
            colors: getCookie('colors' + language)
        })
    }
    return (
        <InView>
            <Wrapper>
                <Container>
                    <h1><motion.span variants={titleAnimation}>{favouritesTitle[language]}</motion.span></h1>
                </Container>
                <Results>
                    <Container>
                        {(collectionsCount + sofasItemCount + armchairsItemCount + coffeTablesItemCount + diningChairsItemCount + footstoolsItemCount + outdoorFurnituresItemCount + coversItemCount + colorsItemCount === 0) && (
                            <NoResults variants={noresultsAnimation}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="101.944" height="94.563" viewBox="0 0 101.944 94.563">
                                    <path id="Path_676" data-name="Path 676" d="M48.722,89.283l-4.994-4.507A432.65,432.65,0,0,1,11.937,53.107Q0,39.586,0,25.7A24.883,24.883,0,0,1,7.369,7.369,24.734,24.734,0,0,1,25.579,0a27.7,27.7,0,0,1,12.3,2.984,28.913,28.913,0,0,1,10.841,9.805A35.33,35.33,0,0,1,59.806,2.984,25.73,25.73,0,0,1,71.865,0a24.734,24.734,0,0,1,18.21,7.369A24.883,24.883,0,0,1,97.444,25.7q0,13.886-11.937,27.406A432.648,432.648,0,0,1,53.716,84.776Zm0-9.623" transform="translate(2.25 2.25)" fill="none" stroke="#bababa" strokeWidth="4.5" strokeDasharray="14 4" opacity="0.38" />
                                </svg>
                                <h2>{noResultTitle[language]}</h2>
                                <p dangerouslySetInnerHTML={{ __html: noResultMessage[language] }}></p>
                            </NoResults>
                        )}
                        <FavouriteCollectionBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={collectionsCount} setCount={setCollectionsCount} title={collectionsTitle} prefiltredArr={Collections} filter={favourites.collections} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={sofasItemCount} setCount={setSofasItemCount} title={sofasTitle} prefiltredArr={Sofas} filter={favourites.products} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={armchairsItemCount} setCount={setArmchairsItemCount} title={armchairsTitle} prefiltredArr={Armchairs} filter={favourites.products} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={coffeTablesItemCount} setCount={setCoffeTablesItemCount} title={coffeeTablesTitle} prefiltredArr={CoffeeTables} filter={favourites.products} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={diningChairsItemCount} setCount={setDiningChairsItemCount} title={diningChairsTitle} prefiltredArr={DiningChairs} filter={favourites.products} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={footstoolsItemCount} setCount={setFootstoolsItemCount} title={footstoolsTitle} prefiltredArr={Footstools} filter={favourites.products} />
                        <FavouriteProductBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={outdoorFurnituresItemCount} setCount={setOutdoorFurnituresItemCount} title={outdoorFurnituresTitle} prefiltredArr={OutdoorFurnitures} filter={favourites.products} />
                        <FavouriteMaterialBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={coversItemCount} setCount={setCoversItemCount} title={materialsTitle} prefiltredArr={Materials} filter={favourites.materials} />
                        <FavouriteColorBlock language={language} contentGridAnimation={contentGridAnimation} contentTitleAnimation={contentTitleAnimation} animation={contentAnimation} setRerender={changeFavourites} count={colorsItemCount} setCount={setColorsItemCount} title={colorsTitle} prefiltredArr={Materials} filter={favourites.colors} />
                    </Container>
                </Results>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    h1{
        font-family: 'Ivy';
        font-size: 40px;
        font-weight: 300;
        padding: clamp(20px, ${70 / 1194 * 100}vw, 90px) 0 clamp(40px, ${100 / 1194 * 100}vw, 110px) 0;
    }
`


const Results = styled.div`
    background-color: #F9F5F0;
    padding: 0 0 40px 0;
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));

    &.disable{
        padding: 0 0 1px 0;
        background-color: transparent;
    }
`

const NoResults = styled(motion.div)`
    padding: 120px 0 120px 0;
    text-align: center;
    max-width: 926px;
    margin: 0 auto;

    svg{
        margin-bottom: 42px;
    }

    h2{
        margin-bottom: 32px;
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
    }

    p{
        font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;

        a{
            width: fit-content;
            position: relative;
            padding-bottom: 1px;
            text-decoration: unset !important;

            transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

            background-image: linear-gradient(#222b40, #222b40);
            background-size: 80% 1px;
            background-position: left bottom;
            background-repeat: no-repeat;

            &:hover {
                background-size: 100% 1px !important;
            }
        }
    }
`
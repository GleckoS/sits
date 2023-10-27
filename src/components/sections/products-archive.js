import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { ProductList } from "../organism/products-list"
import { Container } from "../atoms/container"
import { CloseButton } from './../atoms/close-button'
import { FilterComponent } from "../organism/products-filter"
import { useEffect } from "react"
import scrollLock from './../../helpers/scroll-lock'
import { partSlugDeTransform, partSlugTransform } from "../../helpers/slug-maker"
import { Title } from "../../components/moleculas/title-sub"
import { useQueryParam } from "../../hooks/query-params"
import InView from "./in-view-provider"
import { imageTransition } from "../../helpers/animation-controller"
import { motion } from "framer-motion"
import {
    typeTitle, sortByTitle, filterTitle, clearAllTitle,
    coverParamName, pageParamName, searchParamName, sortBy, sortParamName, typeParamName, noResultMessage,
    upholsteryParamName, upholsterysTitle, coversTitle, reset, view, sortFilterTitle, noResultTitle, upholsterysArrAll, covesArrAll, sofasTypesAll
} from "../../texts/filter"
import { searchPlaceholder as searchFilterTitle } from "../../texts"

const filterItemAnimation = imageTransition(-1.5)
const filterAnimation = imageTransition(1)
const gridAnimation = imageTransition(1)

export default function ProductArchive({ language, location, pageContext: { type: name, title }, products }) {
    const [sort, setSort] = useQueryParam(sortParamName[language], sortBy[language][0].val, location)
    const [type, setType] = useQueryParam(typeParamName[language], 'All', location)
    const [cover, setCover] = useQueryParam(coverParamName[language], 'All', location)
    const [upholsterys, setUpholsterys] = useQueryParam(upholsteryParamName[language], 'All', location)
    const [search, setSearch] = useQueryParam(searchParamName[language], '', location)
    const [page, setPage] = useQueryParam(pageParamName[language], '1', location)
    const [inputValue, setInputValue] = useState('')
    const [defaultPosts] = useState(products)
    const [upholsterysArr] = useState(() => {
        const arr = [{ name: upholsterysArrAll[language], val: 'All' }]
        products.forEach(el => {
            el?.products?.collection?.upholsterys?.nodes?.forEach(inEl => {
                if (!arr.find(el => el.name === inEl.name)) {
                    arr.push({ name: inEl.name, val: inEl.name })
                }
            })
        })
        return arr
    })
    const [coversArr] = useState(() => {
        const arr = [{ name: covesArrAll[language], val: 'All' }]
        products.forEach(el => {
            el?.products?.collection?.covers?.nodes?.forEach(inEl => {
                if (!arr.find(el => el.name === inEl.name)) {
                    arr.push({ name: inEl.name, val: inEl.name })
                }
            })
        })
        return arr
    })
    const [sofasTypes] = useState(() => {
        const arr = [{ name: sofasTypesAll[language], val: 'All' }]
        if (name === 'sofas') {
            const typesMap = {};
            products.forEach((el) => {
                el.types.nodes.forEach((inEl) => {
                    if (!typesMap[inEl.name]) {
                        typesMap[inEl.name] = true;
                        debugger
                        if (inEl.collectionTypes.typeArchive.url.includes('?')) {
                            arr.push({ name: inEl.name, val: inEl.name });
                        }
                    }
                });
            });
            debugger
        }
        return arr
    })

    const changeType = useCallback((e, url) => {
        if (typeof window !== 'undefined' && name === 'sofas') {
            const [, paramString] = url.split('?');
            let params = new URLSearchParams(paramString)
            if (params.has('type')) {
                e.preventDefault()
                setPage('1')
                window.scrollTo(0, 0)
                setType(params.get('type'))
            }
        }
    }, [location, setType, name, setPage])

    const [isMobileFilterOpened, setMobileFilterOpened] = useState(false)

    const clearAll = () => {
        setCover('All')
        setType('All')
        setUpholsterys('All')
        setPage('1')
        setSearch('')
    }

    const filtredProducts = useMemo(() => {
        let arr = [...defaultPosts].filter(el => {
            if (!el.products.collection) {
                console.log('product ' + el.title + ' without collection')
                return false
            }

            return el.products.collection
        })
        let locSort = partSlugDeTransform(sort)
        let locType = partSlugDeTransform(type)
        let locUpholsterys = partSlugDeTransform(upholsterys)
        let locCover = partSlugDeTransform(cover)

        if (search !== '') {
            arr = arr.filter(el => el.products.collection.slug.includes(search.toLowerCase()))
        }

        if (locType !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.types.nodes.forEach(inEl => {
                    if (inEl.name.toLowerCase() === locType.toLowerCase()) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }
        if (locUpholsterys !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.products.collection.upholsterys?.nodes?.forEach(inEl => {
                    if (cover === 'Removable') {
                        if (locUpholsterys === 'Leather' && inEl.name === 'Leather') {
                            isAccessed = true
                        } else if (locUpholsterys === 'Fabric' && inEl.name.includes(locUpholsterys)) {
                            isAccessed = true
                        }

                    } else if (cover === 'Fixed') {
                        if (locUpholsterys === 'Leather' && (inEl.name === 'Leather only in fixed cover' || inEl.name === 'Leather')) {
                            isAccessed = true
                        } else if (locUpholsterys === 'Fabric' && inEl.name.includes(locUpholsterys)) {
                            isAccessed = true
                        }

                    } else if (inEl.name.includes(locUpholsterys)) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }
        if (locCover !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.products.collection.covers?.nodes?.forEach(inEl => {
                    if (inEl.name === locCover) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }

        if (locSort === sortBy[language][0].val) {
            let filtrArr = [...arr]

            filtrArr.sort((a, b) => {
                if (a.products?.collection?.collections?.generalCollectionInformation?.isPopular && !b.products?.collection?.collections?.generalCollectionInformation?.isPopular)
                    return -1
                if (!a.products?.collection?.collections?.generalCollectionInformation?.isPopular && b.products?.collection?.collections?.generalCollectionInformation?.isPopular)
                    return 1

                return a.products?.collection?.collections?.generalCollectionInformation?.popularImportanceIndex - b.products?.collection?.collections?.generalCollectionInformation?.popularImportanceIndex
            })

            arr = filtrArr
        }

        if (locSort === sortBy[language][1].val) {
            let filtrArr = []
            arr.forEach(el => {
                if (el.products.isNewArrival) {
                    filtrArr.unshift(el)
                } else {
                    filtrArr.push(el)
                }
            })
            arr = filtrArr
        }

        if (locSort === sortBy[language][2].val) {
            arr.sort((a, b) => a.products.collection.title.localeCompare(b.products.collection.title))
        }
        return arr
    }, [defaultPosts, sort, type, cover, upholsterys, search])

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        if (isMobileFilterOpened) {
            scrollLock.enable('mobile-filter')
        } else {
            scrollLock.disable('mobile-filter')
        }

        return () => {
            scrollLock.disable('mobile-filter')
        }
    }, [isMobileFilterOpened])

    return (
        <InView>
            <Wrapper>
                <FilterComponent
                    filterAnimation={filterAnimation}
                    filterTitle={filterTitle[language]}
                    sortByTitle={sortByTitle[language]}
                    sortBy={sortBy[language]}
                    name={name}
                    typeTitle={typeTitle[language]}
                    sofasTypes={sofasTypes}
                    upholsterysTitle={upholsterysTitle[language]}
                    upholsterysArr={upholsterysArr}
                    coversTitle={coversTitle[language]}
                    covesArr={coversArr}
                    reset={reset[language]}
                    view={view[language]}
                    sort={partSlugDeTransform(sort)}
                    type={partSlugDeTransform(type)}
                    upholsterys={partSlugDeTransform(upholsterys)}
                    cover={partSlugDeTransform(cover)}
                    sortFilterTitle={sortFilterTitle[language]}
                    setMobileFilterOpened={setMobileFilterOpened}
                    isMobileFilterOpened={isMobileFilterOpened}
                    setUpholsterys={(v) => { setUpholsterys(partSlugTransform(v)); setPage('1'); window.scrollTo(0, 0) }}
                    setCover={(v) => { setCover(partSlugTransform(v)); setPage('1'); window.scrollTo(0, 0) }}
                    setType={(v) => { setType(partSlugTransform(v)); setPage('1'); window.scrollTo(0, 0) }}
                    setSort={(v) => { setSort(partSlugTransform(v)); setPage('1'); window.scrollTo(0, 0) }}
                    clearAll={clearAll}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setSearch={(v) => { setSearch(v); setPage('1'); window.scrollTo(0, 0) }}
                    language={language}
                />
                <Title small={true} title={title} />
                <Container className="content-wrap">
                    <ActiveFilters variants={gridAnimation} >
                        {type !== 'All' && (
                            <FilterItem variants={filterItemAnimation} onClick={() => { setType('All') }}>
                                {partSlugDeTransform(type)}
                                <CloseButton />
                            </FilterItem>
                        )}
                        {upholsterys !== 'All' && (
                            <FilterItem variants={filterItemAnimation} onClick={() => { setUpholsterys('All') }}>
                                {partSlugDeTransform(upholsterys)}
                                <CloseButton />
                            </FilterItem>
                        )}
                        {cover !== 'All' && (
                            <FilterItem variants={filterItemAnimation} onClick={() => { setCover('All') }}>
                                {partSlugDeTransform(cover)}
                                <CloseButton />
                            </FilterItem>
                        )}
                        {search !== '' && (
                            <FilterItem variants={filterItemAnimation} onClick={() => { setSearch('') }}>
                                {searchFilterTitle[language]}: „{search}”
                                <CloseButton />
                            </FilterItem>
                        )}
                        {(type !== 'All' || cover !== 'All' || upholsterys !== 'All') && (
                            <FilterItem variants={filterItemAnimation} onClick={() => { clearAll('') }} className="close">
                                {clearAllTitle[language]}
                                <CloseButton />
                            </FilterItem>
                        )}
                    </ActiveFilters>
                    {filtredProducts.length > 0
                        ? (
                            <motion.div variants={gridAnimation}>
                                <ProductList language={language} itemKey={sort + type + cover + upholsterys + search} changeType={changeType} setRerender={setRerender} page={page} setPage={setPage} rerender={rerender} products={filtredProducts} />
                            </motion.div>
                        )
                        : (
                            <NoResults variants={gridAnimation}>
                                <h2>{noResultTitle[language]}</h2>
                                <p>{noResultMessage[language]}</p>
                            </NoResults>
                        )}
                </Container>
            </Wrapper>
        </InView >
    )
}

const NoResults = styled(motion.div)`
    padding: 120px 0 120px 0;
    text-align: center;
    max-width: 926px;
    margin: 0 auto;

    h2{
        margin-bottom: 42px;
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
    }

    p{
        font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
    }
`

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding:  0 0 86px 0;
    position: relative;
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));
    padding-top: 91px;

    @media (max-width: 1180px){
        padding-top: 64px;
    }

    .button{
        margin-top: 42px;
    }

    @media (max-width: 640px) {
        
    }
`

const ActiveFilters = styled(motion.div)`
    margin: 20px 0;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

const FilterItem = styled(motion.button)`
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    border-radius: 22px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    div{
        width: 16px;
        height: 16px;
        svg{
            width: 16px;
            height: 16px;
        }
    }

    &.close{
        background-color: #EAEAEA;
    }
`
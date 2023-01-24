import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { ProductList } from "../organism/products-list"
import { Container } from "../atoms/container"
import { CloseButton } from './../atoms/close-button'
import { FilterComponent } from "../organism/products-filter"
import { useEffect } from "react"
import scrollLock from './../../helpers/scroll-lock'
import { useQueryParamString } from 'react-use-query-param-string'
import { partSlugDeTransform, partSlugTransform } from "../../helpers/slug-maker"
import { Title } from "../../components/moleculas/title-sub"

const sortBy = {
    en: [
        {
            name: 'Popular', val: 'Popular'
        },
        {
            name: 'Alphabetical', val: 'Alphabetical'
        },
        {
            name: 'New Arrivals', val: 'New Arrivals'
        }
    ]
}

const sofasTypes = {
    en: [
        {
            name: 'All Types', val: 'All'
        },
        {
            name: 'Regular Sofas', val: 'Regular Sofas'
        },
        {
            name: 'Sofa Beds', val: 'Sofa Beds'
        },
        {
            name: 'Corner Sofas', val: 'Corner Sofas'
        },
        {
            name: 'Modular Systems', val: 'Modular Systems'
        }
    ]
}

const upholsterysArr = {
    en: [
        {
            name: 'All upholsteries', val: 'All'
        },
        {
            name: 'Fabric', val: 'Fabric'
        },
        {
            name: 'Leather', val: 'Leather'
        },
    ]
}

const covesArr = {
    en: [
        {
            name: 'All Covers', val: 'All'
        },
        {
            name: 'Fixed', val: 'Fixed'
        },
        {
            name: 'Removable', val: 'Removable'
        },
    ]
}

const clearAllTitle = {
    'en': 'Clear all filters'
}

const filterTitle = {
    en: 'Filter'
}

const sortByTitle = {
    en: 'Sort by'
}

const typeTitle = {
    en: 'Type of sofa'
}

const upholsterysTitle = {
    en: 'Type of upholstery'
}

const coversTitle = {
    en: 'Type of cover'
}

const reset = {
    en: 'RESET ALL'
}

const view = {
    en: 'VIEW'
}

const sortFilterTitle = {
    en: 'Sort & Filter'
}

const noResultTitle = {
    en: 'No results'
}

const noResultMessage = {
    en: `We couldn’t find any matches for your filters.`
}

const searchFilterTitle = {
    en: 'Search: '
}


export default function ProductArchive({ location, pageContext: { name }, products }) {
    const [sort, setSort] = useQueryParamString('sort', 'Popular')
    const [type, setType] = useQueryParamString('type', 'All')
    const [cover, setCover] = useQueryParamString('cover', 'All')
    const [upholsterys, setUpholsterys] = useQueryParamString('upholsterys', 'All')
    const [search, setSearch] = useQueryParamString('search', '')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (location.search === '') {
            if (sort !== 'Popular') {
                setSort('Popular')
            }
            if (type !== 'All') {
                setType('All')
            }
            if (cover !== 'All') {
                setCover('All')
            }
            if (upholsterys !== 'All') {
                setUpholsterys('All')
            }
            if (search !== '') {
                setSearch('')
            }
        }
    }, [location])

    const [isMobileFilterOpened, setMobileFilterOpened] = useState(false)
    const [openedFilter, setOpenedFilter] = useState(false)
    const [showCount, setShowCount] = useState(8)

    const clearAll = () => {
        setCover('All')
        setType('All')
        setUpholsterys('All')
    }

    const defaultPosts = useMemo(() => {
        if (!name) {
            return products
        }
        return products.filter(el => {
            let isAccessed = false
            el.types.nodes.forEach((inEl) => {
                if (inEl.name === name) {
                    isAccessed = true
                }
                return
            })
            return isAccessed
        })
    }, [name, products])

    const filtredProducts = useMemo(() => {
        let arr = [...defaultPosts]
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
                        debugger
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

        if (locSort === 'Popular') {
            let filtrArr = []
            arr.forEach(el => {
                if (el.products?.collection?.collections?.generalCollectionInformation?.isPopular) {
                    filtrArr.unshift(el)
                } else {
                    filtrArr.push(el)
                }
            })
            arr = filtrArr
        }

        if (locSort === 'New Arrivals') {
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

        if (locSort === 'Alphabetical') {
            arr.sort((a, b) => a.products.collection.title.localeCompare(b.products.collection.title))
        }
        return arr
    }, [defaultPosts, sort, type, cover, upholsterys, search])

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        setShowCount(8)
    }, [filtredProducts])

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
        <Wrapper>
            <FilterComponent
                filterTitle={filterTitle['en']}
                sortByTitle={sortByTitle['en']}
                sortBy={sortBy['en']}
                name={name}
                typeTitle={typeTitle['en']}
                sofasTypes={sofasTypes['en']}
                upholsterysTitle={upholsterysTitle['en']}
                upholsterysArr={upholsterysArr['en']}
                coversTitle={coversTitle['en']}
                covesArr={covesArr['en']}
                reset={reset['en']}
                view={view['en']}
                sort={partSlugDeTransform(sort)}
                type={partSlugDeTransform(type)}
                upholsterys={partSlugDeTransform(upholsterys)}
                cover={partSlugDeTransform(cover)}
                sortFilterTitle={sortFilterTitle['en']}
                setMobileFilterOpened={setMobileFilterOpened}
                isMobileFilterOpened={isMobileFilterOpened}
                setUpholsterys={(v) => { setUpholsterys(partSlugTransform(v)); window.scrollTo(0, 0) }}
                setCover={(v) => { setCover(partSlugTransform(v)); window.scrollTo(0, 0) }}
                setType={(v) => { setType(partSlugTransform(v)); window.scrollTo(0, 0) }}
                setSort={(v) => { setSort(partSlugTransform(v)); window.scrollTo(0, 0) }}
                clearAll={clearAll}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSearch={setSearch}
                setOpenedFilter={setOpenedFilter}
                openedFilter={openedFilter}
            />
            <Title small={true} title={name} />
            <Container className="content-wrap">
                <ActiveFilters>
                    {type !== 'All' && (
                        <FilterItem onClick={() => { setType('All') }}>
                            {partSlugDeTransform(type)}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {upholsterys !== 'All' && (
                        <FilterItem onClick={() => { setUpholsterys('All') }}>
                            {partSlugDeTransform(upholsterys)}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {cover !== 'All' && (
                        <FilterItem onClick={() => { setCover('All') }}>
                            {partSlugDeTransform(cover)}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {search !== '' && (
                        <FilterItem onClick={() => { setSearch('') }}>
                            {searchFilterTitle['en']}{search}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {(type !== 'All' || cover !== 'All' || upholsterys !== 'All') && (
                        <FilterItem onClick={() => { clearAll('') }} className="close">
                            {clearAllTitle['en']}
                            <CloseButton />
                        </FilterItem>
                    )}
                </ActiveFilters>
                {filtredProducts.length > 0
                    ? <ProductList setRerender={setRerender} showCount={showCount} setShowCount={setShowCount} rerender={rerender} products={filtredProducts} />
                    : (
                        <NoResults>
                            <h2>{noResultTitle['en']}</h2>
                            <p>{noResultMessage['en']}</p>
                        </NoResults>
                    )}
            </Container>
        </Wrapper>
    )
}

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

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding:  0 0 86px 0;
    position: relative;
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));

    .button{
        margin-top: 42px;
    }

    @media (max-width: 640px) {
        
    }
`

const ActiveFilters = styled.div`
    margin: 20px 0;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

const FilterItem = styled.button`
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
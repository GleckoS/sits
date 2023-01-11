import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { FilterComponent } from "../organism/materials-filter"
import { MaterialList } from "../organism/materials-list"
import { CloseButton } from "../atoms/close-button"
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

const colorRange = {
    en: [
        {
            name: 'All Colors', val: 'All'
        },
        {
            name: 'Natural', val: "natural"
        },
        {
            name: 'Light Grey', val: "lightGrey"
        },
        {
            name: 'Dark Grey', val: 'darkGrey'
        },
        {
            name: 'Blue', val: "blue"
        },
        {
            name: 'Green', val: "green"
        },
        {
            name: 'Brown', val: "brown"
        },
        {
            name: 'Sunset', val: "sunset"
        }
    ]
}

const texturesArr = {
    en: [
        {
            name: 'All Textures', val: 'All'
        },
        {
            name: 'Plain', val: 'Plain'
        },
        {
            name: 'Chunky Structure', val: 'Structure'
        },
        {
            name: 'Velvet', val: 'Velvet'
        },
        {
            name: 'Leather', val: 'Leather'
        },
        {
            name: 'Chenille', val: 'Chenille'
        }
    ]
}

const featuresArr = {
    en: [
        {
            name: 'All Features', val: 'All'
        },
        {
            name: 'Washable', val: 'Washable'
        },
        {
            name: 'Eco-Friendly', val: 'Eco-Friendly'
        },
        {
            name: 'Natural', val: 'Natural'
        },
        {
            name: 'Easy to Clean', val: 'Easy to Clean'
        },
        {
            name: 'Pet-Friendly', val: 'Pet-Friendly'
        },
        {
            name: 'Outdoor', val: 'Outdoor'
        }
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

const colorRangeTitle = {
    en: 'Color Range'
}

const texturesTitle = {
    en: 'Textures'
}

const featuresTitle = {
    en: 'Features'
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

export default function MaterialsArchive({ location, materials }) {
    const [sort, setSort] = useQueryParamString('sort', 'Popular')
    const [color, setColor] = useQueryParamString('color', 'All')
    const [textures, setTextures] = useQueryParamString('textures', 'All')
    const [features, setFeatures] = useQueryParamString('features', 'All')
    const [search, setSearch] = useQueryParamString('search', '')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (location.search === '') {
            if (sort === 'Popular') {
                setSort('Popular')
            }
            if (color === 'All') {
                setColor('All')
            }
            if (textures === 'All') {
                setTextures('All')
            }
            if (features === 'All') {
                setFeatures('All')
            }
            if (search !== '') {
                setSearch('')
            }
        }
    }, [location])

    const [isMobileFilterOpened, setMobileFilterOpened] = useState(false)

    const clearAll = () => {
        setColor("All")
        setTextures("All")
        setFeatures("All")
    }

    const filtredProducts = useMemo(() => {
        let arr = [...materials]
        let locSort = partSlugDeTransform(sort)
        let locColor = partSlugDeTransform(color)
        let locTextures = partSlugDeTransform(textures)
        let locFeatures = partSlugDeTransform(features)

        if (search !== '') {
            arr = arr.filter(el => el.slug.includes(search.toLowerCase()))
        }

        if (locColor !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.materials.materialColorVariants.every(inEl => {
                    if (inEl.colorGroup === locColor) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (locTextures !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.textures.nodes.every(inEl => {
                    if (inEl.name === locTextures) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (locFeatures !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.features.nodes.every(inEl => {

                    if (inEl.name === locFeatures) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (locSort === 'Popular') {
            let filtrArr = []
            arr.forEach(el => {
                if (el.materials.generalMaterialInformationCopy.isPopular) {
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
                if (el.materials.generalMaterialInformationCopy.isNewArrival) {
                    filtrArr.unshift(el)
                } else {
                    filtrArr.push(el)
                }
            })
            arr = filtrArr
        }
        if (locSort === 'Alphabetical') {
            arr.sort((a, b) => a.title.localeCompare(b.title))
        }
        return arr
    }, [materials, sort, color, textures, features, search])

    const [showCount, setShowCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024 ? 6 : 8
        }

        return 8
    })

    useEffect(() => {
        setShowCount(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo(0, 0);
                return window.innerWidth < 1024 ? 6 : 8
            }

            return 8
        })
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
                view={view['en']}
                reset={reset['en']}
                featuresTitle={featuresTitle['en']}
                texturesTitle={texturesTitle['en']}
                colorRangeTitle={colorRangeTitle['en']}
                sortByTitle={sortByTitle['en']}
                filterTitle={filterTitle['en']}
                sortFilterTitle={sortFilterTitle['en']}
                sortBy={sortBy['en']}
                colorRange={colorRange['en']}
                texturesArr={texturesArr['en']}
                featuresArr={featuresArr['en']}
                setSort={(v) => { setSort(partSlugTransform(v)) }}
                setColor={(v) => { setColor(partSlugTransform(v)) }}
                setTextures={(v) => { setTextures(partSlugTransform(v)) }}
                setFeatures={(v) => { setFeatures(partSlugTransform(v)) }}
                setMobileFilterOpened={setMobileFilterOpened}
                sort={partSlugDeTransform(sort)}
                color={partSlugDeTransform(color)}
                textures={partSlugDeTransform(textures)}
                features={partSlugDeTransform(features)}
                isMobileFilterOpened={isMobileFilterOpened}
                clearAll={clearAll}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSearch={setSearch}
            />
            <Title small={true} title={'Materials'} />
            <Container>
                <ActiveFilters>
                    {color !== 'All' && (
                        <FilterItem onClick={() => { setColor('All') }}>
                            {/* replace capital letters with space and small letter because of bug in wp */}
                            {partSlugDeTransform(color.replace(/([A-Z])/g, ' $1').trim())}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {textures !== 'All' && (
                        <FilterItem onClick={() => { setTextures('All') }}>
                            {partSlugDeTransform(textures)}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {features !== 'All' && (
                        <FilterItem onClick={() => { setFeatures('All') }}>
                            {partSlugDeTransform(features)}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {(color !== 'All' || textures !== 'All' || features !== 'All') && (
                        <FilterItem onClick={() => { clearAll('') }} className="close">
                            {clearAllTitle['en']}
                            <CloseButton />
                        </FilterItem>
                    )}
                    {search !== '' && (
                        <FilterItem onClick={() => { setSearch('') }}>
                            {searchFilterTitle['en']}{search}
                            <CloseButton />
                        </FilterItem>
                    )}
                </ActiveFilters>
                {filtredProducts.length > 0
                    ? <MaterialList showCount={showCount} setShowCount={setShowCount} color={color} materials={filtredProducts} />
                    : <NoResults>
                        <h2>{noResultTitle['en']}</h2>
                        <p>{noResultMessage['en']}</p>
                    </NoResults>
                }
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
    margin-bottom: calc(-1 * clamp(45px, ${120 / 1194 * 100}vw, 160px));

    .button{
        margin: 0 auto;
        margin-top: 40px;
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
    text-transform: capitalize;

    button{
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
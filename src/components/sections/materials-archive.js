import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { FilterComponent } from "../organism/materials-filter"
import { MaterialList } from "../organism/materials-list"
// import Hero from "../organism/hero-material-archive"
import { CloseButton } from "../atoms/close-button"
import { useRef } from "react"
import { useEffect } from "react"

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

export default function MaterialsArchive({ data, materials }) {

    const [sort, setSort] = useState(() => {
        return 'Popular'
    })
    const [color, setColor] = useState(() => {
        return 'All'
    })
    const [textures, setTextures] = useState(() => {
        return 'All'
    })
    const [features, setFeatures] = useState(() => {
        return 'All'
    })

    const [isMobileFilterOpened, setMobileFilterOpened] = useState(false)

    const clearAll = () => {
        setColor("All")
        setTextures("All")
        setFeatures("All")
    }
    const filtredProducts = useMemo(() => {
        let arr = [...materials]
        if (color !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.materials.materialColorVariants.every(inEl => {
                    if (inEl.colorGroup === color) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (textures !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.textures.nodes.every(inEl => {
                    if (inEl.name === textures) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (features !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.features.nodes.every(inEl => {
                    if (inEl.name === features) {
                        isAccessed = true
                        return false
                    }
                    return true
                })
                return isAccessed
            })
        }
        if (sort === 'Popular') {
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
        if (sort === 'New Arrivals') {
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
        if (sort === 'Alphabetical') {
            arr.sort((a, b) => a.title.localeCompare(b.title))
        }
        return arr
    }, [materials, sort, color, textures, features])

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
                setSort={setSort}
                setColor={setColor}
                setTextures={setTextures}
                setFeatures={setFeatures}
                setMobileFilterOpened={setMobileFilterOpened}
                sort={sort}
                color={color}
                textures={textures}
                features={features}
                isMobileFilterOpened={isMobileFilterOpened}
                clearAll={clearAll}
            />
            {/* <Hero data={data.heroM} /> */}
            <Container>
                <ActiveFilters>
                    {color !== 'All' && (
                        <FilterItem>
                            {color.replace(/([A-Z])/g, ' $1').trim()}
                            <CloseButton func={setColor} val={'All'} />
                        </FilterItem>
                    )}
                    {textures !== 'All' && (
                        <FilterItem>
                            {textures.replace(/([A-Z])/g, ' $1').trim()}
                            <CloseButton func={setTextures} val={'All'} />
                        </FilterItem>
                    )}
                    {features !== 'All' && (
                        <FilterItem>
                            {features.replace(/([A-Z])/g, ' $1').trim()}
                            <CloseButton func={setFeatures} val={'All'} />
                        </FilterItem>
                    )}
                    {(color !== 'All' || textures !== 'All' || features !== 'All') && (
                        <FilterItem className="close">
                            {clearAllTitle['en']}
                            <CloseButton func={clearAll} val={''} />
                        </FilterItem>
                    )}
                </ActiveFilters>
                <MaterialList showCount={showCount} setShowCount={setShowCount} color={color} materials={filtredProducts} />
            </Container>
        </Wrapper>
    )
}

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
    min-height: 44px;
    margin: 20px 0;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

const FilterItem = styled.div`
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
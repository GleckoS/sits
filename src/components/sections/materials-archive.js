import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { FilterComponent } from "../organism/materials-filter"
import { MaterialList } from "../organism/materials-list"
import Hero from "../organism/hero-material-archive"
import { CloseButton } from "../atoms/close-button"

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
            name: 'Natural', val: "natural: Natural"
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
        let arr = materials
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
        return arr
    }, [materials, sort, color, textures, features])


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
            <Hero data={data.heroM} />
            <Container>
                <ActiveFilters>
                    {color !== 'All' && (
                        <FilterItem>
                            {color}
                            <CloseButton func={setColor} val={'All'} />
                        </FilterItem>
                    )}
                    {textures !== 'All' && (
                        <FilterItem>
                            {textures}
                            <CloseButton func={setTextures} val={'All'} />
                        </FilterItem>
                    )}
                    {features !== 'All' && (
                        <FilterItem>
                            {features}
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
                <MaterialList color={color} materials={filtredProducts} />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding:  0 15px 86px 15px;
    position: relative;

    @media (max-width: 1800px) {
        padding:  0 0 86px 0;
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
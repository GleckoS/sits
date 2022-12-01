import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { ProductList } from "../organism/products-list"
import { Container } from "../atoms/container"
import { CloseButton } from './../atoms/close-button'
import { FilterComponent } from "../organism/products-filter"

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

const allTypes = {
    en: [
        {
            name: 'All Types', val: 'All'
        },
        {
            name: 'Armchairs', val: 'Armchairs'
        },
        {
            name: 'Coffee tables', val: 'Coffee tables'
        },
        {
            name: 'Dining chairs', val: 'Dining chairs'
        },
        {
            name: 'Footstools', val: 'Footstools'
        },
        {
            name: 'Outdoor furnitures', val: 'Outdoor furnitures'
        },
        {
            name: 'Sofas', val: 'Sofas'
        },
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
            name: 'All Upholsterys', val: 'All'
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
    en: 'Type'
}

const upholsterysTitle = {
    en: 'Upholsterys'
}

const coversTitle = {
    en: 'Cover Types'
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

export default function ProductArchive({ pageContext: { typeSlug, name }, products }) {
    const [sort, setSort] = useState(() => {
        return 'Popular'
    })
    const [type, setType] = useState(() => {
        return 'All'
    })
    const [cover, setCover] = useState(() => {
        return 'All'
    })
    const [upholsterys, setUpholsterys] = useState(() => {
        return 'All'
    })

    const [isMobileFilterOpened, setMobileFilterOpened] = useState(false)

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
        let arr = defaultPosts
        if (type !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.types.nodes.forEach(inEl => {
                    if (inEl.name.toLowerCase() === type.toLowerCase()) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }
        if (cover !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.products.collection.covers?.nodes?.forEach(inEl => {
                    if (inEl.name === cover) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }
        if (upholsterys !== 'All') {
            arr = arr.filter(el => {
                let isAccessed = false
                el.products.collection.upholsterys?.nodes?.forEach(inEl => {
                    if (inEl.name.includes(upholsterys)) {
                        isAccessed = true
                    }
                })
                return isAccessed
            })
        }

        return arr
    }, [defaultPosts, sort, type, cover, upholsterys])
    return (
        <Wrapper>
            <FilterComponent
                filterTitle={filterTitle['en']}
                sortByTitle={sortByTitle['en']}
                sortBy={sortBy['en']}
                allTypes={allTypes['en']}
                name={name}
                typeTitle={typeTitle['en']}
                sofasTypes={sofasTypes['en']}
                upholsterysTitle={upholsterysTitle['en']}
                upholsterysArr={upholsterysArr['en']}
                coversTitle={coversTitle['en']}
                covesArr={covesArr['en']}
                reset={reset['en']}
                view={view['en']}
                sort={sort}
                type={type}
                upholsterys={upholsterys}
                cover={cover}
                sortFilterTitle={sortFilterTitle['en']}
                setMobileFilterOpened={setMobileFilterOpened}
                isMobileFilterOpened={isMobileFilterOpened}
                setUpholsterys={setUpholsterys}
                setCover={setCover}
                setType={setType}
                setSort={setSort}
                clearAll={clearAll}
            />
            <Container className="content-wrap">
                <ActiveFilters>
                    {cover !== 'All' && (
                        <FilterItem>
                            {cover}
                            <CloseButton func={setCover} val={cover} />
                        </FilterItem>
                    )}
                    {type !== 'All' && (
                        <FilterItem>
                            {type}
                            <CloseButton func={setType} val={'All'} />
                        </FilterItem>
                    )}
                    {upholsterys !== 'All' && (
                        <FilterItem>
                            {upholsterys}
                            <CloseButton func={setUpholsterys} val={'All'} />
                        </FilterItem>
                    )}
                    {(type !== 'All' || cover !== 'All' || upholsterys !== 'All') && (
                        <FilterItem className="close">
                            {clearAllTitle['en']}
                            <CloseButton func={clearAll} val={''} />
                        </FilterItem>
                    )}
                </ActiveFilters>
                <ProductList products={filtredProducts} />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding:  0 0 86px 0;
    position: relative;

    @media (max-width: 640px) {
        
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
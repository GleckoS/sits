import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { ProductList } from "../organism/products-list"
import { Container } from "../atoms/container"
import { CloseButton } from './../atoms/close-button'

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

    const clearAll = () => {
        setCover(['All'])
        setType('All')
    }

    const defaultPosts = useMemo(() => {
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
            <Filter>
                <Container className="container">
                    <DropDown>
                        <div className="control">
                            <span>
                                Sort by: {sort}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                                <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" stroke-width="2" />
                            </svg>
                        </div>
                        <div className="content">
                            <label>
                                <span>
                                    Popular
                                </span>
                                <input readOnly checked={sort === 'Popular'} onClick={() => { setSort('Popular') }} name='sort' defaultChecked type='radio' />
                            </label>
                            <label >
                                <span>
                                    Alphabetical
                                </span>
                                <input readOnly checked={sort === 'Alphabetical'} onClick={() => { setSort('Alphabetical') }} name='sort' type='radio' />
                            </label>
                            <label >
                                <span>
                                    New Arrivals
                                </span>
                                <input readOnly checked={sort === 'New Arrivals'} onClick={() => { setSort('New Arrivals') }} name='sort' type='radio' />
                            </label>
                        </div>
                    </DropDown>
                    {name === 'Sofas'
                        ? <DropDown>
                            <div className="control">
                                <span>
                                    Type
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                                    <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" stroke-width="2" />
                                </svg>
                            </div>
                            <div className="content">
                                <label >
                                    <span>
                                        All Types
                                    </span>
                                    <input readOnly checked={type === 'All'} onClick={() => { setType('All') }} name='type' defaultChecked type='radio' />
                                </label>
                                <label >
                                    <span>
                                        Regular Sofas
                                    </span>
                                    <input readOnly checked={type === 'Regular Sofas'} onClick={() => { setType('Regular Sofas') }} name='type' type='radio' />
                                </label>
                                <label >
                                    <span>
                                        Sofa Beds
                                    </span>
                                    <input readOnly checked={type === 'Sofa Beds'} onClick={() => { setType('Sofa Beds') }} name='type' type='radio' />
                                </label>
                                <label >
                                    <span>
                                        Corner Sofas
                                    </span>
                                    <input readOnly checked={type === 'Corner Sofas'} onClick={() => { setType('Corner Sofas') }} name='type' type='radio' />
                                </label>
                                <label >
                                    <span>
                                        Modular Systems
                                    </span>
                                    <input readOnly checked={type === 'Modular Systems'} onClick={() => { setType('Modular Systems') }} name='type' type='radio' />
                                </label>
                            </div>
                        </DropDown>
                        : null}
                    <DropDown>
                        <div className="control">
                            <span>
                                Upholsterys
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                                <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" stroke-width="2" />
                            </svg>
                        </div>
                        <div className="content">
                            <label >
                                <span>
                                    All Upholsterys
                                </span>
                                <input readOnly onClick={() => { setUpholsterys('All') }} checked={upholsterys === 'All'} name='upholsterys' defaultChecked type='radio' />
                            </label>
                            <label >
                                <span>
                                    Fabric
                                </span>
                                <input readOnly onClick={() => { setUpholsterys('Fabric') }} checked={upholsterys === 'Fabric'} name='upholsterys' type='radio' />
                            </label>
                            <label >
                                <span>
                                    Leather
                                </span>
                                <input readOnly onClick={() => { setUpholsterys('Leather') }} checked={upholsterys === 'Leather'} name='upholsterys' type='radio' />
                            </label>
                        </div>
                    </DropDown>
                    <DropDown>
                        <div className="control">
                            <span>
                                Cover Types
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                                <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" stroke-width="2" />
                            </svg>
                        </div>
                        <div className="content">
                            <label >
                                <span>
                                    All Cover Types
                                </span>
                                <input readOnly onClick={() => { setCover('All') }} checked={cover === 'All'} name='cover' defaultChecked type='radio' />
                            </label>
                            <label >
                                <span>
                                    Fixed
                                </span>
                                <input readOnly onClick={() => { setCover('Fixed') }} checked={cover === 'Fixed'} name='cover' type='radio' />
                            </label>
                            <label >
                                <span>
                                    Removable
                                </span>
                                <input readOnly onClick={() => { setCover('Removable') }} checked={cover === 'Removable'} name='cover' type='radio' />
                            </label>
                        </div>
                    </DropDown>
                </Container>
            </Filter>
            <Container>
                <ActiveFilters>
                    {cover !== 'All' ? (
                        <>
                            <FilterItem>
                                {cover}
                                <CloseButton func={setCover} val={cover} />
                            </FilterItem>
                        </>
                    ) : null}
                    {type !== 'All'
                        ? (
                            <FilterItem>
                                {type}
                                <CloseButton func={setType} val={'All'} />
                            </FilterItem>
                        )
                        : null}
                    {upholsterys !== 'All'
                        ? (
                            <FilterItem>
                                {upholsterys}
                                <CloseButton func={setUpholsterys} val={'All'} />
                            </FilterItem>
                        )
                        : null}
                    {type !== 'All' || cover !== 'All' || upholsterys !== 'All'
                        ? (
                            <FilterItem className="close">
                                Clear all filters
                                <CloseButton func={clearAll} val={''} />
                            </FilterItem>
                        ) : null}
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
`

const Filter = styled.div`
    position: sticky;
    z-index: 101;
    top: 109px;
    left: 0;
    right: 0;
    height: 107px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;

    .container{
        display: flex;
        gap: 120px;
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
const DropDown = styled.div`
    width: 267px;
    padding: 22px;
    margin: 22px -22px 0 -22px;
    border: 1px solid transparent;

    .control{
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 300;
        font-size: 24px;
    }

    .content{
        opacity: 0;
        pointer-events: none;
        height: 0;

        label{
            cursor: pointer;
            margin-top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 300;
            font-size: 18px;
        }
    }

    &:hover{
        background-color: #fff;
        border: 1px solid #ccc;
        .content{
            opacity: 1;
        height: auto;
            pointer-events: all;

            label{
                margin-top: 20px;
            }
        }
    }
`
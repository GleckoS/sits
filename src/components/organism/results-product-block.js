import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Card } from "../moleculas/search-product-card"

const loadMore = 'LOAD MORE'

export const ResultProductBlock = ({ count, setCount, prefiltredArr, searchValue, title }) => {

    const filtredArr = useMemo(() => {
        let arr = prefiltredArr.nodes
        if (searchValue) {
            arr = arr.filter(el => {
                const filterByTitle = el.products.collection.title.toLowerCase().includes(searchValue.toLowerCase())
                let filterByName = false
                let filtredByType = false

                el.products.productGallery?.forEach(el => {
                    if (el.popupNames.model.toLowerCase().includes(searchValue.toLowerCase())) {
                        filterByName = true
                    }
                })

                el.types.nodes?.forEach(el => {
                    if (el.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        filtredByType = true
                    }
                })

                return filterByTitle || filterByName || filtredByType
            })

            let itemsCount = 0
            arr.forEach(el => {
                el.products.productGallery.forEach(inEl => {
                    inEl.productsImages.forEach(imageEl => {
                        if (imageEl.isMainImage && el.products.collection?.slug) {
                            itemsCount += 1
                        }
                    })
                })
            })
            setCount(itemsCount)

            return arr
        }
        return []
    }, [prefiltredArr, searchValue, setCount])

    const [showCount, setShowCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1194 ? 6 : 8
        }

        return 8
    })
    const [addCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1194 ? 6 : 8
        }

        return 8
    })

    const renderCount = useRef(0)

    if (filtredArr.length > 0) {
        renderCount.current = 0
        return (
            <Wrapper>
                <h2>{title}</h2>
                <ResultsGrid>
                    {filtredArr?.map(el => {
                        return el.products.productGallery?.map(inEl => {
                            return inEl.productsImages?.map(imageEl => {
                                if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < showCount) {
                                    renderCount.current += 1
                                    return <Card image={imageEl.featuredProductImage} data={el.products.collection} />
                                }
                                return null
                            })
                        })
                    })}
                </ResultsGrid>
                {count > showCount && (
                    <button className="button" onClick={() => { setShowCount(showCount + addCount) }}>{loadMore}</button>
                )}
            </Wrapper>
        )
    }

    return null
}

const Wrapper = styled.div`
    padding-top: 120px;

    &:first-child{
        padding-top: 60px;
    }

    h2{
        margin-bottom: 40px;
        font-family: 'Ivy';
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        text-decoration: underline;
    }

    .button{
        margin-top: 42px;
    }

`

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 42px 16px;

    @media (max-width: 1194px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 26px 12px;
    }

    @media (max-width: 340px) {
        grid-template-columns: 1fr;
    }
`
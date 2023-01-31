import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { ResultsGrid } from "../atoms/result-grid"
import { Card } from "../moleculas/search-product-card"

export const ResultProductBlock = ({ setRerender, rerender, count, setCount, prefiltredArr, searchValue, title }) => {

    const filtredArr = useMemo(() => {
        let arr = prefiltredArr.nodes
        if (searchValue) {
            arr = arr.filter(el => {
                let filterByTitle = false
                let filterByName = false
                let filtredByType = false

                if (el.products.collection) {
                    filterByTitle = el.products.collection.title.toLowerCase().includes(searchValue.toLowerCase())
                }

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
                                    return <Card setRerender={setRerender} rerender={rerender} image={imageEl.featuredProductImage} data={el.products.collection} model={inEl.popupNames.model} />
                                }
                                return null
                            })
                        })
                    })}
                </ResultsGrid>
                {count > showCount && (
                    <LoadMore count={addCount} onClick={() => { setShowCount(showCount + addCount) }} />
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
    }

    .button{
        margin-top: 42px;
    }

`
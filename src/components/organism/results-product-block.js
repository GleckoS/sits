import { motion } from "framer-motion"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { ResultsGrid } from "../atoms/result-grid"
import { Card } from "../moleculas/search-product-card"
import InView from "../sections/in-view-provider"

export const ResultProductBlock = ({
    contentGridAnimation,
    contentTitleAnimation,
    animation,
    setRerender,
    rerender,
    count,
    setCount,
    prefiltredArr,
    searchValue,
    title
}) => {

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
                        el.productsImages.every(inEl => {
                            if (inEl.isMainImage) {
                                filterByName = true
                                return false
                            }
                            return true
                        })

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
            <InView>
                <Wrapper variants={animation}>
                    <motion.h2 variants={contentTitleAnimation}>{title}</motion.h2>
                    <ResultsGrid variants={contentGridAnimation}>
                        {filtredArr?.map(el => {
                            return el.products.productGallery?.map(inEl => {
                                return inEl.productsImages?.map((imageEl, index) => {
                                    if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < showCount) {
                                        renderCount.current += 1
                                        return <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: .6 }}
                                            key={inEl.popupNames.model + index}>
                                            <Card setRerender={setRerender} rerender={rerender} image={imageEl.featuredProductImage} data={el.products.collection} model={inEl.popupNames.model} />
                                        </motion.div>
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
            </InView>
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
        font-size: clamp(23px, ${36 / 1194 * 100}vw, 36px);
        font-weight: 300;
    }

    .button{
        margin-top: 42px;
    }

`
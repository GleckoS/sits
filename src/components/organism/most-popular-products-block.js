import { motion } from "framer-motion"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { ResultsGrid } from "../atoms/result-grid"
import { Card } from "../moleculas/search-product-card"
import InView from "../sections/in-view-provider"

export const MostPopularProductBlock = ({
    contentGridAnimation,
    contentTitleAnimation,
    animation,
    setRerender,
    rerender,
    prefiltredArr,
    title }) => {

    const sortedArr = useMemo(() => {
        let filtrArr = [...prefiltredArr.nodes]

        filtrArr.sort((a, b) => {
            return a.products?.collection?.collections?.generalCollectionInformation?.popularImportanceIndex - b.products?.collection?.collections?.generalCollectionInformation?.popularImportanceIndex
        })
        return filtrArr
    }, [prefiltredArr])

    const [showCount] = useState(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 1194)
                if (window.innerWidth < 640)
                    return 4
                else
                    return 3
            else
                return 4
        }

        return 4
    })

    const renderCount = useRef(0)
    if (prefiltredArr.nodes.length > 0) {
        renderCount.current = 0
        return (
            <InView>
                <Wrapper variants={animation}>
                    <motion.h2 variants={contentTitleAnimation}>{title['en']}</motion.h2>
                    <ResultsGrid variants={contentGridAnimation}>
                        {sortedArr.map(el => {
                            let isOneElementRendered = false
                            return el.products.productGallery?.map(inEl => {
                                return inEl.productsImages?.map((imageEl, index) => {
                                    if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < showCount && !isOneElementRendered) {
                                        renderCount.current += 1
                                        isOneElementRendered = true
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
                </Wrapper>
            </InView>
        )
    }

    return null
}

const Wrapper = styled(motion.div)`
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
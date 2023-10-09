import { AnimatePresence, motion, useInView } from "framer-motion"
import React, { useEffect } from "react"
import { useRef } from "react"
import styled from "styled-components"
import { ProductCard } from "../moleculas/product-card"

export const ProductList = ({ language, itemKey, changeType, setRerender, setPage, page, rerender, products }) => {
    const renderCount = useRef(0)
    const isAllRendered = useRef(true)
    renderCount.current = 0

    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        if(isInView && !isAllRendered.current) {
            setPage(+page + 1)
        }
    }, [isInView])

    return (
        <>
            <Wrapper key='wrapper'>
                <AnimatePresence mode='popLayout'>
                    {products?.map(el => {
                        return el.products.productGallery?.map((inEl, i) => {
                            return inEl.productsImages?.map((imageEl, index) => {
                                if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < page * 8) {
                                    renderCount.current += 1
                                    isAllRendered.current = true
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: .4 } }}
                                            exit={{ opacity: 0, transition: { duration: .3 } }}
                                            key={inEl.popupNames.model + index + imageEl.featuredProductImage.id + itemKey}>
                                            <ProductCard language={language} categoryClick={changeType} setRerender={setRerender} rerender={rerender} model={inEl.popupNames.model} types={el.products.collection?.types?.nodes} data={el.products.collection} image={imageEl.featuredProductImage} />
                                        </motion.div>
                                    )
                                } else if (imageEl.isMainImage && isAllRendered && renderCount.current >= page * 8) {
                                    isAllRendered.current = false
                                }
                                return null
                            })
                        })
                    })}
                </AnimatePresence>
            </Wrapper>
            <div ref={ref} />
        </>
    )
}

const Wrapper = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px 20px;

    @media (max-width: 600px) {
        margin: 0 -12px;
        grid-gap: 24px 12px;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`
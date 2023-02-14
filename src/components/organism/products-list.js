import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { useRef } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { ProductCard } from "../moleculas/product-card"

export const ProductList = ({ changeType, setRerender, setPage, page, rerender, products }) => {
    const renderCount = useRef(0)
    const isAllRendered = useRef(true)
    renderCount.current = 0
    return (
        <AnimatePresence mode='wait'>
            <Wrapper>
                {products?.map(el => {
                    return el.products.productGallery?.map(inEl => {
                        return inEl.productsImages?.map((imageEl, index) => {
                            if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < page * 8) {
                                renderCount.current += 1
                                isAllRendered.current = true
                                return <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{duration: .6}}
                                    key={inEl.popupNames.model + index}>
                                    <ProductCard categoryClick={changeType} setRerender={setRerender} rerender={rerender} model={inEl.popupNames.model} types={el.products.collection?.types?.nodes} data={el.products.collection} image={imageEl.featuredProductImage} />
                                </motion.div>
                            } else if (isAllRendered && renderCount.current >= page * 8) {
                                isAllRendered.current = false
                            }
                            return null
                        })
                    })
                })}
            </Wrapper>
            {isAllRendered.current
                ? null
                : <LoadMore onClick={() => { setPage(+page + 1) }} />}
        </AnimatePresence>
    )
}

const Wrapper = styled.div`
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
import React, { useMemo } from "react"
import { useState } from "react"
import { useRef } from "react"
import styled from "styled-components"
import { ProductCard } from "../moleculas/product-card"

const loadMore = {
    en: 'LOAD MORE'
}

export const ProductList = ({ setRerender, setPage, page, rerender, products }) => {
    const renderCount = useRef(0)
    const isAllRendered = useRef(true)
    renderCount.current = 0
    return (
        <>
            <Wrapper>
                {products?.map(el => {
                    return el.products.productGallery?.map(inEl => {
                        return inEl.productsImages?.map((imageEl, index) => {
                            if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < page * 8) {
                                renderCount.current += 1
                                isAllRendered.current = true
                                return <React.Fragment key={inEl.popupNames.model + index}><ProductCard setRerender={setRerender} rerender={rerender} model={inEl.popupNames.model} types={el.products.collection?.types?.nodes} data={el.products.collection} image={imageEl.featuredProductImage} /></React.Fragment>
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
                : <button className="button" onClick={() => { setPage(+page + 1) }}>{loadMore['en']}</button>}
        </>
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
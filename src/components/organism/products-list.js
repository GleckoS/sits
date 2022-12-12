import React from "react"
import { useState } from "react"
import { useRef } from "react"
import styled from "styled-components"
import { ProductCard } from "../moleculas/product-card"

const loadMore = {
    en: 'LOAD MORE'
}

export const ProductList = ({ setShowCount, showCount, rerender, products }) => {


    const [addCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024 ? 6 : 8
        }

        return 8
    })
    const renderCount = useRef(0)

    renderCount.current = 0
    return (
        <>
            <Wrapper>
                {products?.map(el => {
                    return el.products.productGallery?.map(inEl => {
                        return inEl.productsImages?.map(imageEl => {
                            if (imageEl.isMainImage && el.products.collection?.slug && renderCount.current < showCount) {
                                renderCount.current += 1
                                return <ProductCard rerender={rerender} model={inEl.popupNames.model} types={el.products.collection?.types?.nodes} data={el.products.collection} image={imageEl.featuredProductImage} />
                            }
                            return null
                        })
                    })
                })}
            </Wrapper>
            {showCount < products.length
                ? <button className="button" onClick={() => { setShowCount(showCount + addCount) }}>{loadMore['en']}</button>
                : null}
        </>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px 20px;

    @media (max-width: 600px) {
        margin: 0 -12px;
    }

    @media (max-width: 380px) {
        grid-template-columns: 1fr;
    }
`
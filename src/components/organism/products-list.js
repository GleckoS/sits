import React from "react"
import styled from "styled-components"
import { ProductCard } from "../moleculas/product-card"

export const ProductList = ({ rerender, products }) => (
    <Wrapper>
        {products?.map(el => {
            return el.products.productGallery?.map(inEl => {
                return inEl.productsImages?.map(imageEl => {
                    if (imageEl.isMainImage && el.products.collection?.slug) {
                        return <ProductCard rerender={rerender} model={inEl.popupNames.model} types={el.products.collection?.types?.nodes} data={el.products.collection} image={imageEl.featuredProductImage} />
                    }
                    return null
                })
            })
        })}
    </Wrapper>
)

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
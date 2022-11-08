import React from "react"
import styled from "styled-components"
import { ProductCard } from "../moleculas/product-card"

export const ProductList = ({ products }) => (
    <Wrapper>
        {products?.map(el => {
            return el.products.productGallery?.map(inEl => {
                return inEl.productsImages?.map(imageEl => {
                    if (imageEl.isMainImage) {
                        return <ProductCard types={el.types.nodes} data={el.products.collection} image={imageEl.featuredProductImage} />
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
`
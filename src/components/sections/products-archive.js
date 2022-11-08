import React from "react"
import styled from "styled-components"
import { ProductList } from "../organism/products-list"
import { Container } from "../atoms/container"

export const ProductArchive = ({ products }) => (
    <Wrapper>
        <Container>
            <div>
                {/* filter */}
            </div>
            <ProductList products={products} />
        </Container>
    </Wrapper>
)

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding: 86px 0;
`
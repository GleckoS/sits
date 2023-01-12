import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductList } from "../organism/products-list"

const title = {
    en: 'New Arrivals'
}

export default function Content({ data }) {

    const [showCount, setShowCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024 ? 6 : 8
        }

        return 8
    })

    const [rerender, setRerender] = useState(false)

    const products = useMemo(() => {
        return data.map(el => el.product)
    }, [data])

    return (
        <Wrapper>
            <h1>{title['en']}</h1>
            <Container>
                <List>
                    <ProductList setRerender={setRerender} rerender={rerender} showCount={showCount} setShowCount={setShowCount} products={products} />
                </List>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background-color: #F9F5F0;

    h1{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        padding: clamp(20px, ${75 / 1194 * 100}vw, 110px) 45px clamp(45px, ${75 / 1194 * 100}vw, 110px) 45px;
        background-color: #fff;

        @media (max-width: 768px) {
            padding: clamp(20px, ${75 / 1194 * 100}vw, 110px) 24px clamp(45px, ${75 / 1194 * 100}vw, 110px) 24px;
        }
    }

    .button{
        margin-top: 30px;
    }
`

const List = styled.div`
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));
    padding: 45px 0;
`
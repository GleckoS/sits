import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"

export default function SimilarProducts({ data }) {
    return (
        <Wrapper>
            <Container>
                <h2>
                    Similar products
                </h2>
                <Grid>
                    {data.map(el => (
                        <ProductCard data={el} />
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 80px 0 0 0;
    background-color: #F9F5F0;
    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        font-family: 'Ivy';
        text-decoration: underline;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    margin-top: 20px;
`
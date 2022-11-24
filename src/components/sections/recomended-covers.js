import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { MaterialCard } from "../moleculas/material-card"

export default function RecomendedCovers({ title, data: { covers } }) {
    return (
        <Wrapper>
            <Container>
                <h2>{'Recommended covers for '}{title}</h2>
                <Grid>
                    {covers.map(el => (
                        <MaterialCard data={el.cover} />
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 120px;
    padding: 40px 0 0 0;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 40px 0 0 0;

    @media (max-width: 864px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 40px 20px;
    }

    @media (max-width: 400px) {
        margin: 40px -12px 0 -12px;
    }

    @media (max-width: 389px) {
        grid-template-columns: 1fr;
        margin: 40px 0 0 0;
    }
    
`
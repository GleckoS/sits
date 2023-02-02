import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { MaterialCard } from "../moleculas/material-card"

export default function RecomendedCovers({ background, title, data: { covers } }) {
    return (
        <Wrapper className={background}>
            <Container>
                <h2>{title}</h2>
                <Grid>
                    {covers.map((el, index) => (
                        <React.Fragment key={el.cover.title + index}>
                            <MaterialCard variant={el.colorVariantName} data={el.cover} />
                        </React.Fragment>
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(60px, ${90 / 1194 * 100}vw, 120px);
    padding: 40px 0 0 0;
    background-color: #F9F5F0;
    
    &.white{
        background-color: #fff;
        padding-top: 60px;
        margin-top: 0;
    }

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

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
        margin: 40px 0 0 0;
    }
    
`
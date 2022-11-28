import React from "react"
import styled from "styled-components"
import { MaterialCard } from "../moleculas/material-card"

export const MaterialList = ({ materials, color }) => {

    return (
        <Wrapper>
            {materials?.map(el => (
                <MaterialCard color={color} data={el} />
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 40px 20px;
    margin: 0 0 80px 0;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 710px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 480px) {
        margin: 0 -12px;
        grid-gap: 32px 12px;
    }

    @media (max-width: 389px) {
        grid-template-columns: 1fr;
    }
`
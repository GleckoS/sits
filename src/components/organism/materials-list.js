import React from "react"
import styled from "styled-components"
import { MaterialCard } from "../moleculas/material-card"

export const MaterialList = ({ materials }) => {
    return (
        <Wrapper>
            {materials.map(el => (
                <MaterialCard data={el} />
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 80px 0;
`
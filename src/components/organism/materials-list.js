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
`
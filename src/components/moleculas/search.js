import React from "react"
import styled from "styled-components"
import { Input } from "./input"

export const Search = () => {
    return (
        <Wrapper>
            <Input placeholder="Search" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    input{
        font-weight: 300;
        font-size: 20px;
    }
`
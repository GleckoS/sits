import React from "react"
import styled from "styled-components"
import { Input } from "../atoms/input"

export const Search = () => {
    return (
        <Wrapper>
            <Input placeholder="Search" />
        </Wrapper>
    )
}

const Wrapper = styled.div`

`
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const Category = (props) => (
    <Wrapper {...props} >
        {props.children}
    </Wrapper>
)


const Wrapper = styled(Link)`
    padding: 3px 10px;
    background-color: var(--color-brown);
    color: #fff;
    font-size: clamp(11px, ${12 / 1194 * 100}vw, 15px);
    line-height: 166%;
    border-radius: 1000px;
    position: relative;
    z-index: 2;
    transition: background-color .4s ease-out;

    &:hover{
        background-color: #785836;
    }

    @media (max-width: 768px) {
        padding: 0;
        background-color: unset;
        color: #9c6325;
    }
`
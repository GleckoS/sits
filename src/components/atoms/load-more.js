import React from "react"
import styled from "styled-components"
import { loadMore } from "../../texts"

export const LoadMore = ({
    onClick = () => { },
    // count = 8
}) => (
    <Wrapper onClick={onClick} >
        {loadMore['en']}
    </Wrapper>
    //({count})  add after count system rework
)

const Wrapper = styled.button`
    width: fit-content;
    padding: 13px 46px;
    background-color: var(--color-brown);

    font-size: clamp(14px, ${18 / 1024 * 100}vw, 18px);
    text-transform: uppercase;
    color: #fff;
    border: none;
    margin: 32px auto 0 auto;
    display: block;
    cursor: pointer;
    transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1);

    &:hover{
        background-color: #785836;
    }

    &:active{
        background-color: #785836;
    }

    &:focus-visible{
        outline: 1px solid #88643D;
        outline-offset: 2px;
    }

    &:disabled{
        background: #CFCFCF;
    }
`
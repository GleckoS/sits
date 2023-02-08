import { Link } from "gatsby"
import styled from "styled-components"

export const BrownLink = styled(Link)`
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
    transition: background-color .4s ease-out;

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
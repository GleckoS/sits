import { Link } from "gatsby";
import styled from "styled-components";

export const Category = (props) => {
    debugger
}


const Wrapper = styled(Link)`
    padding: 3px 10px;
    background-color: var(--color-brown);
    color: #fff;
    font-size: clamp(11px, ${12 / 1194 * 100}vw, 15px);
    line-height: 166%;
    border-radius: 1000px;

    @media (max-width: 768px) {
        padding: 0;
        background-color: unset;
        color: #9c6325;
    }

`
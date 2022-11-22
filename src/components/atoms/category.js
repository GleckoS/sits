import styled from "styled-components";

export const Category = styled.div`
    padding: 3px 10px;
    background-color: var(--brown);
    color: #fff;
    font-size: clamp(10px, ${12 / 1194 * 100}vw, 15px);
    line-height: 166%;
    border-radius: 1000px;

    @media (max-width: 768px) {
        padding: 0;
        background-color: unset;
        color: #CEAD89;
    }
`
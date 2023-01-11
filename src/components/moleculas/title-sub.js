import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export const Title = ({ small, title }) => (
    <Wrapper className={small ? 'small' : ''}>
        <Container>
            <h1>{title}</h1>
        </Container>
    </Wrapper>
)

const Wrapper = styled.div`
    h1{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);
    }

    &.small{
        h1{
            text-decoration: underline;
            margin: 30px 0;
        }
    }
`
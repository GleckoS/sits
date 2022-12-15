import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Content({ data }) {
    return (
        <Wrapper>
            <Container>
                <div dangerouslySetInnerHTML={{ __html: data.text }} />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    h1,h2{
        font-size: 40px;
        font-family: 'Ivy';
        font-weight: 300;
        text-decoration: underline;
    }

    h3,h4,h5,h6{
        font-size: 28px;
        font-family: 'Ivy';
        font-weight: 300;
    }

    *{
        font-size: 18px;
        font-weight: 300;
    }
`
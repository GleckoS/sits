import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Accessories({ data }) {
    return (
        <Wrapper>
            <Container>
                <h2>
                    Accessories for this model
                </h2>
                <Grid>
                    {data.map(el => (
                        <Item>
                            <GatsbyImage image={el.accessoryImage.localFile.childImageSharp.gatsbyImageData} alt={el.accessoryImage.altText} />
                            <h3>{el.accessoryTitle}</h3>
                        </Item>
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 80px 0 0 0;
    background-color: #F9F5F0;
    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        font-family: 'Ivy';
        text-decoration: underline;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    margin-top: 20px;

    @media (max-width: 1024px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    @media (max-width: 389px) {
        grid-template-columns: 1fr;
    }
`

const Item = styled.div`
 @media (max-width: 1024px){
    width: 47%;
 }

 @media (max-width: 600px) {
    width: 45%;
 }

@media (max-width: 389px) {
    width: 100%;
}

    h3{
        font-size: clamp(16px, ${26 / 768 * 100}vw, 28px);
        font-weight: 300;
        margin-top: clamp(6px, ${16 / 1194 * 100}vw, 20px);
    }
`
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { Title } from "../moleculas/title-sub"


export default function CataloguesGrid({ data: { title, catalogues: { catalogues } } }) {
    return (
        <Wrapper>
            <Title title={title} />
            <Content>
                <Container>
                    <Grid>
                        {catalogues.map((el, index) => (
                            <Item key={index}>
                                <a href={el.catalogueFile?.localFile?.publicURL ? el.catalogueFile?.localFile?.publicURL : el.catalogueFile?.mediaItemUrl} target='_blank' rel="noreferrer noopener" download>
                                    <GatsbyImage image={el.cataloguePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.cataloguePreviewImage.altText} />
                                    <p className="underline">{el.catalogueTitle}</p>
                                </a>
                            </Item>
                        ))}
                    </Grid>
                </Container>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.section`
`

const Content = styled.div`
    background-color: #F9F5F0;
    padding: clamp(75px, ${80 / 1194 * 100}vw, 110px) 0 clamp(110px, ${160 / 1194 * 100}vw, 220px);
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 60px clamp(32px, ${40 / 1194 * 100}vw, 92px);
    max-width: 1530px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`

const Item = styled.div`
    p{
        margin-top: 24px;
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        text-transform: unset ;
    }

    &:hover{
        .underline{
            background-size: 100% 1px;
        }
    }
`
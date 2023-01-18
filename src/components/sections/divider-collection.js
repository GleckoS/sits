import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function DividerCollection({ data: { sectionTitle, text, link, squareImage, rectangularImageOnTheRight } }) {
    return (
        <Wrapper>
            <Container>
                <Grid>
                    <div className="content">
                        <div>
                            <h2 className="title">{sectionTitle}</h2>
                            {text && <p className="text">{text}</p>}
                            {link?.url && <Link className="link underline" to={link.url} target={link.target ? link.target : null}>{link.title}</Link>}
                        </div>
                        <GatsbyImage className="square" image={squareImage.localFile.childImageSharp.gatsbyImageData} alt={squareImage.altText} />
                    </div>
                    <GatsbyImage className="rectangle" image={rectangularImageOnTheRight.localFile.childImageSharp.gatsbyImageData} alt={rectangularImageOnTheRight.altText} />
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(45px, ${120 / 1200 * 100}vw, 120px);
    .rectangle{
        margin-top: 20px;

        @media (max-width: 1194px) {
            margin-top: 0;
        }

        @media (max-width: 768px) {
            margin: 0 -24px;
        }
    }

    .square{
        @media (max-width: 1194px) {
            display: none;
        }
    }

    .title{
        font-family: 'Ivy';
        font-weight: 300;
        font-size: clamp(28px, ${40 / 1194 * 100}vw, 40px);
        position: relative;
        text-decoration: underline;

        @media (max-width: 768px){
            text-align: center;
        }
    }

    .text{
        margin-top: clamp(20px, ${20 / 768 * 100}vw, 32px);
        max-width: 464px;
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;

        @media (max-width: 768px){
            text-align: center;
            margin: 0 auto;
            margin-top: clamp(20px, ${20 / 768 * 100}vw, 32px);
        }
    }

    .link{
        display: block;
        width: fit-content;
        font-size: 18px;
        margin-top: 40px;
        text-transform: uppercase;
        text-decoration: underline;

        @media (max-width: 768px){
            text-align: center;
            margin: 0 auto;
            margin-top: 24px;
            font-size: 16px;
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;

    @media (max-width: 1194px) {
        align-items: center;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-gap: 36px;
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        min-width: 300px;

        @media (max-width: 768px){
            min-width: unset;
        }
    }
`
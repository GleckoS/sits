import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { Title } from "../moleculas/title-sub"
import InView from "./in-view-provider"


const gridAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: .1, delayChildren: .3 } }
}

const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0% 1px' },
    animate: {
        opacity: 1,
        transition: { duration: .6 },
        transitionEnd: {
            backgroundSize: '80% 1px',
            transition: { duration: .6 }
        }
    }
}


export default function CataloguesGrid({ data: { title, catalogues: { catalogues } } }) {
    return (
        <InView>
            <Wrapper>
                <Title small={true} title={title} />
                <Content>
                    <Container>
                        <Grid variants={gridAnimation}>
                            {catalogues.map((el, index) => (
                                <Item key={index}>
                                    <a href={el.catalogueFile?.localFile?.publicURL ? el.catalogueFile?.localFile?.publicURL : el.catalogueFile?.mediaItemUrl} target='_blank' rel="noreferrer noopener" download>
                                        <motion.div variants={imageAnimation}>
                                            <GatsbyImage className="image" image={el.cataloguePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.cataloguePreviewImage.altText} />
                                        </motion.div>
                                        <motion.p variants={linkAnimation} className="underline">{el.catalogueTitle} <span>({el.catalogueFile?.localFile?.prettySize})</span></motion.p>
                                    </a>
                                </Item>
                            ))}
                        </Grid>
                    </Container>
                </Content>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
`

const Content = styled.div`
    background-color: #F9F5F0;
    padding: clamp(75px, ${80 / 1194 * 100}vw, 110px) 0 clamp(110px, ${160 / 1194 * 100}vw, 220px);
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));
`

const Grid = styled(motion.div)`
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
    a{
        display: block;
    }
    p{
        margin-top: 24px;
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        text-transform: unset ;
        padding-bottom: 0;
    }

    span{
        font-family: 'Gothic';
        font-size: 18px;
        white-space: nowrap;
    }

    .image{
        width: 100%;
        img{
            transition: transform .4s ease-in-out;
        }
    }

    a:hover{
        .image{
            img{
                transform: scale(1.04);
            }
        }
        .underline{
            background-size: 100% 1px !important;
        }
    }
`
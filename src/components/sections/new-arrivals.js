import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"

export default function NewArrivals({ data: { sectionTitle, text, chosenProducts } }) {
    return (
        <Wrapper>
            <Container>
                <h2 className="title">{sectionTitle}</h2>
                {text && <p className="text">{text}</p>}
                <Grid>
                    {chosenProducts?.map(el => {
                        let isOnePostRendered = false
                        return el.products.products.productGallery?.map(inEl => {
                            return inEl.productsImages?.map(imageEl => {
                                if (imageEl.isMainImage && !isOnePostRendered) {
                                    isOnePostRendered = true
                                    return <ProductCard types={el.products.products.collection.types.nodes} data={el.products.products.collection} image={imageEl.featuredProductImage} />
                                }
                                return null
                            })
                        })
                    })}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 160px;
    background-color: #F9F5F0;
    padding: clamp(40px, ${80 / 768 * 100}vw, 80px) 0;

    .title{
        font-family: 'Ivy';
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        text-decoration: underline;
        text-align: center;
    }

    .text{
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        text-align: center;
        max-width: 804px;
        margin: 0 auto;
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 24px);
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: clamp(40px, ${60 / 1194 * 100}vw, 80px) 16px;
    margin-top: 64px;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }

`
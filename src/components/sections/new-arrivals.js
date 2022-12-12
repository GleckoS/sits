import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"

export default function NewArrivals({ mt, data: { sectionTitle, text, chosenProducts } }) {
    return (
        <Wrapper className={mt ? 'nomargin' : ''}>
            <Container>
                <h2 className="title">{sectionTitle}</h2>
                {text && <p className="text">{text}</p>}
                <Grid>
                    {chosenProducts?.map(el => {
                        let isOnePostRendered = false
                        return el.products.products.productGallery?.map(inEl => {
                            return inEl.productsImages?.map((imageEl, index) => {
                                if (imageEl.isMainImage && !isOnePostRendered) {
                                    isOnePostRendered = true
                                    return <React.Fragment key={inEl.popupNames.model + index}><ProductCard model={inEl.popupNames.model} types={el.products.products.collection.types.nodes} data={el.products.products.collection} image={imageEl.featuredProductImage} /></React.Fragment>
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
    margin-top: clamp(80px, ${120 / 1194 * 100}vw, 160px);
    background-color: #F9F5F0;
    padding: clamp(40px, ${80 / 768 * 100}vw, 80px) 0;

    @media (max-width: 768px) {
        &.nomargin{
            margin-top: 0;
        }
    }

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


        @media (max-width: 768px) {
            max-width: 480px;
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: clamp(40px, ${60 / 1194 * 100}vw, 80px) 16px;
    margin-top: 80px;

    @media (max-width: 768px) {
        grid-gap: 16px;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        margin-top: 40px;
    }

`
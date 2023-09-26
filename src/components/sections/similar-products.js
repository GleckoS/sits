import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import { ProductCard } from "../moleculas/product-card"
import InView from "./in-view-provider"

const titleAnimation = textTransition(1)
const gridAnimation = {
    animate: { transition: { staggerChildren: .2, delayChildren: .5 } }
}
const itemAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4 } }
}

export default function SimilarProducts({ language, isLast, materials, title, data }) {
    return (
        <InView>
            <Wrapper isLast={isLast} className={materials ? 'materials' : ''}>
                <Container>
                    <motion.h2 variants={titleAnimation}>
                        {title}
                    </motion.h2>
                    <Grid variants={gridAnimation}>
                        {data?.map(el => {
                            let isOnePostRendered = false
                            if (!el.product) {
                                return null
                            }
                            return el.product.products.productGallery?.map(inEl => {
                                return inEl.productsImages?.map((imageEl, index) => {
                                    if (imageEl.isMainImage && !isOnePostRendered) {
                                        isOnePostRendered = true
                                        return <Item variants={itemAnimation} key={inEl.popupNames.model + index}>
                                            <ProductCard language={language} threeColumn={true} model={inEl.popupNames.model} types={el.product.products.collection.types.nodes} data={el.product.products.collection} image={imageEl.featuredProductImage} />
                                        </Item>
                                    }
                                    return null
                                })
                            })
                        })}
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    padding: 80px 0 0 0;
    padding-bottom: clamp(80px, ${120 / 1194 * 100}vw, 160px);
    margin-bottom: -160px;
    background-color: #F9F5F0;
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));

    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        font-family: 'Ivy';
        text-decoration: underline;
    }

    &.materials{
        margin-bottom: ${props => props.isLast ? 'calc(-1 * clamp(45px,10.050251256281408vw,160px))' : '0'};
        padding-bottom: clamp(40px, ${100 / 1194 * 100}vw, 100px);
    }
`

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px;
    margin-top: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 12px;
    }
    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`

const Item = styled(motion.div)`

    h3{
        font-size: clamp(16px, ${26 / 768 * 100}vw, 28px);
        font-weight: 300;
        margin-top: clamp(6px, ${16 / 1194 * 100}vw, 20px);
    }
`
import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { imageTransition, textTransition } from "../../helpers/animation-controller"
import { Container } from "../atoms/container"
import { ProductList } from "../organism/products-list"
import InView from "./in-view-provider"
import { useQueryParam } from "../../hooks/query-params"
import { newArrivalsTitle } from "../../texts"


const titleAnimation = textTransition(1)
const gridAnimation = imageTransition(2)

export default function Content({ data }) {

    const [page, setPage] = useQueryParam('page', 1)

    const [rerender, setRerender] = useState(false)

    const products = useMemo(() => {
        return data.map(el => el.product)
    }, [data])

    return (
        <InView>
            <Wrapper>
                <h1 ><motion.span variants={titleAnimation}>{newArrivalsTitle['en']}</motion.span></h1>
                <Container>
                    <List variants={gridAnimation}>
                        <ProductList setRerender={setRerender} rerender={rerender} page={page} setPage={setPage} products={products} />
                    </List>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    background-color: #F9F5F0;

    h1{
        span{
            font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            font-family: 'Ivy';
            font-weight: 300;
        }
        padding: clamp(20px, ${75 / 1194 * 100}vw, 110px) 45px clamp(45px, ${75 / 1194 * 100}vw, 110px) 45px;
        background-color: #fff;

        @media (max-width: 768px) {
            padding: clamp(20px, ${75 / 1194 * 100}vw, 110px) 24px clamp(45px, ${75 / 1194 * 100}vw, 110px) 24px;
        }
    }

    .button{
        margin-top: 30px;
    }
`

const List = styled(motion.div)`
    margin-bottom: calc(-1 * clamp(45px,10.050251256281408vw,160px));
    padding: 45px 0;
`
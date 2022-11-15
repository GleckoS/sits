import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

const IndexPage = () => {
    return (
        <Main>
            <Card to='/products/'>PRODUCTS</Card>
            <Card to='/materials/'>MATERIALS</Card>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
`


const Card = styled(Link)`
    width: 200px;
    height: 200px;
    background-color: #F9F5F0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default IndexPage

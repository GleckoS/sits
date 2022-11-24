import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { First } from "../organism/best-sellers-grid-first"

export default function BestSellersGrid({ data }) {
    return (
        <Wrapper>
            <Container>
                <Grid>
                    {data.map(el => {
                        debugger
                        switch (el.fieldGroupName) {
                            case "Page_Bestsellers_ImageGrids_First":
                                return <First data={el.collection}/>
                            case "Page_Bestsellers_ImageGrids_Second":
                                return null
                            case "Page_Bestsellers_ImageGrids_Third":
                                return null
                            case "Page_Bestsellers_ImageGrids_Fourth":
                                return null
                            case "Page_Bestsellers_ImageGrids_Fifth":
                                return null
                            default:
                                return null
                        }
                    })}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`

`

const Grid = styled.div`
    display: grid;
`
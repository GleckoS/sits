import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { Fifth } from "../organism/best-sellers-grid-fifth"
import { First } from "../organism/best-sellers-grid-first"
import { Fourth } from "../organism/best-sellers-grid-fourth"
import { Second } from "../organism/best-sellers-grid-second"
import { Third } from "../organism/best-sellers-grid-third"

export default function BestSellersGrid({ data }) {
    debugger
    return (
        <Wrapper>
            <Container>
                <Grid>
                    {data.map(el => {
                        switch (el.fieldGroupName) {
                            case "Page_Bestsellers_ImageGrids_First":
                                return <First data={el.collection} />
                            case "Page_Bestsellers_ImageGrids_Second":
                                return <Second data={el.collection} />
                            case "Page_Bestsellers_ImageGrids_Third":
                                return <Third data={el.collection} />
                            case "Page_Bestsellers_ImageGrids_Fourth":
                                return <Fourth data={el.collection} />
                            case "Page_Bestsellers_ImageGrids_Fifth":
                                return <Fifth data={el.collection} />
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
    margin-top: 80px;
`

const Grid = styled.div`
    display: grid;
    grid-gap: clamp(80px, ${100 / 1194 * 100}vw, 140px);
`
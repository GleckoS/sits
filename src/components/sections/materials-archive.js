import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { MaterialList } from "../organism/materials-list"

export default function MaterialsArchive({ materials }) {
    return (
        <Wrapper>
            <Container>
                <div>
                    {/* filter */}
                </div>
                <div>
                    {/* image diveder */}
                </div>
                <MaterialList materials={materials} />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
    padding: 86px 0;
`
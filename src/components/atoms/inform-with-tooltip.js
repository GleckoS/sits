import React from "react"
import styled from "styled-components"

export const Tooltip = ({ title, data }) => (
    <Wrapper>
        <span className="title">{title}</span>
        <Grid>
            {data.nodes.map(el => (
                <Item>
                    {/* <img src='' alt='TODO' /> */}
                    <span>{el.name}</span>
                </Item>
            ))}
        </Grid>
    </Wrapper>
)

const Wrapper = styled.div`
    margin-top: 40px;

    .title{
        margin-bottom: 12px;
        font-size: 28px;
    }
`

const Grid = styled.div`
    margin-top: 16px;   
    display: flex;
    gap: 16px;
`

const Item = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 12px;

    span{

    }
`
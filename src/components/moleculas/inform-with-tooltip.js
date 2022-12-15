import React from "react"
import styled from "styled-components"

export const Tooltip = ({ title, data, onlyImage }) => (
    <Wrapper>
        <span className="title">{title}</span>
        <Grid>
            {data.nodes.map(el => (
                <Item className={onlyImage ? 'noimage' : ''}>
                    <img src={el.taxonomy.image.localFile.publicURL} alt='TODO' />
                    {onlyImage
                        ? null
                        : <span>{el.name}</span>}

                </Item>
            ))}
        </Grid>
    </Wrapper>
)

const Wrapper = styled.div`
    margin-top: 40px;

    .title{
        margin-bottom: 12px;
        font-size: clamp(20px, ${28 / 1920 * 100}vw, 28px);
    }
`

const Grid = styled.div`
    margin-top: 16px;   
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`

const Item = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 12px;
    align-items: center;

    &.noimage{
        grid-gap: 0;
    }

    img{
        width: 32px;
        height: 32px;
    }

    span{
        font-size: clamp(16px, ${20 / 1194 * 100}vw, 20px);
        font-weight: 300;
        color: #31231E;
    }
`
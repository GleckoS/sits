import React from "react"
import styled from "styled-components"

export const TooltipOnlyImage = ({ title, data }) => (
    <Wrapper>
        <span className="title">{title}</span>
        <Grid>
            {data.nodes.map((el, index) => (
                <Item key={el.name + index} className='noimage'>
                    <Popup className="pop-up">
                        {el.name}
                    </Popup>
                    <img src={el.taxonomy.image.localFile.publicURL} alt={el.taxonomy.altText} />
                </Item>
            ))}
        </Grid>
    </Wrapper>
)

const Wrapper = styled.div`
    margin-top: 40px;

    @media (max-width: 520px) {
        position: relative;
    }

    .title{
        margin-bottom: 12px;
        font-size: clamp(20px, ${23 / 1920 * 100}vw, 23px);
    }
`

const Popup = styled.div`
    position: absolute;
    padding: 16px;
    background-color: #fff;
    opacity: 0;
    pointer-events: none;
    top: -20px;
    left: 50%;
    transform: translateY(-100%) translateX(-50%);
    width: 200px;
    transition: all .5s ease-out;
    z-index: 2;
    border: 2px solid #C3C3C3;
    text-align: center;

    @media (max-width: 1024px) {
        left: 0%;
        transform: translateY(-100% ) ;

        &::before{
            content: "";
            position: absolute;
            z-index: -1;
            bottom: 0;
            background: #C3C3C3;
            transform: translateY(10px) rotate(45deg);
            width: 24px;
            height: 24px;
            left: 3px;

            @media (max-width: 520px) {
                display: none;
            }

        }

        &::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background-color: #fff;
            z-index: -1;
        }
    }

    @media (max-width: 520px) {
        left: 0;
        transform: unset;
        bottom: 100%;
        width: 300px;
        top: unset;
    }

    @media (max-width: 350px) {
        left: -24px;
        right: -24px;
        width: 100vw;
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
    position: relative;

    @media (max-width: 520px) {
        position: unset;
    }

    &.noimage{
        grid-gap: 0;
    }

    img{
        width: 40px;
        height: 40px;
        opacity: .65;
        transition: opacity .5s ease-out;
    }

    &:hover{
        img{
            opacity: 1;
        }
    }

    span{
        font-size: clamp(16px, ${16 / 1194 * 100}vw, 16px);
        font-weight: 300;
        color: #31231E;
    }

    &:hover{
        opacity: 1;
        .pop-up{
            opacity: 1;
        }
    }
`
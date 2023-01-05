import React from "react"
import styled from "styled-components"

export const TooltipPopup = ({ title, data, onlyImage }) => (
    <Wrapper>
        <span className="title">{title}</span>
        <Grid>
            {data.nodes.map((el, index) => (
                <Item key={el.name + index} className={onlyImage ? 'noimage' : ''}>
                    <Popup className="pop-up">
                        <img src={el.taxonomy.comfortSvg.localFile.publicURL} alt={el.taxonomy.comfortSvg.altText} />
                        <div dangerouslySetInnerHTML={{ __html: el.description }} />
                    </Popup>

                    <img className="icon" src={el.taxonomy.image.localFile.publicURL} alt={el.taxonomy.image.altText} />
                    {onlyImage
                        ? null
                        : <span>{el.name}</span>}
                </Item>
            ))}
        </Grid>
    </Wrapper>
)

const Popup = styled.div`
    position: absolute;
    padding: 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 32px;
    opacity: 0;
    pointer-events: none;
    top: -10px;
    left: 50%;
    transform: translateY(-100%) translateX(-50%);
    width: 500px;
    transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    ul{
        display: grid;
        gap: 10px;
    }

    img{
        height: 120px;
    }

    div{
        *{
            font-size: 16px;
        }
    }

    @media (max-width: 1024px) {
        left: 0%;
        transform: translateY(-100% ) ;
    }

    @media (max-width: 720px) {
        width: 400px;
        img{
            height: 110px;
        }
        div{
            *{
                font-size: 14px;
            }
        }
    }

    @media (max-width: 600px) {
        width: calc(100vw - 48px);
        top: 30px;
        img{
            height: 100px;
        }
        div{
            *{
                font-size: 12px;
            }
        }
    }
    @media (max-width: 375px) {
        div{
            *{
                font-size: 10px;
            }
        }
    }

    @media (max-width: 350px) {
        left: -24px;
        right: -24px;
        width: 100vw;
    }
`

const Wrapper = styled.div`
    margin-top: 40px;

    .title{
        margin-bottom: 12px;
        font-size: clamp(20px, ${23 / 1920 * 100}vw, 23px);
    }
    @media (max-width: 600px) {
        position: relative;
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
    cursor: pointer;
    opacity: .75;
    transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    @media (max-width: 600px) {
        position: unset;
    }

    &.noimage{
        grid-gap: 0;
    }

    .icon{
        width: 32px;
        height: 32px;
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
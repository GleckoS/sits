import React from "react"
import styled from "styled-components"

export const TooltipPopup = ({ title, data, onlyImage }) => (
    <Wrapper>
        <span className="title">{title}</span>
        <Grid>
            {data.nodes.map((el, index) => (
                <Item key={el.name + index} className={onlyImage ? 'noimage' : ''}>
                    <Popup className="pop-up">
                        <div className="image">
                            <img src={el.taxonomy.comfortSvg.localFile.publicURL} alt={el.taxonomy.comfortSvg.altText} />
                        </div>
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
    padding: 0 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 32px;
    opacity: 0;
    pointer-events: none;
    top: -20px;
    right: 0;
    transform: translateY(-100%) ;
    width: 500px;
    transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    z-index: 2;
    border: 2px solid #C3C3C3;

    @media (max-width: 440px) {
        gap: 16px;
    }


    &::before{
        content: "";
        position: absolute;
        z-index: -1;
        bottom: 0;
        right: 20px;
        background: #C3C3C3;
        transform: translateY(10px) rotate(45deg);
        width: 24px;
        height: 24px;

        @media (max-width: 1024px) {
            left: 20px;
            right: unset;
        }

        @media (max-width: 600px) {
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

    ul{
        display: grid;
        gap: 10px;
    }
    .image{
        position: relative;
        padding: 32px 16px 32px 0;

        &::after{
            content: '';
            position: absolute;
            right: 0;
            top: 30px;
            bottom: 30px;
            width: 1px;
            background-color: #C3C3C3;
        }
    }

    img{
        height: 120px;
    }

    div{
        padding: 16px 0;
        *{
            font-size: 18px;
        }
        ol { 
            counter-reset: item;
            display: grid;
            grid-gap: 8px;
        }
        ol li { 
            padding-left: 24px; 
            position: relative; 
            display: block; 
        }
        ol li:before {
            content: counter(item) ". ";
            position: absolute;
            left: 0;
            top: 0;
            counter-increment: item;
            color: #C3C3C3;
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
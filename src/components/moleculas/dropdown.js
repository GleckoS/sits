import React from "react"
import styled from "styled-components"

export const DropDown = ({ controller, func, data, controlTitle }) => (
    <Wrapper>
        <div className="control">
            <span>
                {controlTitle}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" strokeWidth="2" />
            </svg>
        </div>
        <div className="content">
            {data.map(el => (
                <button key={el.name} onClick={() => { func(el.val) }} className={controller === el.val ? 'active item' : 'item'} >
                    <span>
                        {el.name}
                    </span>
                    <span className="dot"/>
                </button>
            ))}
        </div>
    </Wrapper>
)

const Wrapper = styled.div`
    width: 240px;
    padding: 10px 22px 0 22px;
    margin: 12px -22px 0 -22px;
    border: 1px solid transparent;
    height: fit-content;

    svg{
        margin-top: 4px;
    }

    @media (max-width: 1600px) {
        width: unset;
        .control{
            gap: 12px;
        }
    }

    .control{
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 300;
        font-size: 18px;
    }

    .content{
        opacity: 0;
        pointer-events: none;
        height: 0;

        .item{
            cursor: pointer;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            gap: 12px;
            font-weight: 300;
            font-size: 18px;
            border: none;
            background-color: transparent;

            .dot{
                width: 10px;
                height: 10px;
                background-color: transparent;
                border-radius: 50%;
                position: relative;

                &::after{
                    content: '';
                    position: absolute;
                    left: -5px;
                    right: -5px;
                    top: -5px;
                    bottom: -5px;
                    border: 1px solid #BABABA;
                    border-radius: 50%;
                }
            }

            &.active{
                .dot{
                    background-color: #31231E;
                    &::after{
                        border-color: #31231E;
                    }
                }
            }
        }
    }

    &:hover{
        background-color: #fff;
        border: 1px solid #ccc;
        padding-bottom: 10px;
        .content{
            opacity: 1;
        height: auto;
            pointer-events: all;

            label{
                margin-top: 20px;
            }
        }
    }
`
import React from "react"
import styled from "styled-components"

export const DropDown = ({ id, openedFilter, setOpenedFilter, controller, func, data, controlTitle }) => {

    return (
        <Wrapper onClick={() => { setOpenedFilter(id) }} onFocus={() => { setOpenedFilter(id) }} onBlur={() => { setOpenedFilter(false) }} className={openedFilter === id ? 'active' : ''}>
            <button className="control">
                <span>
                    {controlTitle}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                    <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" strokeWidth="2" />
                </svg>
            </button>
            <div className="content">
                {data.map(el => (
                    <button
                        key={el.name}
                        onClick={() => { func(el.val) }}
                        className={controller === el.val ? 'active item' : 'item'} >
                        <span>
                            {el.name}
                        </span>
                        <span className="dot" />
                    </button>
                ))}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 240px;
    padding: 10px 22px 0 22px;
    margin: 12px -22px 0 -22px;
    border: 1px solid transparent;
    height: fit-content;
    padding-bottom: 10px;

    *{
        text-align: left;
    }

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
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-weight: 300;
        font-size: 18px;
        pointer-events: all;
        cursor: pointer;
        height: 30px;

        span{
            line-height: 20px;
        }
    }

    .content{
        opacity: 0;
        pointer-events: none;
        transition: opacity .4s cubic-bezier(0.42, 0, 0.58, 1);

        .item{
            cursor: pointer;
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 10px;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            gap: 12px;
            font-weight: 300;
            font-size: 18px;
            border: none;
            background-color: transparent;

            &:focus-visible{
                outline-offset: 8px;
            }

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

    transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1), border .4s cubic-bezier(0.42, 0, 0.58, 1);

    &.active{
        background-color: #fff;
        border: 1px solid #ccc;
        .control{
            pointer-events: none;
        }
        .content{
            opacity: 1;
            pointer-events: all;

            label{
                margin-top: 20px;
            }
        }
    }
`
import React from "react"
import styled from "styled-components"

export const DropDown = ({ data: { controller, title, name, elements } }) => (
    <Wrapper>
        <div className="control">
            <span>
                {title}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17.719" height="10.043" viewBox="0 0 17.719 10.043">
                <path id="Path_80" data-name="Path 80" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(8699.209 -10051.55) rotate(90)" fill="none" stroke="#31231e" stroke-width="2" />
            </svg>
        </div>
        <div className="content">
            {elements.map(el => (
                <label >
                    <span>
                        {el.name}
                    </span>
                    <input readOnly checked={controller === el.value} onClick={() => { setType(el.value) }} name={name} type='radio' />
                </label>
            ))}
        </div>
    </Wrapper>
)

const Wrapper = styled.div`
    width: 267px;
    padding: 22px;
    margin: 22px -22px 0 -22px;
    border: 1px solid transparent;

    .control{
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content{
        opacity: 0;
        pointer-events: none;
        height: 0;

        label{
            cursor: pointer;
            margin-top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    &:hover{
        background-color: #fff;
        border: 1px solid #ccc;
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
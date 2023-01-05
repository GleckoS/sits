import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"

export const InputExt = ({ tabIndex, placeholder }) => {
    const [inputValue, setInputValue] = useState('')
    return (
        <Wrapper className="label">
            <span>{placeholder}</span>
            <input tabIndex={tabIndex} onChange={(e) => { setInputValue(e.target.value) }} />
            <Link tabIndex={tabIndex} aria-label={'search: ' + inputValue} to={inputValue ? ('/search/?search=' + inputValue) : '/search/'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                    <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                        <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                            <circle cx="8" cy="8" r="8" stroke="none" />
                            <circle cx="8" cy="8" r="7" fill="none" />
                        </g>
                        <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                    </g>
                </svg>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        border: none;
        width: 100%;
        padding: 0 2px 2px 2px;
        margin: 0 6px 0 9px;
        width: 23px;
        border-bottom: 1px solid black;
        transition: width .3s cubic-bezier(0.39, 0.575, 0.565, 1);
        font-size: 14px;

        &:focus{
            width: 150px;

            @media (max-width: 370px) {
                width: 120px;
            }

            @media (max-width: 320px) {
                width: 100px;
            }
        }
    }

    @media (max-width: 480px) {
        span{
            display: none;
        }
    }
`
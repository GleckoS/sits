import { Link, navigate } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { myContext } from "./../../hooks/provider"

export const Input = ({ func, tabIndex, placeholder }) => {
    const [isActive, setIsActive] = useState(false)

    const enterListener = (e, input) => {
        if (e.key === "Enter") {
            navigate(input ? ('/search/?search=' + input) : '/search/')
            func()
        }
    }

    return (
        <myContext.Consumer>
            {context => {
                return (
                    <Wrapper onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!context.searchInputValue) }} >
                        <span className={isActive ? 'active' : ''}>{placeholder}</span>
                        <input value={context.searchInputValue} onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} tabIndex={tabIndex} onChange={(e) => { context.setSearchInputValue(e.target.value) }} />
                        <Link onClick={func} tabIndex={tabIndex} aria-label={'search: ' + context?.searchInputValue} to={context?.searchInputValue ? ('/search/?search=' + context?.searchInputValue) : '/search/'}>
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
            }}
        </myContext.Consumer>
    )
}

const Wrapper = styled.label`
    position: relative;
    span{
        position: absolute;
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 0.003em;
        color: #767676;
        left: 0;
        top: -5px;
        pointer-events: none;
        transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);

        &.active{
            font-size: 12px;
            top: 0;
            transform: translateY(-100%);
        }
    }
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg{
        transition: transform .4s cubic-bezier(0.42, 0, 0.58, 1);
    }

    a:hover{
        svg{
        }
    }

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        border: none;
        width: 100%;
        font-size: 14px;
        padding-bottom: 10px;
    }

    @media (max-width: 840px) {
        padding-bottom: 6px;
        input{
            padding-bottom: 0;
        }
        svg{
            width: 20px !important;
            height: 20px !important;
        }
        a{
            margin-bottom: -2px !important;
        }
        max-width: 320px;
    }
`
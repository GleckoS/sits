import { Link, navigate } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { searchUrl } from "../../texts/urls"
import { searchParamName } from './../../texts/filter'

import { graphql, useStaticQuery } from 'gatsby';
import Result from "./input-search-result"
import { AnimatePresence, motion } from "framer-motion"

const query = graphql`
  {
    localSearchProducts {
        store
        index
    }
    localSearchMaterials {
        store
        index
    }
  }
`;

export const Input = ({ searchQuery, setSearchQuery, language, func, tabIndex, placeholder }) => {
    debugger
    const [isActive, setIsActive] = useState(false)
    const { localSearchProducts: store, localSearchMaterials: storeMaterials } = useStaticQuery(query);

    const enterListener = (e, input) => {
        if (e.key === "Enter") {
            navigate(input ? (searchUrl[language] + '?' + searchParamName[language] + '=' + input) : searchUrl[language])
            func()
            setSearchQuery('')
        }
    }

    const close = () => {
        setSearchQuery('')
        func()
    }

    return (
        <Wrapper onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!searchQuery) }} >
            <span className={isActive ? 'active' : ''}>{placeholder}</span>
            <input value={searchQuery} onKeyDown={(e) => { enterListener(e, searchQuery) }} tabIndex={tabIndex} onChange={(e) => { setSearchQuery(e.target.value) }} />
            <Link onClick={close} tabIndex={tabIndex} aria-label={'search: ' + searchQuery} to={searchQuery ? (searchUrl[language] + '?' + searchParamName[language] + '=' + searchQuery) : searchUrl[language]}>
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
            <AnimatePresence mode="wait">
                {(storeMaterials && store && searchQuery.length > 2) && (
                    <Result close={close} language={language} storeMaterials={storeMaterials} store={store} searchQuery={searchQuery} />
                )}
            </AnimatePresence>
        </Wrapper>
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
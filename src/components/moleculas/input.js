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
            <AnimatePresence mode="popLayout">
                {searchQuery ? (
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key='button' onClick={() => { setSearchQuery('') }}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.1232 4.97955L10.1437 9.95908M10.1437 9.95908L5.16406 14.9387M10.1437 9.95908L15.1232 14.9386M10.1437 9.95908L5.16406 4.97949" stroke="#767676" strokeWidth="0.933674" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                ) : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key='placeholder' className="placeholder" />}
            </AnimatePresence>
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
            <AnimatePresence mode="wait">
                {(storeMaterials && store && searchQuery.length > 2) && (
                    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                )}
            </AnimatePresence>
        </Wrapper>
    )
}

const Wrapper = styled.label`
    position: relative;

    button{
        height: 20px;
        width: 20px;
        border: none;
        margin-right: 12px;
        background-color: transparent;
    }

    .placeholder{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }

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
        margin-top: 20px;
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
    }
`

const Overlay = styled(motion.div)`
    inset: 145px 0 0 0;
    position: fixed;
    z-index: 1;
    background-color: #ffffffaa;

    max-width: 400px;

    /* display: none; */

    @media (max-width: 840px) {
        display: block;
        max-width: unset;
    }

`
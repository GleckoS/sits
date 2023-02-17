import { motion } from "framer-motion"
import React, { useState } from "react"
import styled from "styled-components"

export const Label = ({ variants, register, errors, name, obj, rows }) => {
    const [isActive, setIsActive] = useState(false)
    const [inputValue, setInputValue] = useState('')
    return (
        <Wrapper variants={variants} onFocus={() => { setIsActive(true) }} onBlur={() => { setIsActive(!!inputValue) }} className={errors[name] ? 'error' : ''}>
            <span className={isActive ? 'active' : ''}>{obj.placeholder['en']}</span>
            {rows
                ? <textarea value={inputValue} rows={rows} {...register(name, {
                    onChange: (e) => { setInputValue(e.currentTarget.value) }
                })} />
                : <input autoComplete="off" {...register(name, {
                    onChange: (e) => { setInputValue(e.currentTarget.value) }
                })} />}
        </Wrapper>
    )
}

const Wrapper = styled(motion.label)`
    position: relative;

    span{
        position: absolute;
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.003em;
        color: #767676;
        left: 0;
        top: 5px;
        pointer-events: none;
        transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);

        &.active{
            font-size: clamp(12px, ${16 / 1366 * 100}vw, 16px);
            top: 0;
            transform: translateY(-100%);
        }
    }

    @media (max-width: 1194px) {
        div{
            margin-top: 10px;
        }
    }

    div{
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 16px;
        align-items: center;
        width: fit-content;
        height: fit-content;
    }
    input, textarea{
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid #707070;
        transition: background-color .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        width: 100% !important;
        font-weight: 400;
        font-size: clamp(20px, ${24 / 1366 * 100}vw, 24px);
        letter-spacing: 0.003em;
        padding-bottom: 10px;
        padding-top: 5px;

        &:hover{
            background-color: #F9F5F0;
        }

        &:focus-visible{
            background-color: #70707016;
            outline: none;
        }
    }

`
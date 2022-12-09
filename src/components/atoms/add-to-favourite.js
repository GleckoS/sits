import React, { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { getCookie, setCookie } from "../../helpers/coockie-manager"

export default function AddToFauvorite({ rerender, type, title }) {

    const [isActive, setIsActive] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }
        let cookie = getCookie(type)
        if (!cookie) {
            setCookie(type, '')
        }
        return cookie.includes(title)
    })

    const clickHandler = (e) => {
        e.preventDefault()
        let cookie = getCookie(type)
        if (cookie.includes(title)) {
            cookie = cookie.replace(title + '|', '')
            setCookie(type, cookie)
            setIsActive(false)
        } else {
            setCookie(type, cookie + title + '|')
            setIsActive(true)
        }
    }

    useEffect(() => {
        setIsActive(() => {
            if (typeof window === 'undefined') {
                return false
            }
            let cookie = getCookie(type)
            if (!cookie) {
                setCookie(type, '')
            }
            return cookie.includes(title)
        })
    }, [rerender, type, title])

    return (
        <Button onClick={(e) => { clickHandler(e) }} className={isActive ? 'active hearth' : 'hearth'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31.829" height="30.323" viewBox="0 0 31.829 30.323">
                <g id="Fav" transform="translate(1.25 1.25)">
                    <path id="Path_155" data-name="Path 155" d="M14.665,27.375l-1.5-1.382a131.466,131.466,0,0,1-9.569-9.71Q0,12.138,0,7.88A7.7,7.7,0,0,1,2.218,2.259,7.375,7.375,0,0,1,7.7,0a8.214,8.214,0,0,1,3.7.915,8.759,8.759,0,0,1,3.263,3.006A10.7,10.7,0,0,1,18,.915,7.631,7.631,0,0,1,21.63,0a7.375,7.375,0,0,1,5.481,2.259A7.7,7.7,0,0,1,29.329,7.88q0,4.258-3.593,8.4a131.465,131.465,0,0,1-9.569,9.71Zm0-2.95"
                        transform="translate(0 0)" fill="rgba(219,135,122,0)" stroke="#bababa" strokeWidth="2.5" />
                </g>
            </svg>
        </Button>
    )
}

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    transform: scale(1);
    transition: transform .2s cubic-bezier(0.39, 0.575, 0.565, 1);

    &:hover{
        transform: scale(1.1);
    }

    &.active{
        path{
            fill: #EDC53D;
            stroke: #EDC53D;
        }
    }
`
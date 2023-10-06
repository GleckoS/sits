import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"
import { ToastContainer } from 'react-toastify'
import { cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const animate = cssTransition({
    enter: "enter",
    exit: "exit"
})

export default function Layout({ data, pageContext, children }) {

    const [isPageLoaded, setIsPageLoaded] = useState(false)

    useEffect(() => {
        setIsPageLoaded(true)
    }, [])

    return (
        <App>
            <ToastContainer limit={5} transition={animate} />
            <Global />
            <Cookies language={pageContext.language || 'EN'}/>
            <Header data={data} language={pageContext.language || 'EN'} />
            <div id='main'>
                {children}
            </div>
            <Footer language={pageContext.language || 'EN'} />
            <Overlay className={isPageLoaded ? 'disabled' : ''} />
        </App>
    )
}

const App = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
    min-height: 100vh;

    #main{
        margin-top: 95px;

        @media (max-width: 840px){
            margin-top: 76px;
        }

    }
`

const Overlay = styled.div`
    position: fixed;
    z-index: 100000000;
    inset: 0;
    background-color: #fff;
    pointer-events: none;
    transition: opacity .3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &.disabled{
        opacity: 0;
    }

    @media (max-width: 768px) {
        display: none;
    }
`
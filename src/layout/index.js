import React, { useState } from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"

import { ToastContainer } from 'react-toastify'
import { cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const animate = cssTransition({
    enter: "enter",
    exit: "exit"
})

export default function Layout({ data, pageContext, children }) {
    const [isCookiesActive, setIsCookiesActive] = useState(false)
    return (
        <App>
            <ToastContainer limit={5} transition={animate} />
            <Global />
            <Cookies language={pageContext.language || 'EN'} isActive={isCookiesActive} setIsActive={setIsCookiesActive} />
            <Header data={data} language={pageContext.language || 'EN'} />
            <div id='main'>
                {children}
            </div>
            <Footer language={pageContext.language || 'EN'} setIsCookiesActive={setIsCookiesActive} />
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
import React, { useState } from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"

import { ToastContainer } from 'react-toastify'
import { cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { myContext } from "../hooks/provider"

const animate = cssTransition({
    enter: "enter",
    exit: "exit"
})

export default function Layout({ children }) {

    const [isCookiesActive, setIsCookiesActive] = useState(false)

    return (
        <myContext.Consumer>
            {context => (
                < App >
                    <ToastContainer limit={5} transition={animate} />
                    <Global />
                    <Cookies language={context.language} isActive={isCookiesActive} setIsActive={setIsCookiesActive} />
                    <Header language={context.language} />
                    <div id='main'>
                        {children}
                    </div>
                    <Footer language={context.language} setIsCookiesActive={setIsCookiesActive} />
                </App>
            )}
        </myContext.Consumer >
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
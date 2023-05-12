import React, { useState } from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"
import { myContext } from "../hooks/provider"

import { ToastContainer } from 'react-toastify'
import { cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const animate = cssTransition({
    enter: "enter",
    exit: "exit"
})

export default function Layout({ data, pageContext, children }) {
    return (
        <myContext.Consumer>
            {context => {
                return (
                    <App>
                        <ToastContainer limit={5} transition={animate} />
                        <Global />
                        <Cookies language={pageContext.language || 'EN'} isActive={context.isCookiesActive} setIsActive={context.setIsCookiesActive} />
                        <Header data={data} language={pageContext.language || 'EN'} />
                        <div id='main'>
                            {children}
                        </div>
                        <Footer language={pageContext.language || 'EN'} setIsCookiesActive={context.setIsCookiesActive} />
                    </App>
                )
            }}
        </myContext.Consumer>
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
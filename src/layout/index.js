import React, { useState } from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"
import { myContext } from "../hooks/provider"

import { ToastContainer } from 'react-toastify'
import { cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' //TODO: try without

const animate = cssTransition({ 
    enter: "enter",
    exit: "exit"
})

export default function Layout({ children }) {


    return (
        <myContext.Consumer>
            {context => {
                return (
                    <App>
                        <ToastContainer limit={5} transition={animate} />
                        <Global />
                        <Cookies isActive={context.isCookiesActive} setIsActive={context.setIsCookiesActive} />
                        <Header />
                        <div id='main'>
                            {children}
                        </div>
                        <Footer setIsCookiesActive={context.setIsCookiesActive} />
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
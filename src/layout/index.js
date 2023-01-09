import React from "react"
import styled from "styled-components"
import { Global } from "../styles/global-style"
import Footer from "./footer"
import Header from "./header"
import Cookies from "./cookies"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {

    return (
        <Wrapper>
            <ToastContainer />
            <Global />
            {/* <Cookies /> */}
            <Header />
            <div id='main'>
                {children}
            </div>
            <Footer />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
    min-height: 100vh;
`
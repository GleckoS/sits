import React from "react"
import styled from "styled-components"
import { Global } from "../../styles/global-style"
// import Footer from "./footer"
// import Header from "./header"

export default function Layout({ children }) {

    return (
        <Wrapper>
            <Global />
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
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
import React from "react"
import styled from "styled-components"


export const Popup = ({ id, children, title, setPopUpOpened, isPopUpOpened }) => (
    <Wrapper className={isPopUpOpened ? 'active' : ''}>
        <Box>
            <Control>
                <span className="archive-title">{title}</span>
                <button onClick={() => { setPopUpOpened(false) }} className="close" aria-label='close pop-up'></button>
            </Control>
            <Content id={id}>
                {children}
            </Content>
        </Box>
        <Background onClick={() => { setPopUpOpened(false) }} />
    </Wrapper>
)

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: var(--gray);
    transition: opacity .2s cubic-bezier(0.39, 0.575, 0.565, 1);
    opacity: 0;
    pointer-events: none;

    &.active{
        opacity: 1;
        pointer-events: all;
    }
`

const Control = styled.div`
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close{
        position: relative;
        width: 30px;
        height: 30px;
        border: none;
        background: transparent;
        cursor: pointer;

        &::after{
            content: '';
            position: absolute;
            transform-origin: 50% 50%;
            left: 0;
            top: 50%;
            transform: translateY(-50%) rotateZ(45deg);
            width: 100%;
            height: 2px;
            background-color: var(--text-color);
        }

        &::before{
            content: '';
            position: absolute;
            transform-origin: 50% 50%;
            left: 0;
            top: 50%;
            transform: translateY(-50%) rotateZ(-45deg);
            width: 100%;
            height: 2px;
            background-color: var(--text-color);
        }
    }
`

const Background = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 100;
`

const Box = styled.div`
    position: relative;
    z-index: 1000;
    background-color: var(--light-background);
    width: 90%;
    max-width: 1200px;
    margin: 25px auto;
    padding: 0 50px;
    overflow: hidden;
    height: calc(100vh - 50px);
`

const Content = styled.div`
    overflow: auto;
    position: relative;
    max-height: calc(100% - 110px);
    padding-bottom: 50px;
`
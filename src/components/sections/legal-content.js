import React, { useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Content({ data: { sections } }) {

    const [isMenuOpened, setMenuOpened] = useState(false)

    return (
        <Wrapper>
            <Container>
                <Grid>
                    <LeftColumn>
                        {sections.map((el, index) => (
                            <Item key={el.sectionTitle + index} id={el.sectionTitle}>
                                <h1>{el.sectionTitle}</h1>
                                <div dangerouslySetInnerHTML={{ __html: el.sectionContent }} />
                            </Item>
                        ))}
                    </LeftColumn>
                    <Control className={isMenuOpened ? 'opened' : ''}>
                        {sections.map((el, index) => (
                            <a  onClick={(e) => { e.preventDefault(); setMenuOpened(false); document.getElementById(el.sectionTitle).scrollIntoView({ behavior: "smooth" }) }} key={el.sectionTitle + index} href={'#' + el.sectionTitle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12.898" height="12.898" viewBox="0 0 12.898 12.898">
                                    <g id="Icon_feather-external-link" data-name="Icon feather-external-link" transform="translate(25 -0.788) rotate(135)">
                                        <path id="Path_643" data-name="Path 643" d="M22.5,4.5h5.745v5.745" transform="translate(-6.51 0)" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                        <path id="Path_644" data-name="Path 644" d="M18.533,11.5l7-7" transform="translate(-3.798 0)" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </g>
                                </svg>
                                <span className="underline">
                                    {el.sectionTitle}
                                </span>
                            </a>
                        ))}
                    </Control>
                </Grid>
                <Overlay className={isMenuOpened ? 'opened' : ''} onClick={() => { setMenuOpened(false) }} />
                <button onClick={() => { setMenuOpened(true) }} className="fixed" aria-label='open anchor links menu'>
                    <svg id="list.bullet.circle.fill" xmlns="http://www.w3.org/2000/svg" width="37.5" height="37.518" viewBox="0 0 37.5 37.518">
                        <rect id="Rectangle_663" data-name="Rectangle 663" width="37.5" height="37.518" opacity="0" />
                        <path id="Path_701" data-name="Path 701" d="M18.75,37.5A18.889,18.889,0,0,0,37.5,18.75,18.893,18.893,0,0,0,18.732,0,18.873,18.873,0,0,0,0,18.75,18.9,18.9,0,0,0,18.75,37.5Z" fill="#31231e" />
                        <path id="Path_702" data-name="Path 702" d="M10.414,8.566a1.161,1.161,0,0,1-1.14-1.158,1.111,1.111,0,0,1,1.14-1.14H24.6a1.142,1.142,0,0,1,1.176,1.14A1.157,1.157,0,0,1,24.6,8.566Zm0,12.537a1.126,1.126,0,0,1-1.14-1.158,1.146,1.146,0,0,1,1.14-1.14H24.6a1.142,1.142,0,0,1,1.176,1.14A1.157,1.157,0,0,1,24.6,21.1Zm0-6.268a1.161,1.161,0,0,1-1.14-1.158,1.145,1.145,0,0,1,1.14-1.14H24.6a1.142,1.142,0,0,1,1.176,1.14A1.157,1.157,0,0,1,24.6,14.834ZM5.836,9.044A1.636,1.636,0,1,1,7.472,7.407,1.652,1.652,0,0,1,5.836,9.044Zm0,6.268a1.636,1.636,0,0,1,0-3.272,1.636,1.636,0,1,1,0,3.272Zm0,6.268a1.636,1.636,0,0,1,0-3.272,1.652,1.652,0,0,1,1.636,1.636A1.616,1.616,0,0,1,5.836,21.58Z" transform="translate(3.722 5.092)" fill="#fff" />
                    </svg>
                </button>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    position: relative;
    margin-top: clamp(20px, ${70 / 1194 * 100}vw, 100px);

    .fixed{
        display: none;

        @media (max-width: 1024px) {
            display: block;
            position: fixed;
            z-index: 2;
            right: 20px;
            bottom: 20px;
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
    }
    
    h1,h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
    }

    h3,h4,h5,h6{
        font-size: clamp(22px, ${28 / 1194 * 100}vw, 28px);
        font-family: 'Ivy';
        font-weight: 300;
    }

    ul,ol{
        padding-left: 20px;
        display: grid;
        grid-gap: 20px;
    }

    *{
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
        font-weight: 300;
    }

    table{
        *{
            text-align: left;
        }
        tr{
            position: relative;
            vertical-align: top;

            &::after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1px;
                background-color: #707070;
            }
        }
        th{
            min-width: max-content;
            padding-top:16px;
            padding-bottom:16px;
            color: #0B0B0B80;

            &:before {
                content: '';
                display: block; 
                width: 150px;
            }
        }
        td{
            padding-top:16px;
            padding-bottom:16px;
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`

const LeftColumn = styled.div`
    display: grid;
    grid-gap: clamp(0px, ${160 / 1920 * 100}vw, 160px);
    min-width: 500px;

    @media (max-width: 1194px) {
        grid-gap: 72px;
    }

    @media (max-width: 1024px) {
        min-width: unset;
        max-width: 768px;
    }
`

const Overlay = styled.div`
    display: none;
    @media (max-width: 1024px) {
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 1;
        pointer-events: none;

        &.opened{
            pointer-events: all;
        }
    }
`

const Control = styled.aside`
    margin-left: clamp(0px, ${160 / 1920 * 100}vw, 160px);
    display: grid;
    grid-gap: 20px;
    height: fit-content;
    position: sticky;
    top: 160px;
    a{
        display: grid;
        grid-gap: 12px;
        grid-template-columns: 7px auto;
        align-items: center;
        text-transform: uppercase;

        svg{
            transform: translateX(-1px) rotateZ(-90deg);
            transition: transform .2s ease-out;
            margin-top: 2px;
        }

        &:hover{
            span{
                background-size:100% 1px ;
            }

            svg{
                transform: translateX(2px) rotateZ(-90deg);
            }
        }
    }

    @media (max-width: 1194px) {
        margin-left: 0;
    }

    @media (max-width: 1024px) {
        position: fixed;
        z-index: 3;
        left: 0;
        right: 0;
        bottom: 0;
        top: unset;
        background-color: #F9F5F0;
        padding: 24px;
        box-shadow: 0 0 17px #00000020;
        transform: translateY(100%);
        transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);

        &.opened{
            transform: unset;
        }
    }
`

const Item = styled.div`
    scroll-margin: 120px;
`
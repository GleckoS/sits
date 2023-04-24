import { createGlobalStyle, keyframes } from "styled-components"

const enter = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const exit = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

export const Global = createGlobalStyle`
    :root{
        --light-background: #F9F5F0;
        --gray: #707070;
        --color-brown: #886B4B;
        --color-brown-light: #886B4B66;
        --text-color: #31231E;


        --animation: .8s cubic-bezier(0.42, 0, 0.58, 1);
        --menu-animation: .55s cubic-bezier(0.42, 0, 0.58, 1);
    }

    .yellow-button{
        height: clamp(48px, ${89 / 1194 * 100}vw, 89px);
        background-color: transparent;
        position: relative;
        font-weight: 300;
        font-size: clamp(16px, ${28 / 1194 * 100}vw, 28px);
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 45px;
        cursor: pointer;
        transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1), border .4s cubic-bezier(0.42, 0, 0.58, 1);
        border: 1px solid #31231E;

        &:hover{
            background-color: #F4F4F4;
        }

        &:active{
            background-color: #E3E3E3;
        }

        &:focus-visible{
            outline-offset: 2px;
            background-color: #F4F4F4;
        }
    }

    @media (max-width: 1024px) {
        .yellow-button{
            max-width: clamp(350px, ${450 / 1194 * 100}vw, 450px);
        }
    }

    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        color: var(--text-color);
        font-family: 'Gothic';
        line-height: 1.4em;
        text-underline-offset: 6px;
        text-decoration-thickness: 1px !important;
        outline: none;
        font-variant-numeric: oldstyle-nums;
    }

    body{
        scrollbar-gutter: stable both-edges;
        overflow: overlay;

        @media (max-width: 640px) {
            &.loading main{
                opacity: 1 !important;
                transition: unset !important;
            }
        }
    }

    @media (max-width: 420px) {
        .slick-dots li{
            margin: 0 2px !important; 
        }
    }

    .slick-dots li button:before{
        transition: opacity .3s cubic-bezier(0.42, 0, 0.58, 1);
    }

    .underline{
        width: fit-content;
        position: relative;
        padding-bottom: 3px;
        text-decoration: unset !important;
        text-transform: uppercase;

        transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

        background-image: linear-gradient(#222b40, #222b40);
        background-size: 80% 1px;
        background-position: left bottom;
        background-repeat: no-repeat;

        &:hover {
            background-size: 100% 1px !important;
        }
    }

    .styled-link{
        width: fit-content;
        display: block;
        position: relative;
        padding-bottom: 3px;

        transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

        background-image: linear-gradient(#222b40, #222b40);
        background-size: 0% 1px;
        background-position: left bottom;
        background-repeat: no-repeat;

        &:hover {
            background-size: 100% 1px;
        }
    }
    
    .no-focus {
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
    }

    *:focus{
        outline: none;
    }

    *:focus-visible{
        outline: 2px solid var(--color-brown);
    }

    input:focus-visible{
        outline: none;
    }

    .Toastify__toast {
        background-color: var(--light-background) !important;
        color: var(--text-color) !important;
    }

    .Toastify__progress-bar-theme--light{
        background: var(--color-brown) !important;
        opacity: 0 !important;
    }

    .Toastify__toast{
        transition: all .4s cubic-bezier(0.42, 0, 0.58, 1);

        &.enter {
            animation: ${enter} 0.5s cubic-bezier(0.42, 0, 0.58, 1) both;
        }

        &.exit {
            animation: ${exit} 0.5s cubic-bezier(0.42, 0, 0.58, 1) both;
        }
    }


    main{
        max-width: 1920px;
        margin: 0 auto;
        width: 100%;
    }

    .archive-title {
        font-size: 44px;
        font-style: italic;
        font-weight: 300;
        line-height: 170%;
        position: relative;
        width: fit-content;
    }

    .p{
        font-size: 28px;
        line-height: 135%;
        font-weight: 300;
    }

    .button{
        width: fit-content;
        padding: 13px 46px;
        background-color: var(--color-brown);

        font-size: 18px;
        text-transform: uppercase;
        color: #fff;
        border: none;
        margin: 0 auto;
        display: block;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .button{
            font-size: 16px;
        }
    }

    @media (max-width: 375px) {
        .button{
            font-size: 14px;
        }
    }

    
`
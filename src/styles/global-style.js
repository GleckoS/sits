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
        --color-brown: #996D3E;
        --color-brown-light: #996D3E66;
        --text-color: #31231E;


        --animation: .8s ease-out;
        --menu-animation: .55s ease-out;
    }

    .yellow-button{
        height: clamp(48px, ${89 / 1194 * 100}vw, 89px);
        background-color: #EDC53D;
        position: relative;
        font-size: clamp(16px, ${28 / 1194 * 100}vw, 28px);
        color: #ffffff;
        width: 100%;
        text-align: center;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 45px;
        cursor: pointer;
        transition: transform .5s ease-out, background-color .5s ease-out;

        &:hover{
            transform: translate(6px, 6px);
            background-color: #EDC53Db0;

            &::after{
                right: 0;
                left: 0;
                bottom: 0;
            }

            &::before{
                right: 0;
                top: 0;
                bottom: 0;
            }
        }

        &::after{
            content: "";
            position: absolute;
            right: -6px;
            left: 6px;
            bottom: -6px;
            height: 1px;
            background-color: #31231E;
            transition: all .5s ease-out;
        }

        &::before{
            content: "";
            position: absolute;
            right: -6px;
            top: 6px;
            bottom: -6px;
            width: 1px;
            background-color: #31231E;
            transition: all .5s ease-out;
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
    }

    @media (max-width: 420px) {
        .slick-dots li{
            margin: 0 2px !important; 
        }
    }

    .slick-dots li button:before{
        transition: opacity .3s ease-out;
    }

    .underline{
        width: fit-content;
        display: block;
        position: relative;
        padding-bottom: 3px;
        text-decoration: unset !important;

        transition: background-size 0.5s ease-out;

        background-image: linear-gradient(#222b40, #222b40);
        background-size: 80% 1px;
        background-position: left bottom;
        background-repeat: no-repeat;

        &:hover {
            background-size: 100% 1px;
        }
    }

    .styled-link{
        width: fit-content;
        display: block;
        position: relative;
        padding-bottom: 3px;

        transition: background-size 0.4s ease-out;

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
        transition: all .4s ease-out;

        &.enter {
            animation: ${enter} 0.5s ease-out both;
        }

        &.exit {
            animation: ${exit} 0.5s ease-out both;
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
        text-decoration: underline;
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
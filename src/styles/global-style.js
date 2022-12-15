import { createGlobalStyle } from "styled-components"

export const Global = createGlobalStyle`
    :root{
        --light-background: #F9F5F0;
        
        --gray: #707070;
        --color-brown: #ae600b;
        --color-brown-light: #ae600b66;

        --text-color: #31231E;

        /* --text-title-desctop: clamp(34px, ${44 / 1194 * 100}vw, 44px);
        --text-sub-desctop: clamp(28px, , 40px);
        --text-big-desctop: clamp(16px, ${20 / 1194 * 100}vw, 28px);
        --text-normal-desctop: clamp(34px, ${44 / 1194 * 100}vw, 18px);
        --text-small-desctop: ; */

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
        max-width: clamp(350px, ${450 / 1194 * 100}vw, 450px);
        margin: 0 auto;
        margin-top: 45px;
        cursor: pointer;
        transition: transform .2s cubic-bezier(0.39, 0.575, 0.565, 1), background-color .2s cubic-bezier(0.39, 0.575, 0.565, 1);

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
            transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        }

        &::before{
            content: "";
            position: absolute;
            right: -6px;
            top: 6px;
            bottom: -6px;
            width: 1px;
            background-color: #31231E;
            transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
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
    }

    *:focus{
        outline: none;
    }

    .Toastify__toast {
        background-color: var(--light-background) !important;
        color: var(--text-color) !important;
    }

    .Toastify__progress-bar-theme--light{
        background: var(--color-brown) !important;
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
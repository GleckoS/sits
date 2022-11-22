import { createGlobalStyle } from "styled-components"

export const Global = createGlobalStyle`
    :root{
        --light-background: #F9F5F0;
        
        --gray: #707070;
        --brown: #CEAD89;

        --text-color: #31231E;
    }

    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        color: var(--text-color);
        font-family: 'Gothic';
    }

    *:focus{
        outline: none;
    }

    html, body{
        overflow-x: hidden;
    }

    main{
        max-width: 1920px;
        overflow-x: hidden;
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

        &::after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background-color: var(--gray);
        }
    }

    .p{
        font-size: 28px;
        line-height: 135%;
        font-weight: 300;
    }
    
`
import React from 'react'
import Layout from './src/layout'
import './src/styles/normalize.css'
import './src/styles/fonts.css'
import Provider from './src/hooks/provider'

export const wrapPageElement = ({ element, props }) => (
    <Layout {...props}>
        {element}
    </Layout>
)

export const wrapRootElement = ({ element }) => (
    <Provider>{element}</Provider> 
)

export const onRenderBody = ({ setHeadComponents, setBodyAttributes }) => {
    setBodyAttributes({
        className: 'loading'
    })
    setHeadComponents([
        <link
            rel="preload"
            href="/fonts/IvyPrestoDisplayLightItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="interFont"
        />,
        <link
            rel="preload"
            href="/fonts/TradeGothicNextBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="interFont"
        />,
        <link
            rel="preload"
            href="/fonts/TradeGothicNextLight.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="interFont"
        />,
        <link
            rel="preload"
            href="/fonts/TradeGothicNextRegular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="interFont"
        />,
    ])
}
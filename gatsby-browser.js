import React from 'react'
import Layout from './src/layout'
import './src/styles/normalize.css'
import './src/styles/fonts.css'
import Provider from './src/hooks/provider'
import { AnimatePresence } from 'framer-motion'

export const wrapPageElement = ({ element, props }) => (
    <Layout {...props}>
        <AnimatePresence mode='wait'>
            {element}
        </AnimatePresence>
    </Layout>
)

export const wrapRootElement = ({ element }) => (
    <Provider>{element}</Provider>
)

export const shouldUpdateScroll = ({
    prevRouterProps,
    routerProps: { location },
    getSavedScrollPosition
}) => {
    // transition duration from `layout.js` * 1000 to get time in ms
    // * 2 for exit + enter animation
    const TRANSITION_DELAY = 500
    // if it's a "normal" route
    if (location.action === "PUSH") {
        window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
        return false
    }
    // if we used the browser's forwards or back button
    else if (prevRouterProps) {
        debugger
        const savedPosition = getSavedScrollPosition(location) || [0, 0]
        window.setTimeout(() => window.scrollTo(...savedPosition), TRANSITION_DELAY * 2) 
        return false
    }
}
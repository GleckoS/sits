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
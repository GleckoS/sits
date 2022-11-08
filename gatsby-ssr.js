import React from 'react'
import Layout from './src/layout'
import './src/styles/normalize.css'

export const wrapPageElement = ({ element, props }) => (
    <Layout {...props}>
        {element}
    </Layout>
)

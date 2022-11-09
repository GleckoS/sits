import { Link } from "gatsby"
import * as React from "react"

const IndexPage = () => {
    return (
        <main>
            <Link to='/products/'>PRODUCTS</Link>
            <Link to='/materials/'>MATERIALS</Link>
        </main>
    )
}

export default IndexPage

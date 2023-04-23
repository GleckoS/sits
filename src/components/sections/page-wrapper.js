import React from "react"
import { motion } from "framer-motion"
import { myContext } from "../../hooks/provider"

export default function Wrapper({ children }) {
    return (
        <myContext.Consumer>
            {({ setTransition }) => (
                <motion.main
                    onAnimationStart={({opacity}) => { setTransition(opacity) }}
                    // onAnimationComplete={(el) => { debugger }}
                >
                    {children}
                </motion.main>
            )}
        </myContext.Consumer>
    )
}
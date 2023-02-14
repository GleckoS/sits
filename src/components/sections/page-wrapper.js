import React from "react"
import { motion } from "framer-motion"

export default function Wrapper({ children }) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    type: "spring",
                    mass: 0.35,
                    stiffness: 75,
                    duration: .2
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    type: "spring",
                    mass: 0.35,
                    stiffness: 75,
                }
            }}
        >
            {children}
        </motion.main>
    )
}
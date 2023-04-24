import React from "react"
import { motion } from "framer-motion"
import { myContext } from "../../hooks/provider"

export default function Wrapper({ children }) {
    return (
        <myContext.Consumer>
            {({ setTransition }) => (
                <motion.main
                    onAnimationStart={({ opacity }) => { setTransition(opacity) }}
                    onAnimationComplete={() => { document.body.classList.remove('loading') }}
                    initial={{
                        opacity: () => {
                            if (typeof window === 'undefined') return 0
                            return (document.body.classList.contains('loading') && window.innerWidth <= 640) ? 1 : 0
                        }
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            type: "spring",
                            mass: 0.35,
                            stiffness: 75,
                            duration: () => {
                                if (typeof window === 'undefined') return .2
                                return (document.body.classList.contains('loading') && window.innerWidth <= 640) ? 0 : .2
                            },
                            when: 'beforeChildren'
                        }
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            type: "spring",
                            mass: 0.35,
                            stiffness: 75,
                        },
                    }}
                >
                    {children}
                </motion.main>
            )}
        </myContext.Consumer>
    )
}
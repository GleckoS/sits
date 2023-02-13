import { useInView, motion } from "framer-motion"
import React, { useRef } from "react"

export default function InView({ func = () => { }, children, margin = "-100px 0px -100px 0px" }) {

    const section = useRef(null)
    const isSectionInView = useInView(section, { margin: margin, once: true })

    return (
        <motion.div
            onAnimationComplete={func}
            initial='initial'
            animate={isSectionInView ? 'animate' : 'initial'}
            exit='exit'
            ref={section}>
            {children}
        </motion.div>
    )
}
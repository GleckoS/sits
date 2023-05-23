import { useInView, motion } from "framer-motion"
import React, { useRef } from "react"

export default function InView({ param = true, func = () => { }, children, margin = "-100px 0px -300px 0px" }) {

    const section = useRef(null)
    const isSectionInView = useInView(section, { margin: margin, once: true })
    const isMobile = (() => {
        if (typeof window !== 'undefined')
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        return false;
    })()

    if (isMobile) {
        return <motion.div
            initial='animate'
            animate={'animate'}
            ref={section}
        >
            {children}
        </motion.div>
    }


    return (
        <motion.div
            onAnimationComplete={func}
            initial='initial'
            animate={(isSectionInView && param) ? 'animate' : 'initial'}
            exit='exit'
            ref={section}>
            {children}
        </motion.div>
    )
}
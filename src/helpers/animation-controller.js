const transition = (index = 1, timing, isLink = false) => {
    return {
        duration: timing === 'slow' ? .7 : .5,
        delay: .2 + ((index - 1) * .2),
        ease: isLink ? [0.76, 0, 0.24, 1] : [0.42, 0, 0.58, 1]
    }
}

export const linkTransition = (index, timing = 'fast') => {
    return {
        initial: {
            opacity: 0,
            backgroundSize: '0 1px'
        },
        animate: {
            opacity: 1,
            transition: transition(index, timing),
            transitionEnd: {
                backgroundSize: '80% 1px',
                transition: transition('slow')
            }
        }
    }
}

export const textTransition = (index, timing = 'fast') => {
    return {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: transition(index, timing)
        }
    }
}

export const imageTransition = (index, timing = 'slow') => {
    return {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: transition(index, timing)
        }
    }
}
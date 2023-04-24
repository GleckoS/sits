const transition = (index = 1, timing, isLink = false) => {
    return {
        duration: timing === 'slow' ? .7 : .5,
        delay: .2 + ((index - 1) * .2),
        ease: isLink ? [0.76, 0, 0.24, 1] : [0.42, 0, 0.58, 1]
    }
}

export const linkTransition = (index, timing = 'fast') => {
    return {
    }
}

export const textTransition = (index, timing = 'fast') => {
    return {
    }
}

export const imageTransition = (index, timing = 'slow') => {
    return {
    }
}
export const partSlugTransform = (string) => {
    return string.replaceAll('-', '_').replaceAll(' ', '-')
}

export const fullSlugTransform = (string) => {
    return string.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const partSlugDeTransform = (string) => {
    return string.replaceAll('-', ' ').replaceAll('_', '-')
}
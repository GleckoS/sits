import { useCallback, useEffect, useState } from "react"
import queryString from 'query-string'
import { partSlugDeTransform } from "../helpers/slug-maker"

function getQueryParams() {
    let queryParams = {}
    if (typeof window !== 'undefined') {
        queryParams = queryString.parse(window.location.search)
    }
    return queryParams
}

function setQueryParams(query) {
    if (typeof window !== 'undefined') {
        const hasKeys = Object.keys(query).length > 0
        const urlSuffix = hasKeys ? `?${queryString.stringify(query)}` : ''
        window.history.pushState({ path: `${window.location.pathname}${urlSuffix}` }, '', `${window.location.pathname}${urlSuffix}`)
    }
}

function clearQueryParam(key) {
    const queryParams = getQueryParams()
    delete queryParams[key]
    setQueryParams(queryParams)
}

export function useQueryParam(name, defaultValue, location) {

    const [queryParam, setQueryParam] = useState(() => {
        let value = defaultValue
        let param = null
        if (typeof window !== 'undefined') {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)

            if (urlParams.has(name))
                param = urlParams.get(name)

        }

        return param || value
    })

    const clear = useCallback(() => {
        if (queryParam !== defaultValue) {
            clearQueryParam(name)
        }
    }, [name]);

    const changeUrlParam = useCallback((val) => {
        setQueryParam(val)
        if (partSlugDeTransform(String(val)) === defaultValue) {
            clear()
        }
        else {
            setQueryParams(Object.assign(Object.assign({}, getQueryParams()), { [name]: val }))
        }
    }, [defaultValue, name, clear])

    useEffect(() => {
        setQueryParam(() => {
            let value = defaultValue
            let param = null
            if (typeof window !== 'undefined') {
                const queryString = window.location.search
                const urlParams = new URLSearchParams(queryString)

                if (urlParams.has(name))
                    param = urlParams.get(name)

            }

            return param || value
        })
    }, [location])

    return [queryParam, changeUrlParam]
}
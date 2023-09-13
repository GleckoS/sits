import React, { useEffect, useState } from "react"
import { getCookie } from "../helpers/coockie-manager"

export const myContext = React.createContext();

const Provider = ({ children }) => {

    const [isCookiesActive, setIsCookiesActive] = useState(false)
    const [language, setLanguage] = useState('EN')
    const [currentAlternates, changeAlternates] = useState(null)
    const [transition, setTransition] = useState(0)
    const [searchInputValue, setSearchInputValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search)
            const search = urlParams.get('search')
            return search ? search : ''
        }

        return ''
    })
    const [favouritesCount, setFavouritesCount] = useState(0)

    const recalculateFavouritesCount = () => {
        let itemsCount = 0
        if (typeof window !== 'undefined') {
            let collection = getCookie('collections' + language)
            let products = getCookie('products' + language)
            let materials = getCookie('materials' + language)
            let colors = getCookie('colors' + language)

            if (collection?.includes("|")) {
                itemsCount += collection.split("|").length - 1
            }
            if (products?.includes("|")) {
                itemsCount += products.split("|").length - 1
            }
            if (materials?.includes("|")) {
                itemsCount += materials.split("|").length - 1
            }
            if (colors?.includes("|")) {
                itemsCount += colors.split("|").length - 1
            }
        }

        setFavouritesCount(itemsCount)
    }

    useEffect(() => {
        recalculateFavouritesCount()
    }, [language])

    return (
        <myContext.Provider value={{
            currentAlternates,
            changeAlternates,
            searchInputValue,
            setSearchInputValue,
            favouritesCount,
            recalculateFavouritesCount,
            transition,
            setTransition,
            isCookiesActive,
            setIsCookiesActive,
            language,
            setLanguage
        }}>
            {children}
        </myContext.Provider>
    )

}

export default Provider
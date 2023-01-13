import React, { useState } from "react"
import { getCookie } from "../helpers/coockie-manager";

export const myContext = React.createContext();

const Provider = ({ children }) => {

    const [currentAlternates, changeAlternates] = useState(null)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [favouritesCount, setFavouritesCount] = useState(() => {

        let itemsCount = 0
        if (typeof window !== 'undefined') {
            itemsCount += getCookie('collections').split("|").length - 1
            itemsCount += getCookie('products').split("|").length - 1
            itemsCount += getCookie('materials').split("|").length - 1
            itemsCount += getCookie('colors').split("|").length - 1
        }

        return itemsCount
    })

    const recalculateFavouritesCount = () => {
        let itemsCount = 0
        if (typeof window !== 'undefined') {
            itemsCount += getCookie('collections').split("|").length - 1
            itemsCount += getCookie('products').split("|").length - 1
            itemsCount += getCookie('materials').split("|").length - 1
            itemsCount += getCookie('colors').split("|").length - 1
        }

        setFavouritesCount(itemsCount)
    }

    return (
        <myContext.Provider value={{
            currentAlternates,
            changeAlternates,
            searchInputValue,
            setSearchInputValue,
            favouritesCount,
            recalculateFavouritesCount
        }}>
            {children}
        </myContext.Provider>
    )

}

export default Provider
import React, { useState } from "react"
import styled from "styled-components"

const expireTitle = {
    en: 'Expiry: '
}

const typeTitle = {
    en: 'Type: '
}

const loadMoreTitle = {
    en: 'LOAD MORE '
}

export const Grid = ({ active, el: data }) => {

    const [showAll, setShowAll] = useState(false)

    return (
        <div className={active ? 'active item-wrapper' : 'item-wrapper'}>
            <p className="grid-name">{data.innerPartName}</p>
            <div className="grid">
                {data.innerPartCookies.map((el, index) => {
                    let isButtonRendered = false
                    if (showAll ? true : index < 3) {
                        return (
                            <div key={el.cookieName + index} className={showAll ? "item" : 'item no-show'}>
                                <div>
                                    <p className="item-name">{el.cookieName}</p>
                                    <p className="item-description">{el.cookieDescription}</p>
                                </div>
                                <div className="item-flex">
                                    <p>{expireTitle['en']}{el.expireTime}</p>
                                    <p>{typeTitle['en']}{el.cookieType}</p>
                                </div>
                            </div>
                        )
                    } else {
                        if (!isButtonRendered) {
                            isButtonRendered = true
                            return (
                                <button key={'button'} items={data.innerPartCookies.length} className="show-all" onClick={() => { setShowAll(true) }}>
                                    {loadMoreTitle['en']}
                                    <span className="desctop"> ({data.innerPartCookies.length - 3})</span>
                                    <span className="tablet"> ({data.innerPartCookies.length - 2})</span>
                                    <span className="mobile"> ({data.innerPartCookies.length - 1})</span>
                                </button>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { MaterialCard } from "../moleculas/material-card"

const loadMore = {
    en: 'LOAD MORE'
}

export const MaterialList = ({ setShowCount, showCount, materials, color }) => {

    const [addCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024 ? 6 : 8
        }

        return 8
    })


    return (
        <>
            <Wrapper>
                {materials?.map((el, index) => {
                    if (index < showCount) {
                        return (
                            <React.Fragment key={el.title}>
                                <MaterialCard color={color} data={el} />
                            </React.Fragment>
                        )
                    }
                    return null
                })}
            </Wrapper>
            {showCount < materials.length
                ? <button className="button" onClick={() => { setShowCount(showCount + addCount) }}>{loadMore['en']}</button>
                : null}
        </>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 40px 20px;
    margin: 0 0 80px 0;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 710px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 480px) {
        margin: 0 -12px;
        grid-gap: 32px 12px;
    }

    @media (max-width: 389px) {
        grid-template-columns: 1fr;
    }
`
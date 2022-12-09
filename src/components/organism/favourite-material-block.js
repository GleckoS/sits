import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { ResultsGrid } from "../atoms/result-grid"
import { Card } from "../moleculas/search-material-card"

const loadMore = 'LOAD MORE'

export const FavouriteMaterialBlock = ({ count, setCount, prefiltredArr, filter, title }) => {

    const filtredArr = useMemo(() => {
        let arr = prefiltredArr.nodes
        if (filter) {
            arr = arr.filter(el => filter.includes(el.title))
            return arr
        }
        return []
    }, [prefiltredArr, filter])

    useEffect(() => {
        setCount(filtredArr.length)
    }, [filtredArr])

    const [showCount, setShowCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1194 ? 6 : 8
        }

        return 8
    })
    const [addCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1194 ? 6 : 8
        }

        return 8
    })

    const renderCount = useRef(0)

    if (filtredArr.length > 0) {
        renderCount.current = 0
        return (
            <Wrapper>
                <h2>{title}</h2>
                <ResultsGrid>
                    {filtredArr.map(el => {
                        renderCount.current += 1
                        let image = el.materials.materialColorVariants[0].squarePreviewImage

                        el.materials.materialColorVariants.every(el => {
                            if (el.isMainColor) {
                                image = el.squarePreviewImage
                                return false
                            }
                            return true
                        })

                        return <Card type={'materials'} image={image} title={el.title} slug={el.slug} model={el.title} />
                    })}
                </ResultsGrid>
                {count > showCount && (
                    <button className="button" onClick={() => { setShowCount(showCount + addCount) }}>{loadMore}</button>
                )}
            </Wrapper>
        )
    }

    return null
}

const Wrapper = styled.div`
    padding-top: 120px;

    &:first-child{
        padding-top: 60px;
    }

    h2{
        margin-bottom: 40px;
        font-family: 'Ivy';
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
        text-decoration: underline;
    }

    .button{
        margin-top: 42px;
    }

`
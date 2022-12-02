import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Card } from "../moleculas/search-material-card"

const loadMore = 'LOAD MORE'

export const ResultMaterialBlock = ({ count, setCount, prefiltredArr, searchValue, title }) => {
    const filtredArr = useMemo(() => {
        let arr = prefiltredArr.nodes
        let colors = []
        let itemsCount = 0

        if (searchValue) {
            arr.forEach(el => {
                let material = {
                    title: el.title,
                    slug: el.slug,
                    arr: []
                }

                if (el.title.toLowerCase().includes(searchValue.toLowerCase())) { // filter by title
                    material.arr.push(...el.materials.materialColorVariants)
                    itemsCount += el.materials.materialColorVariants.length

                } else {
                    el.materials.materialColorVariants.forEach(el => {
                        let filtredByGroup = el.colorGroup.toLowerCase().includes(searchValue.toLowerCase())
                        let filtredByName = el.variantName.toLowerCase().includes(searchValue.toLowerCase())

                        if (filtredByName || filtredByGroup) {
                            itemsCount += 1
                            material.arr.push(el)
                        }
                    })
                }
                if (material.arr.length > 0) {
                    colors.push(material)
                }
                return null
            })

            setCount(colors.length)
            return colors
        }
        return []
    }, [prefiltredArr, searchValue])

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
                        return el.arr.map(inEl => {
                            if (renderCount.current < showCount) {
                                renderCount.current += 1
                                return <Card title={el.title} slug={el.slug} data={inEl} />
                            }
                        })
                    })}
                </ResultsGrid>
                {count > showCount && (
                    <button className="button" onClick={() => { setShowCount(showCount + addCount) }}>{loadMore}</button>
                )}
            </Wrapper>
        )
    }
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

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 42px 16px;

    @media (max-width: 1194px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 26px 12px;
    }

    @media (max-width: 340px) {
        grid-template-columns: 1fr;
    }
`
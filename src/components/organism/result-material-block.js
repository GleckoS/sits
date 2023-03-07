import { motion } from "framer-motion"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { Card } from "../moleculas/search-material-card"
import InView from "../sections/in-view-provider"

export const ResultMaterialBlock = ({
    contentGridAnimation,
    contentTitleAnimation,
    animation,
    setRerender,
    rerender,
    count,
    setCount,
    prefiltredArr,
    searchValue,
    title }) => {
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
                    el.materials.materialColorVariants.forEach((el, index) => {
                        let filtredByGroup = el.colorGroup.toLowerCase().includes(searchValue.toLowerCase())
                        let filtredByName = el.variantName.toLowerCase().includes(searchValue.toLowerCase())

                        if (filtredByName || filtredByGroup) {
                            itemsCount += 1
                            material.arr.push({ ...el, colorId: index })
                        }
                    })
                }
                if (material.arr.length > 0) {
                    colors.push(material)
                }
                return null
            })

            setCount(itemsCount)
            return colors
        }
        return []
    }, [prefiltredArr, searchValue, setCount])

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
            <InView>
                <Wrapper variants={animation}>
                    <motion.h2 variants={contentTitleAnimation}>{title['en']}</motion.h2>
                    <ResultsGrid variants={contentGridAnimation}>
                        {filtredArr.map(el => {
                            return el.arr.map((inEl, index) => {
                                if (renderCount.current < showCount) {
                                    renderCount.current += 1
                                    return <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: .6 }}
                                        key={inEl.variantName + index}>
                                        <Card setRerender={setRerender} variant={index} rerender={rerender} type={'colors'} image={inEl.squarePreviewImage} model={inEl.variantName} title={inEl.variantName} slug={el.slug} />
                                    </motion.div>
                                }
                                return null
                            })
                        })}
                    </ResultsGrid>
                    {count > showCount && (
                        <LoadMore count={addCount} onClick={() => { setShowCount(showCount + addCount) }} />
                    )}
                </Wrapper>
            </InView>
        )
    }
}

const Wrapper = styled(motion.div)`
    padding-top: 120px;

    &:first-child{
        padding-top: 60px;
    }

    h2{
        margin-bottom: 40px;
        font-family: 'Ivy';
        font-size: clamp(23px, ${36 / 1194 * 100}vw, 36px);
        font-weight: 300;
    }

    .button{
        margin-top: 42px;
    }

`

const ResultsGrid = styled(motion.div)`
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

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`
import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { ResultsGrid } from "../atoms/result-grid"
import { motion } from "framer-motion"
import { Card } from "../moleculas/search-product-card"

export const FavouriteCollectionBlock = ({ language, contentGridAnimation, contentTitleAnimation, animation, setRerender, count, setCount, prefiltredArr, filter, title }) => {

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
    }, [filtredArr, setCount])

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
            <Wrapper variants={animation}>
                <motion.h2 variants={contentTitleAnimation}>{title[language]} ({filtredArr.length})</motion.h2>
                <ResultsGrid variants={contentGridAnimation}>
                    {filtredArr.map(el => {
                        renderCount.current += 1
                        let image = el.collections.generalCollectionInformation?.collectionPagePreviewImage?.localFile
                            ? el.collections.generalCollectionInformation?.collectionPagePreviewImage
                            : el.collections.generalCollectionInformation?.collectionGallery[0]
                        return <Card language={language} setRerender={setRerender} type={'collections'} image={image} data={el} model={el.title} />
                    })}
                </ResultsGrid>
                {count > showCount && (
                    <LoadMore count={addCount} onClick={() => { setShowCount(showCount + addCount) }} />
                )}
            </Wrapper>
        )
    }

    return null
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
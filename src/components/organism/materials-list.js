import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { LoadMore } from "../atoms/load-more"
import { MaterialCard } from "../moleculas/material-card"

export const MaterialList = ({ language, itemKey, setPage, page, materials, color }) => {

    const [addCount] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024 ? 6 : 8
        }
        return 8
    })

    return (
        <>
            <Wrapper>
                <AnimatePresence mode='popLayout'>
                    {materials?.map((el, index) => {
                        if (index < page * addCount) {
                            return (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: .4 } }}
                                    exit={{ opacity: 0, transition: { duration: .3 } }}
                                    key={el.title + color + itemKey}
                                >
                                    <MaterialCard language={language} color={color} data={el} />
                                </motion.div>
                            )
                        }
                        return null
                    })}
                </AnimatePresence>
            </Wrapper>
            {page * addCount < materials.length
                ? <LoadMore count={addCount} onClick={() => { setPage(+ page + 1) }} />
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

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`
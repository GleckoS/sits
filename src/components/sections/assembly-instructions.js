import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { useState } from "react"
import { useMemo } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { File } from "../atoms/file"
import { AnimatePresence, motion } from "framer-motion"
import InView from "./in-view-provider"

const title = {
    en: 'Assembly instructions'
}

const searchPlaceholder = {
    en: 'Search'
}

const titleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .3, delay: .3 } }
}

const inputAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .3, delay: .6 } }
}

const gridAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: .1, delayChildren: .9 } }
}

const blockAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .5 } },
    exit: { opacity: 0 }
}

const fileAnimation = {
    initial: { opacity: 0, backgroundSize: '0% 1px' },
    animate: { opacity: 1, backgroundSize: '80% 1px', transition: { duration: .3 } }
}


export default function AssemblyInstructions() {

    const { allWpCollection: { nodes } } = useStaticQuery(graphql`
    query {
        allWpCollection {
            nodes {
            title
            collections {
                generalCollectionInformation {
                assemblyInstructionFiles {
                    assemblyInstruction {
                    altText
                    title
                    localFile {
                        publicURL
                    }
                    }
                }
                }
            }
            }
        }
    }
  `)

    const arr = useMemo(() => {
        const arr = []

        nodes.forEach(el => {
            let collectionLetter = el.title[0]
            let isAlreadyCreated = null
            arr.every((inEl, index) => {
                if (inEl.letter === collectionLetter) {
                    isAlreadyCreated = index
                    return false
                }
                return true
            })

            if (!el.collections?.generalCollectionInformation?.assemblyInstructionFiles) {
                return null
            }

            if (isAlreadyCreated !== null) {
                arr[isAlreadyCreated].arr.push(el)
            } else {
                arr.push({
                    letter: collectionLetter,
                    arr: [el]
                })
            }
        })

        arr.sort(function (a, b) {
            if (a.letter < b.letter) {
                return -1;
            }
            if (a.letter > b.letter) {
                return 1;
            }
            return 0;
        });

        return arr
    }, [nodes])

    const [filtredArr, setFiltredArr] = useState(arr)

    const changeFilter = ({ currentTarget: { value } }) => {

        if (value !== '') {
            let filtred = []

            arr.forEach(el => {
                if (el.letter.toLowerCase() === value.toLowerCase()) {
                    filtred.push(el)
                    return null
                }

                let obj = {
                    letter: el.letter,
                    arr: []
                }

                el.arr.forEach(inEl => {
                    if (inEl.title.toLowerCase().includes(value.toLowerCase())) {
                        obj.arr.push(inEl)
                    } else {
                        let items = inEl.collections.generalCollectionInformation.assemblyInstructionFiles.filter(file => file.assemblyInstruction.title.toLowerCase().includes(value.toLowerCase()))
                        if (items.length > 0) {
                            obj.arr.push({
                                title: inEl.title,
                                collections: { generalCollectionInformation: { assemblyInstructionFiles: items } }
                            })
                        }
                    }
                })

                if (obj.arr.length > 0) {
                    filtred.push(obj)
                }
                return null
            })
            setFiltredArr(filtred)

            return null
        }

        setFiltredArr(arr)
    }

    return (
        <InView>
            <Wrapper>
                <Container>
                    <motion.h2 variants={titleAnimation}>{title['en']}</motion.h2>
                    <Label variants={inputAnimation}>
                        <input onChange={(v) => { changeFilter(v) }} placeholder={searchPlaceholder['en']} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                    <circle cx="8" cy="8" r="7" fill="none" />
                                </g>
                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                            </g>
                        </svg>
                    </Label>
                    <motion.div variants={gridAnimation}>
                        {filtredArr?.map(el => (
                            <Block variants={blockAnimation}>
                                <span className="letter">{el.letter}</span>
                                <div className="flex">
                                    {el.arr.map(el => (
                                        <div>
                                            <span className="collection">{el.title}</span>
                                            {el.collections?.generalCollectionInformation?.assemblyInstructionFiles?.map(inEl => (
                                                <File variants={fileAnimation} file={inEl.assemblyInstruction} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </Block>
                        ))}
                    </motion.div>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Label = styled(motion.label)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 450px;
    border-bottom: 1px solid black;
    padding-bottom: 2px;
    margin-bottom: clamp(60px, ${110 / 1194 * 100}vw, 120px);

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        border: none;
        width: 100%;
        padding: 0 2px 2px 0;
        margin: 0 6px 0 0;
        transition: width .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

    @media (max-width: 480px) {
        span{
            display: none;
        }
    }
`

const Wrapper = styled.section`
    margin-top: 160px;

    .collection{
        margin-bottom: 10px;
        display: block;
        font-size: 28px;
        font-weight: 300;
    }

    .flex{
        display: grid;
        grid-gap: 30px 50px;
        grid-template-columns: 1fr 1fr 1fr 1fr;

        @media (max-width: 1440px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 876px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 560px) {
            grid-template-columns: 1fr;
        }

    }

    h2{
        font-size: 28px;
        font-family: 'Ivy';
        font-weight: 300;
        margin-bottom: 32px;
    }

    .letter{
        margin-bottom: 20px;
        display: block;
        font-size: 28px;
        font-weight: 700;
    }

`

const Block = styled(motion.div)`
    margin-top: 40px;
`
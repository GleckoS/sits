import React from "react"
import { useState } from "react"
import { useMemo } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { File } from "../atoms/file"

const title = {
    en: 'Assembly instructions'
}

export default function AssemblyInstructions({ data }) {

    const arr = useMemo(() => {
        const arr = []

        data.forEach(el => {
            let collectionLetter = el.asseblyCollectionName[0]
            let isAlreadyCreated = null

            arr.every((inEl, index) => {
                if (inEl.letter === collectionLetter) {
                    isAlreadyCreated = index
                    return false
                }
                return true
            })

            if (isAlreadyCreated) {
                arr[isAlreadyCreated].arr.push(el)
            } else {
                arr.push({
                    letter: collectionLetter,
                    arr: [el]
                })
            }
        })

        return arr
    }, [data])

    // const [filtredArr] = useState()

    return (
        <Wrapper>
            <Container>
                <h2>{title['en']}</h2>
                {arr.map(el => (
                    <Block>
                        <span className="letter">{el.letter}</span>
                        <div className="flex">
                            {el.arr.map(el => (
                                <div>
                                    <span className="collection">{el.asseblyCollectionName}</span>
                                    <File file={el.assemblyFile} />
                                </div>
                            ))}
                        </div>
                    </Block>
                ))}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 160px;

    .collection{
        margin-bottom: 10px;
        display: block;
        font-size: 28px;
        font-weight: 300;
    }

    .flex{
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    h2{
        font-size: 28px;
        font-family: 'Ivy';
        font-weight: 300;
        text-decoration: underline;
        margin-bottom: 32px;
    }

    .letter{
        margin-bottom: 20px;
        display: block;
        font-size: 28px;
        font-weight: 700;
    }

`

const Block = styled.div`

`
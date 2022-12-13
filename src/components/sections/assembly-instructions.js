import React from "react"
import { useState } from "react"
import { useMemo } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { File } from "../atoms/file"

const title = {
    en: 'Assembly instructions'
}

const searchPlaceholder = {
    en: 'Search'
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

                obj.arr = el.arr.filter(inEl => inEl.asseblyCollectionName.toLowerCase().includes(value.toLowerCase()))
                if (obj.arr.length > 0) {
                    filtred.push(el)
                }
                return null
            })
            setFiltredArr(filtred)

            return null
        }

        setFiltredArr(arr)
    }

    return (
        <Wrapper>
            <Container>
                <h2>{title['en']}</h2>
                <Label>
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
                {filtredArr?.map(el => (
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

const Label = styled.label`
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

        &:focus{
            width: 150px;

            @media (max-width: 370px) {
                width: 120px;
            }

            @media (max-width: 320px) {
                width: 100px;
            }
        }
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
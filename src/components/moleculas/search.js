import React from "react"
import styled from "styled-components"
import { Input } from "./input"
import { InputExt } from './input-extended'
import { searchPlaceholder as searchTitle } from "../../texts"
import { myContext } from "../../hooks/provider"

export const Search = ({ searchQuery, setSearchQuery, func = () => { }, tabIndex = 0, type }) => {
    return (
        <myContext.Consumer>
            {context => (
                <Wrapper className={type === 'extended' ? 'extended' : ''}>
                    {type === 'extended'
                        ? <InputExt language={context.language} tabIndex={tabIndex} placeholder={searchTitle[context.language]} />
                        : <Input searchQuery={searchQuery} setSearchQuery={setSearchQuery} language={context.language} func={func} tabIndex={tabIndex} placeholder={searchTitle[context.language]} />}
                </Wrapper>
            )}
        </myContext.Consumer>
    )
}

const Wrapper = styled.div`
    input{
        font-weight: 300;
        font-size: 16px;
    }

    &.extended{
        label{
            font-size: clamp(16px, ${16 / 1194 * 100}vw, 20px);
            font-weight: 300;
        }
        input{
            border-bottom: 1px solid #BABABA;
        }
    }
`
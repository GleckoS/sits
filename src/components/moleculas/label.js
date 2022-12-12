import React from "react"
import styled from "styled-components"

export const Label = ({ register, errors, name, obj, rows }) => (
    <Wrapper className={errors[name] ? 'error' : ''}>
        <div>
            <span dangerouslySetInnerHTML={{ __html: obj.icon }} />
            <span className="name">{obj.label['en']}</span>
        </div>
        {rows
            ? <textarea rows={rows} {...register(name)} placeholder={obj.placeholder['en']} />
            : <input {...register(name)} placeholder={obj.placeholder['en']} />}

    </Wrapper>
)

const Wrapper = styled.label`
    display: grid;
    grid-template-columns: 150px auto;

    @media (max-width: 1194px) {
        div{
            margin-top: 10px;
        }
    }

    @media (max-width: 540px) {
        grid-template-columns: 40px auto;
        .name{
            display: none;
        }
    }

    div{
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 16px;
        align-items: center;
        width: fit-content;
        height: fit-content;
    }
    span{
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
        font-weight: 300;
    }
    input, textarea{
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid #707070;
        padding: 10px;
        transition: background-color .2s cubic-bezier(0.39, 0.575, 0.565, 1);

        &:hover{
            background-color: #F9F5F0;
        }

        &:focus{
            background-color: #70707016;
        }
    }

`
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

const title = {
    en: 'FAQ'
}

export default function FAQ({ data }) {

    const [openedQuestion, setOpenedQuestion] = useState(0)

    return (
        <Wrapper>
            <Container>
                <h2>{title['en']}</h2>
                <Grid>
                    <Questions>
                        {data.map((el, index) => (
                            <Question open={!index} onClick={() => { setOpenedQuestion(index) }} className={index == openedQuestion ? 'active' : ''}>
                                <summary>
                                    <span>{el.question}</span>
                                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="9.513" height="17.37" viewBox="0 0 9.513 17.37">
                                        <path id="Path_664" data-name="Path 664" d="M10052.275,8682.179l7.924,8.347-7.924,7.979" transform="translate(-10051.731 -8681.662)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </svg>
                                </summary>
                                <Answer className='active mobile' dangerouslySetInnerHTML={{ __html: el.answer }} />
                            </Question>
                        ))}
                    </Questions>
                    <Answers>
                        {data.map((el, index) => (
                            <Answer className={index == openedQuestion ? 'active desctop' : 'desctop'} dangerouslySetInnerHTML={{ __html: el.answer }} />
                        ))}
                    </Answers>
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    h2{
        margin-bottom: 60px;
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-family: 'Ivy';
        font-weight: 300;
        text-decoration: underline;
    }
    
    details > summary {
        list-style: none;
    }
    
    details > summary::-webkit-details-marker {
        display: none;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;

    @media ( max-width: 1194px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 0;
    }

`

const Answers = styled.div`
    padding: 32px;
    background-color: #F9F5F0;

    @media (max-width: 1194px) {
        display: none !important;
    }
`

const Answer = styled.div`
    display: none;

    grid-gap: clamp(16px, ${32 / 1194 * 100}vw, 32px);

    h1, h2, h3, h4, h5, h6{
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;

        @media (max-width: 375px) {
            font-size: 20px;
        }
    }

    p{
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
        font-weight: 300;
        line-height: 1.6;

        @media (max-width: 375px) {
            font-size: 14px;
        }
    }

    ul, ol{
        list-style: none;
        display: grid;
        grid-gap: 8px;

        li{
            font-size: 18px;
            font-weight: 300;
            padding-left: 20px;
            position: relative;
            line-height: 25px;

            @media (max-width: 375px) {
                font-size: 14px;
            }

            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 11px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #707070;
            }
        }
    }

    a{
        font-weight: 400;
        text-decoration: underline;
        transition: color .2s cubic-bezier(0.39, 0.575, 0.565, 1);

        &:hover{
            color: var(--color-brown);
        }
    }

    iframe{
        width: 100%;
        height: 100%;
        aspect-ratio: 16/9;
    }

    &.active{
        display: grid;
    }

    &.mobile{
        display: none;
        margin-top: clamp(24px, ${40 / 1194 * 100}vw, 40px);
    }

    @media (max-width: 1194px) {
        &.desctop{
            display: none !important;
        }
        &.mobile{
            display: grid !important;
        }
    }
`

const Questions = styled.div`

    @media (max-width: 640px) {
        margin: 0 -24px;
    }
`

const Question = styled.details`
    border: none;
    background-color: transparent;
    border-top: 1px solid #31231E;
    padding: clamp(16px, ${32 / 1194 * 100}vw, 32px) 16px;
    width: 100%;
    
    @media (max-width: 1194px) {
        padding: clamp(20px, ${32 / 1194 * 100}vw, 32px) 24px;
        .arrow{
            transform: rotateZ(90deg);
            transition: transform .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        }
    }

    &[open]{
        @media (max-width: 1194px) {
            background-color: #F9F5F0 !important;
            .arrow{
                transform: rotateZ(-90deg);
            }
        }
    }

    summary{
        display: grid;
        grid-template-columns: auto 10px;
        grid-gap: 16px;
        align-items: center;
        width: 100%;
        cursor: pointer;

        &::-webkit-details-marker{
            display: none;
        }
    }

    span{
        font-size: clamp(20px, ${20 / 1194 * 100}vw, 28px);
        font-weight: 300;
        text-align: left;

        @media (max-width: 1194px) {
            font-size: 28px;
        }

        @media (max-width: 375px) {
            font-size: 24px;
        }
    }

    &:last-child{
        border-bottom: 1px solid #31231E;
    }

    &.active{
        background-color: #F9F5F0;

        @media (max-width: 1194px) {
            background-color: transparent;
        }
    }
`
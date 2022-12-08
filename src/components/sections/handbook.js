import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { File } from "../atoms/file"

export default function Handbook({ data: { title, text, filesUnderText } }) {
    return (
        <Wrappers>
            <Container>
                <Content>
                    <h2>{title}</h2>
                    <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
                    <Flex>
                        {filesUnderText.map(el => (
                            <File file={el.file} />
                        ))}
                    </Flex>
                </Content>
            </Container>
        </Wrappers>
    )
}

const Wrappers = styled.section`
    margin-top: 160px;
`

const Content = styled.div`
    max-width: 826px;
    
    h2{
        font-size: clamp(26px, ${28 / 1194 * 100}vw, 28px);
        font-family: 'Ivy';
        font-weight: 300;
        text-decoration: underline;
        margin-bottom: clamp(24px, ${32 / 1194 * 100}vw, 32px);

        @media (max-width: 375px) {
            font-size: 20px;
        }
    }

    .text{
        display: grid;
        grid-gap: 12px;
        *{
            font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
            font-weight: 300;
            line-height: 1.6;

            @media (max-width: 375px) {
                font-size: 14px;
            }
        }
    }
`

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 32px;
`
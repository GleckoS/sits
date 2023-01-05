import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

export const TextBlock = ({ title, description, slug }) => (
    <Wrapper className="t">
        <h2 className="title">{title}</h2>
        <div className="text" dangerouslySetInnerHTML={{ __html: description }}></div>
        <Link className="link" to={'/collection/' + slug + '/'}>EXPLORE</Link>
    </Wrapper>
)

const Wrapper = styled.div`
    height: 100%;
    max-width: 380px;
    display: flex;
    justify-content : center;
    flex-direction: column;
    margin: 0 auto;

    @media (max-width: 1440px) {
        margin: unset;
        max-width: 536px;
    }

    @media (max-width: 640px){
        max-width: 380px;
        justify-content: flex-start;
        margin: unset;
    }

    .title{
        font-family: 'Ivy';
        font-size: clamp(36px, ${36 / 1240 * 100}vw, 40px);
        font-weight: 300;
        text-decoration: underline;
        margin-bottom: clamp(12px, ${12 / 1194 * 100}vw, 24px);

        @media (max-width: 1240px) {
            font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
            margin-bottom: 24px;
        }
    }

    .text{
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 24px);
        font-weight: 300;
        margin-bottom: clamp(24px, ${24 / 1194 * 100}vw, 40px);

        @media (max-width: 1240px) {
            font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
            margin-bottom: clamp(24px, ${40 / 1194 * 100}vw, 40px);
        }
    }

    .link{
        font-size: clamp(16px, ${16 / 1194 * 100}vw, 18px);
        font-weight: 300;
        text-decoration: underline;
    }
`
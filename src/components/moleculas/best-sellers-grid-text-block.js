import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { linkTransition, textTransition } from '../../helpers/animation-controller'
import { collectionUrl } from '../../texts/urls'
import { exploreButton } from './../../texts'

const titleAnimation = textTransition(3)
const textAnimation = textTransition(4)
const linkAnimation = linkTransition(5)

export const TextBlock = ({ title, description, slug, language }) => (
    <Wrapper className="t">
        <motion.h2 variants={titleAnimation} className="title">{title}</motion.h2>
        <motion.div variants={textAnimation} className="text" dangerouslySetInnerHTML={{ __html: description }} />
        <motion.div className='underline' variants={linkAnimation}>
            <Link to={collectionUrl[language] + slug + '/'}>{exploreButton[language]}</Link>
        </motion.div>
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
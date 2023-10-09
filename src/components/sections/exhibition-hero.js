import React from "react"
import styled from "styled-components"
import InView from "./in-view-provider"
import { Container } from "../atoms/container"
import { motion } from "framer-motion"
import { textTransition } from "../../helpers/animation-controller"
import { ourShowrooms, upcommingEvents } from "../../texts"

const titleAnimation = textTransition(1)
const textAnimation = textTransition(2)
const otherAnimation = textTransition(3)

export default function ExhibitionsHero({ data, showrooms, exhibitions, language }) {
  return (
    <InView>
      <Container>
        <Wrapper>
          <div>
            <motion.h1 variants={titleAnimation}>{data.pageTitle}</motion.h1>
            {data.pageDescription && <motion.p variants={textAnimation} dangerouslySetInnerHTML={{ __html: data.pageDescription }}></motion.p>}
          </div>
          <motion.div variants={otherAnimation}>
            <h2>{upcommingEvents[language]}</h2>
            <ul>
              {exhibitions.map((exhibition, index) => (
                <li key={index}>
                  {/* TODO: check dates, dont show old */}
                  {exhibition.title} {exhibition.event.dates}
                </li>
              ))}
            </ul>
            <h2>{ourShowrooms[language]}</h2>
            <ul>
              {showrooms.map((showroom, index) => (
                <li>
                  {showroom.title}
                </li>
              ))}
            </ul>
          </motion.div>
        </Wrapper>
      </Container>
    </InView>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  h1{
      font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
      font-family: 'Ivy';
      font-weight: 300;
  }

  p{
      margin-top: 20px;
      max-width: 640px;
      font-size: clamp(20px, calc(24vw/7.68), 26px);

      a{
          text-transform: unset;
      }
  }

  h2{
    color: #31231E;
    font-size: clamp(20px, calc(24vw/7.68), 26px);
    font-style: normal;
    font-weight: 400;
    line-height: 146%;
    margin-bottom: 24px;
    margin-top: 48px;
      
    @media (max-width: 768px) {
      margin-top: 32px;
      margin-bottom: 16px;
    }

    &:first-child{
      margin-top: 0;
    }
  }

  ul{
    display: grid;
    gap: 12px;
  }

  li{
    list-style: none;
  }
`
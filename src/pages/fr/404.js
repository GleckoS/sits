import { graphql, Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"
import { Container } from "../../components/atoms/container"
import InView from "../../components/sections/in-view-provider"
import Map from "../../components/sections/map"
import { BrownLink } from "../../components/atoms/brown-link"
import { linkTransition, textTransition } from "../../helpers/animation-controller"
import { motion } from "framer-motion"
import Wrapper from "../../components/sections/page-wrapper"

const titleAnimation = textTransition(1)
const textAnimation = textTransition(2)
const buttonAnimation = linkTransition(3)
const linkAnimation = linkTransition(4)

const NotFoundPage = ({ data: { wpPage: { errorPage: { pageTitle, textUnderPageTitle, coloredLink, underlinedLink } } } }) => {
  return (
    <Wrapper>
      <InView>
        <Section>
          <Container>
            <motion.h1 variants={titleAnimation}>{pageTitle}</motion.h1>
            <motion.div variants={textAnimation} className="text" dangerouslySetInnerHTML={{ __html: textUnderPageTitle }} />
            <Buttons>
              <motion.div variants={buttonAnimation} >
                <BrownLink className='button' to={coloredLink.url}>{coloredLink.title}</BrownLink>
              </motion.div>
              <motion.div variants={linkAnimation}>
                <Link className='underline' to={underlinedLink.url}>{underlinedLink.title}</Link>
              </motion.div>
            </Buttons>
          </Container>
        </Section>
      </InView>
      <Map language={'EN'} />
    </Wrapper>
  )
}

export default NotFoundPage

const Section = styled.section`
  background-color: var(--light-background);
  padding: 100px 0;
  margin-bottom: calc(clamp(45px,10.050251256281408vw,160px) * -1);

  h1{
      margin-bottom: 32px;
      font-family: 'Ivy';
      font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
      font-weight: 300;
      text-align: center;
  }

  .underline{
    background-size: inherit;
  }

  .text{
    margin-top: 20px;
    *{
      font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
      font-weight: 300;
      text-align: center;
    }
    a{
        position: relative;
        text-decoration: unset !important;

        transition: background-size 0.5s cubic-bezier(0.42, 0, 0.58, 1);

        background-image: linear-gradient(#222b40, #222b40);
        background-size: 80% 1px;
        background-position: left bottom;
        background-repeat: no-repeat;

        &:hover {
            background-size: 100% 1px !important;
        }
    }
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: fit-content;
  margin: 30px auto 0 auto;

  .button{
    width: fit-content;
  }

  a{
    margin-top: 0 !important;
  }
`

export const query = graphql`
    query error {
        wpPage(id: {eq: "cG9zdDozOTc2MQ=="}){
          id
          errorPage {
            pageTitle
            textUnderPageTitle
            coloredLink {
              target
              title
              url
            }
            underlinedLink {
              target
              title
              url
            }
          }
        }
    }
`

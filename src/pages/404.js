import { graphql, Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"
import { Container } from "../components/atoms/container"
import Map from "../components/sections/map"

const NotFoundPage = ({ data: { wpPage: { errorPage: { pageTitle, textUnderPageTitle, coloredLink, underlinedLink } } } }) => {
  return (
    <Wrapper>
      <Section>
        <Container>
          <h1>{pageTitle}</h1>
          <div className="text" dangerouslySetInnerHTML={{ __html: textUnderPageTitle }} />
          <Buttons>
            <Link className='button' to={coloredLink.url}>{coloredLink.title}</Link>
            <Link className='underline' to={underlinedLink.url}>{underlinedLink.title}</Link>
          </Buttons>
        </Container>  
      </Section>
      <Map />
    </Wrapper>
  )
}

export default NotFoundPage

const Wrapper = styled.main`
`

const Section = styled.section`
  background-color: var(--light-background);
  padding: 100px 0;
  margin-bottom: calc(clamp(45px,10.050251256281408vw,160px) * -1);

  h1{
      margin-bottom: 32px;
      font-family: 'Ivy';
      font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
      font-weight: 300;
      text-decoration: underline;
      text-align: center;
  }

  .text{
    margin-top: 20px;
    *{
      font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
      font-weight: 300;
      text-align: center;
    }
    a{
        text-decoration: underline;
        text-underline-offset: 2px !important;
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
`

export const query = graphql`
    query error {
        wpPage(id: {eq: "cG9zdDozNjU0Mg=="}){
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

import { graphql } from "gatsby"
import React, { useState } from "react"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"
import Wrapper from "../components/sections/page-wrapper"
import { myContext } from "../hooks/provider"
import ExhibitionsHero from "../components/sections/exhibition-hero"
import EventsGrid from "../components/sections/events-grid"
import TwoColumnFlex from "../components/sections/conscious-two-column-flex"
import { Title } from "../components/moleculas/title-sub"
import { showrooms } from "../texts"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: pageContext.language }} />
      <Seo seo={seo} pageContext={pageContext} language={pageContext.language} />
    </>
  )
}

export default function Exhibitions({ data: { allWpEvent, allWpShowroom, wpPage: { exhibition } }, pageContext }) {

  const [filtredEvents] = useState(allWpEvent.nodes.filter(el => {
    const [day, month, year] = el.event.endDate.split('/');
    const date = new Date(year, month - 1, day);
    const today = new Date();

    if (date.getTime() < today.getTime())
      return false

    return true
  }).sort((a, b) => {
    const [dayA, monthA, yearA] = a.event.startDate.split('/');
    const dateA = new Date(yearA, monthA - 1, dayA);
    const [dayB, monthB, yearB] = b.event.startDate.split('/');
    const dateB = new Date(yearB, monthB - 1, dayB);
    
    if (dateA.getTime() < dateB.getTime())
      return -1
    if (dateA.getTime() > dateB.getTime())
      return 1

    return 0
  }))

  return (
    <Wrapper>
      <myContext.Consumer>
        {context => {
          context.setLanguage(pageContext.language)
        }}
      </myContext.Consumer>
      <ExhibitionsHero language={pageContext.language} data={exhibition} showrooms={allWpShowroom.nodes} exhibitions={filtredEvents} />
      {filtredEvents.length !== 0 && (
        <>
          <EventsGrid language={pageContext.language} events={filtredEvents} />
        </>
      )}
      <Title h2={true} small={true} title={showrooms[pageContext.language]} />
      {allWpShowroom.nodes.map((el, index) => (
        <TwoColumnFlex equal={true} key={index} data={{ textUnderTitle: el.showroom.shwrommDescription, sectionTitle: el.title, imageOnTheLeftSide: el.showroom.previewImage }} />
      ))}
    </Wrapper>
  )
}

export const query = graphql`
  query bestsellers($id: String!, $language: WpLanguageCodeEnum) {
    wpPage(id: {eq: $id}){
      exhibition {
        pageTitle
        pageDescription
      }
      language {
        name
      }
      translations {
        language {
          name
          code
        }
        uri
      }
      seo {
        canonical
        metaDesc
        opengraphSiteName
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
    }
    allWpEvent(filter: {language: {code: {eq: $language}}}) {
      nodes {
        title
        event {
          dates
          endDate
          place
          startDate
          fairFolder{
            localFile {
              publicURL
              prettySize
            }
            mediaItemUrl
          }
          previewImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 80)
              }
            }
          }
        }
      }
    }
    allWpShowroom(filter: {language: {code: {eq: $language}}}) {
      nodes {
        title : name
        showroom {
          shwrommDescription
          previewImage {
            altText
            localFile{
              childImageSharp{
                gatsbyImageData(quality: 80)
              }
            }
          }
        }
      }
    }
  }
`
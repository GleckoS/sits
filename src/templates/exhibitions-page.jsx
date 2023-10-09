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
  query bestsellers($id: String!) {
    wpPage(id: {eq: $id}){
      exhibition {
        pageTitle
        pageDescription
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
    allWpEvent {
      nodes {
        title
        event {
          dates
          endDate
          place
          startDate
          previewImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
        }
      }
    }
    allWpShowroom {
      nodes {
        title : name
        showroom {
          shwrommDescription
          previewImage {
            altText
            localFile{
              childImageSharp{
                gatsbyImageData(quality: 100)
              }
            }
          }
        }
      }
    }
  }
`
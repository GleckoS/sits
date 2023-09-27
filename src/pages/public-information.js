import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import Wrapper from "../components/sections/page-wrapper"
import { Helmet } from "react-helmet"

export function Head() {
  const seo = {
    title: 'Public information | SITS',
    metaDesc: '30 years of experience, where quality comes from the human touch. At SITS, the human touch is a tradition in every piece of furniture we make.',
    opengraphSiteName: 'SITS'
  }
  const pageContext = {
    uri: '/public-information/'
  }
  return (
    <>
      <meta name="robots" content="noindex" />
      <Helmet htmlAttributes={{ lang: 'pl' }} />
      <Seo seo={seo} pageContext={pageContext} />
    </>
  )
}

export default function WhereToBuyPage() {
  return (
    <Wrapper>
      <Title
        title={'Public information'}
        text={`
        <a class="underline" href="https://sits.headlesshub.com/wp-content/uploads/2023/09/Porozumienie-w-sprawie-uzgodnienia-planu-polaczenia-spolek.pdf" target="__blank" rel="noopener noreferer">Porozumienie w sprawie uzgodnienia planu połączenia spółek SITS sp. z o.o., SITS Industry sp. z o.o., Justus sp. z o.o., Aglon Bis sp. z o.o.</a>
        <br/>
        <a class="underline" href="https://sits.headlesshub.com/wp-content/uploads/2023/09/Strategia_Sits-sig.pdf" target="__blank" rel="noopener noreferer">Informacja o realizacji strategii podatkowej</a>
        `}
      />
      <Map scale={6} lat={'52.1'} lon={'20'} />
    </Wrapper>
  )
}
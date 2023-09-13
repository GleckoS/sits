import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import Wrapper from "../components/sections/page-wrapper"

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
    <Seo seo={seo} pageContext={pageContext} />
  )
}

export default function WhereToBuyPage() {
  return (
    <Wrapper>
      <Title
        title={'Public information'}
        text={'Information on <a class="underline" href="https://drive.google.com/file/d/1HvOQ6kdNTJHaE-kYJZ51CQsEdkY-NuHt/view" target="__blank" rel="noopener noreferer">the implementation of the tax strategy</a>'}
      />
      <Map scale={6} lat={'52.1'} lon={'20'} />
    </Wrapper>
  )
}
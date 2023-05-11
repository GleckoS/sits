import React from "react"
import Map from "../components/sections/map"
import { Title } from "../components/moleculas/title-sub"
import Seo from "../layout/seo"
import { Helmet } from "react-helmet"
import Wrapper from "../components/sections/page-wrapper"

export function Head() {
  const seo = {
    title: 'Rabat 15% na całą kolekcję. Skandynawski design w Polsce | SITS',
    metaDesc: 'Skandynawski design w najlepszym wydaniu teraz 15% taniej. Promocja trwa w dniach 15-31.05 i obowiązuje w wybranych salonach sprzedaży w Polsce. Listę salonów znajdziesz poniżej.',
    opengraphSiteName: 'SITS'
  }
  const pageContext = {
    uri: '/rabat-15-na-cala-kolekcje-w-polsce/'
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
      <Title title={'–15% na całą kolekcję SITS'} text={'Skandynawski design w najlepszym wydaniu teraz 15% taniej. Promocja trwa w dniach 15-31.05 i obowiązuje w wybranych salonach sprzedaży w Polsce. Listę salonów znajdziesz poniżej.'} />
      <Map subset={'Poland'} scale={6} lat={'52.1'} lon={'20'} />
    </Wrapper>
  )
}

// export const query = graphql`
//     query whereToBuy($id: String!) {
//         wpPage(id: {eq: $id}){
//             title
//             seo {
//               canonical
//               metaDesc
//               opengraphSiteName
//               title
//               opengraphImage {
//                 localFile {
//                   publicURL
//                 }
//               }
//             }
//         }
//     }
// `

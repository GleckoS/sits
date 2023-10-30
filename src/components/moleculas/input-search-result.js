import React, { useMemo, useRef } from "react"
import styled from "styled-components"
import { useFlexSearch } from 'react-use-flexsearch';
import { GatsbyImage } from "gatsby-plugin-image";
import { collectionUrl, materialUrl, searchUrl } from "../../texts/urls"
import { Link } from "gatsby";
import { searchParamName } from "../../texts/filter";
import { meterialsAlterTitle, seeMore, showNoResultMessage } from "../../texts";
import { motion } from "framer-motion";

export default function Result({ storeMaterials, close, language, store, searchQuery }) {
  const needMore = useRef(false)

  const searchResult = useFlexSearch(
    searchQuery,
    store.index,
    store.store
  );
  const searchMaterialResult = useFlexSearch(
    searchQuery,
    storeMaterials.index,
    storeMaterials.store
  );
    debugger
  const fitredResult = useMemo(() => {
    needMore.current = false

    if (searchResult.length === Object.keys(store.store).length) return []

    const typesMap = {}
    const byLanguage = searchResult.filter(el => el.language === language)
    const byCategory = {}
    const array = []

    byLanguage.forEach(el => {
      el.types.forEach((type) => {
        if (!typesMap[type]) {
          typesMap[type] = true;
          byCategory[type] = [el]
        } else {
          byCategory[type].push(el)
        }
      });
    })

    for (const key in byCategory) {
      array.push({
        category: key,
        items: byCategory[key]
      })
    }

    return array

  }, [searchResult, language])

  const filtredMaterialResult = useMemo(() => {
    needMore.current = false
    if (searchMaterialResult.length === Object.keys(storeMaterials.store).length) return []

    return searchMaterialResult.filter(el => el.language === language)
  }, [searchMaterialResult, language])

  return (
    <Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {fitredResult?.map((el, i) => {
        if (i > 2) {
          needMore.current = true
          return null
        }
        return (
          <div>
            <p className={i ? "title" : ''}>{el.category} ({el.items.length})</p>
            <ul>
              {el.items.map((item, index) => {
                if (index > 2) {
                  needMore.current = true
                  return null
                }
                return (
                  <li>
                    <Link onClick={close} to={`${collectionUrl[language]}${item.collection.slug}/`}>
                      {item.image && (
                        <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                      )}
                      <p>{item.collection.name}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
      {filtredMaterialResult.length > 0 && (
        <div>
          <p className={fitredResult.length > 0 ? "title" : ''}>{meterialsAlterTitle[language]}</p>
          <ul>
            {filtredMaterialResult?.map((item, i) => {
              if (i > 2) {
                needMore.current = true
                return null
              }
              return (
                <li>
                  <Link onClick={close} to={`${materialUrl[language]}${item.slug}/`}>
                    {item.image && (
                      <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                    )}
                    <p>{item.title}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {needMore.current && (
        <Link onClick={close} className="link" to={searchUrl[language] + '?' + searchParamName[language] + '=' + searchQuery}>
          {seeMore[language]}
        </Link>
      )}

      {fitredResult.length === 0 && (
        <p className="no-result">{showNoResultMessage[language]}</p>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  padding: 8px;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background-color: #fff;
  z-index: 2;
  border-bottom: 1px solid #9C6325;
  border-top: 1px solid #9C6325;

  .title{
    margin-top: 20px;
  }

  > div > p{
    margin-bottom: 4px;
  }

  ul{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    li{
      list-style: none;

      a{
        display: grid !important;
        gap: 8px !important;
        padding: 4px;
        transition: background-color .2s cubic-bezier(0.785, 0.135, 0.15, 0.86);

        &:hover{
          background: #F9F5F0;
        }
      }

      p{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: center;
      }
    }
  }

  .link{
    width: 100% !important;
    text-align: center !important;
    padding: 9px 10px;
    background-color: var(--color-brown);
    display: block !important;

    font-size: clamp(14px, ${16 / 1024 * 100}vw, 16px);
    text-transform: uppercase;
    color: #fff;
    border: none;
    margin: 32px auto 0 auto;
    display: block;
    cursor: pointer;
    transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1);
    color: #fff;

    &:hover{
        background-color: #785836;
    }

    &:active{
        background-color: #785836;
    }

    &:focus-visible{
        outline: 1px solid #88643D;
        outline-offset: 2px;
    }

    &:disabled{
        background: #CFCFCF;
    }
  }

  .no-result{
    text-align: center;
    padding: 16px 0;
  }
`
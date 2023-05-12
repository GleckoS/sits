import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { getCookie } from '../../helpers/coockie-manager'
import { LoadMore } from '../atoms/load-more'
import { ResultsGrid } from '../atoms/result-grid'
import { motion } from "framer-motion"
import { Card } from '../moleculas/search-product-card'

export const FavouriteProductBlock = ({
  contentGridAnimation,
  contentTitleAnimation,
  animation,
  setRerender,
  count,
  setCount,
  prefiltredArr,
  filter,
  title,
  language
}) => {
  const filtredArr = useMemo(() => {
    let arr = prefiltredArr.nodes
    if (filter) {

      arr = arr.filter((el) => {
        let isAccessed = false

        el.products.productGallery.every((inEl) => {
          if (filter.includes(inEl.popupNames.model)) {
            isAccessed = true
          }
          return !isAccessed
        })

        return isAccessed
      })
      return arr
    }

    return []
  }, [prefiltredArr, filter])

  useEffect(() => {
    setCount(filtredArr.length)
  }, [filtredArr, setCount])

  const [showCount, setShowCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1194 ? 6 : 8
    }

    return 8
  })
  const [addCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1194 ? 6 : 8
    }

    return 8
  })

  const renderCount = useRef(0)
  if (filtredArr.length > 0) {
    renderCount.current = 0
    return (
      <Wrapper variants={animation}>
        <motion.h2 variants={contentTitleAnimation}>{title[language]} ({count})</motion.h2>
        <ResultsGrid variants={contentGridAnimation}>
          {filtredArr?.map((el) => {
            let renderedlist = []
            return el.products.productGallery?.map((inEl, index) => {
              let isHaveMainImage = false

              inEl.productsImages.every(image => {
                if (image.isMainImage) {
                  isHaveMainImage = true
                  return false
                }
                return true
              });

              return inEl.productsImages?.map((imageEl) => {
                if (
                  (
                    (imageEl.isMainImage && isHaveMainImage && !renderedlist.includes(inEl.popupNames.model))
                    ||
                    (!isHaveMainImage && imageEl.featuredProductImage.width > imageEl.featuredProductImage.height && !renderedlist.includes(inEl.popupNames.model))
                  )
                  && el.products.collection?.slug
                  && renderCount.current < showCount
                ) {
                  let cookie = getCookie('products')
                  if (cookie?.includes(inEl.popupNames.model)) {
                    renderedlist.push(inEl.popupNames.model)
                    renderCount.current += 1
                    return (
                      <React.Fragment key={inEl.popupNames.model + index}>
                        <Card
                          language={language}
                          setRerender={setRerender}
                          image={imageEl.featuredProductImage}
                          data={el.products.collection}
                          model={inEl.popupNames.model}
                        />
                      </React.Fragment>
                    )
                  }

                }
                return null
              })
            })
          })}
        </ResultsGrid>
        {count > showCount && (
          <LoadMore
            count={addCount}
            onClick={() => {
              setShowCount(showCount + addCount)
            }} />
        )}
      </Wrapper>
    )
  }

  return null
}

const Wrapper = styled(motion.div)`
  padding-top: 120px;

  &:first-child {
    padding-top: 60px;
  }

  h2 {
    margin-bottom: 40px;
    font-family: 'Ivy';
    font-size: clamp(23px, ${36 / 1194 * 100}vw, 36px);
    font-weight: 300;
  }

  .button {
    margin-top: 42px;
  }
`

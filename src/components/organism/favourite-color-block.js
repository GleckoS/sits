import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { getCookie } from '../../helpers/coockie-manager'
import { ResultsGrid } from '../atoms/result-grid'
import { Card } from '../moleculas/search-material-card'

const loadMore = 'LOAD MORE'

export const FavouriteColorBlock = ({
  count,
  setCount,
  prefiltredArr,
  filter,
  title
}) => {
  const filtredArr = useMemo(() => {
    let arr = prefiltredArr.nodes
    let filtred = []
    if (filter) {
      let cookie = getCookie('colors')
      arr = arr.forEach((el) => {
        el.materials.materialColorVariants.forEach((inEl, index) => {
          if (cookie?.includes(inEl.variantName)) {
            filtred.push({ ...inEl, slug: el.slug, colorId: index })
          }
        })
      })
      return filtred
    }
    return []
  }, [prefiltredArr, filter])

  useEffect(() => {
    setCount(filtredArr.length)
  }, [filtredArr])

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
      <Wrapper>
        <h2>{title}</h2>
        <ResultsGrid>
          {filtredArr.map((el) => {
            renderCount.current += 1
            return (
              <Card
                colorId={el.colorId}
                type={'colors'}
                image={el.squarePreviewImage}
                title={el.variantName}
                slug={el.slug}
                model={el.variantName}
              />
            )
          })}
        </ResultsGrid>
        {count > showCount && (
          <button
            className='button'
            onClick={() => {
              setShowCount(showCount + addCount)
            }}>
            {loadMore}
          </button>
        )}
      </Wrapper>
    )
  }

  return null
}

const Wrapper = styled.div`
  padding-top: 120px;

  &:first-child {
    padding-top: 60px;
  }

  h2 {
    margin-bottom: 40px;
    font-family: 'Ivy';
    font-size: clamp(26px, ${(28 / 1194) * 100}vw, 28px);
    font-weight: 300;
    text-decoration: underline;
  }

  .button {
    margin-top: 42px;
  }
`

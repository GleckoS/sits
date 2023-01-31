import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { getCookie } from '../../helpers/coockie-manager'
import { LoadMore } from '../atoms/load-more'
import { ResultsGrid } from '../atoms/result-grid'
import { Card } from '../moleculas/search-material-card'

export const FavouriteColorBlock = ({
  setRerender,
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
      arr.forEach((el) => {
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
      <Wrapper>
        <h2>{title} ({filtredArr.length})</h2>
        <ResultsGrid>
          {filtredArr.map((el) => {
            renderCount.current += 1
            return (
              <Card
                setRerender={setRerender}
                variant={el.colorId}
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
  }

  .button {
    margin-top: 42px;
  }
`

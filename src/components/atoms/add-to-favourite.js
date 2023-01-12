import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { getCookie, setCookie } from '../../helpers/coockie-manager'
import { toast } from 'react-toastify'
import { navigate } from 'gatsby'
import { myContext } from '../../hooks/provider'

const removeMessage = {
  en: ' removed from My Favourites'
}

const addMessage = {
  en: ' added to My Favourites'
}

export default function AddToFauvorite({ setRerender = () => { }, rerender, type, title }) {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    let cookie = getCookie(type)
    if (!cookie) {
      setCookie(type, '')
    }
    return cookie?.includes(title)
  })

  const clickHandler = (e, recalculate) => {
    e.preventDefault()
    let cookie = getCookie(type)
    if (cookie?.includes(title)) {
      cookie = cookie.replace(title + '|', '')
      setCookie(type, cookie)
      setIsActive(false)
      toast(title + removeMessage['en'])
    } else {
      setCookie(type, cookie + title + '|')
      setIsActive(true)
      toast(title + addMessage['en'], { onClick: () => { navigate('/favourite/') } })
    }
    setRerender(Math.random())
    recalculate()
  }

  useEffect(() => {
    setIsActive(() => {
      if (typeof window === 'undefined') {
        return false
      }
      let cookie = getCookie(type)
      if (!cookie) {
        setCookie(type, '')
      }
      return cookie?.includes(title)
    })
  }, [rerender, type, title])

  return (
    <myContext.Consumer>
      {context => {
        return (
          <Button
            aria-label={
              isActive
                ? 'remove item from favourite list'
                : 'add item to favourite list'
            }
            onClick={(e) => {
              clickHandler(e, context.recalculateFavouritesCount);
            }}
            className={isActive ? 'active hearth' : 'hearth'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='30'
              viewBox='0 0 32 30'>
              <g id='Fav' transform='translate(1.25 1.25)'>
                <path
                  id='Path_155'
                  data-name='Path 155'
                  d='M14.665,27.375l-1.5-1.382a131.466,131.466,0,0,1-9.569-9.71Q0,12.138,0,7.88A7.7,7.7,0,0,1,2.218,2.259,7.375,7.375,0,0,1,7.7,0a8.214,8.214,0,0,1,3.7.915,8.759,8.759,0,0,1,3.263,3.006A10.7,10.7,0,0,1,18,.915,7.631,7.631,0,0,1,21.63,0a7.375,7.375,0,0,1,5.481,2.259A7.7,7.7,0,0,1,29.329,7.88q0,4.258-3.593,8.4a131.465,131.465,0,0,1-9.569,9.71Zm0-2.95'
                  transform='translate(0 0)'
                  fill='rgba(219,135,122,0)'
                  stroke='#bababa'
                  strokeWidth='2.5'
                />
              </g>
            </svg>
          </Button>
        )
      }}
    </myContext.Consumer>
  )
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transform-origin: 50% 50%;

  &:hover {
    svg{
      transform: scale(1.1);
    }
  }

  &.active {
    path {
      fill: #edc53d;
      stroke: #edc53d;
    }
  }

  svg {
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    width: 28px;
    height: 26px;

    @media (max-width: 1194px) {
      width: 23px;
      height: 21px;
    }

    @media (max-width: 640px) {
      width: 21px;
      height: 19px;
    }
  }
`

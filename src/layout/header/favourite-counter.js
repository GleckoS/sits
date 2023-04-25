import React, { useEffect, useState } from "react"
import styled from "styled-components"

export default function Counter({ favourites }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setCount(favourites)
    }, 1000)
  }, [favourites])
  return (
    <Hearth>
      <svg xmlns="http://www.w3.org/2000/svg" width="24.829" height="23.135" viewBox="0 0 24.829 23.135">
        <path id="Path_154" data-name="Path 154" d="M11.665,21.375l-1.2-1.079a103.581,103.581,0,0,1-7.611-7.582A9.927,9.927,0,0,1,0,6.153,5.957,5.957,0,0,1,1.764,1.764,5.922,5.922,0,0,1,6.124,0,6.632,6.632,0,0,1,9.069.714a6.922,6.922,0,0,1,2.6,2.347A8.458,8.458,0,0,1,14.318.714,6.16,6.16,0,0,1,17.205,0a5.922,5.922,0,0,1,4.36,1.764,5.957,5.957,0,0,1,1.764,4.389,9.927,9.927,0,0,1-2.858,6.561A103.581,103.581,0,0,1,12.86,20.3Zm0-2.3" transform="translate(0.75 0.75)" fill="none" stroke="#bababa" strokeWidth="1.5" />
      </svg>
      <span>({count})</span>
    </Hearth>
  )

}


const Hearth = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    transform: translateY(1px);
    span{
        font-weight: 600;
        font-size: 16px;
    }

    @media (max-width: 840px){
        svg{
        width: 24px !important; 
        height: 24px !important;
        }
    }
`
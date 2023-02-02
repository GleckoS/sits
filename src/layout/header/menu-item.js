import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { myContext } from "../../hooks/provider"

export const Item = ({ onBlur = () => { }, tabIndex = 0, el, func = () => { } }) => (
    <Link activeClassName='active' onBlur={onBlur} tabIndex={tabIndex} className="item" onClick={() => { func(false) }} to={el.url}>
        <span className="styled-link">{el.name}</span>
        {el.icon === 'out' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="19.045" height="19.045" viewBox="0 0 19.045 19.045">
                <g id="Icon_feather-external-link" data-name="Icon feather-external-link" transform="translate(-3.75 -3.439)">
                    <path id="Path_642" data-name="Path 642" d="M18.862,15.7v5.745a1.915,1.915,0,0,1-1.915,1.915H6.415A1.915,1.915,0,0,1,4.5,21.447V10.915A1.915,1.915,0,0,1,6.415,9H12.16" transform="translate(0 -1.628)" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path id="Path_643" data-name="Path 643" d="M22.5,4.5h5.745v5.745" transform="translate(-6.51 0)" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path id="Path_644" data-name="Path 644" d="M15,15.032,25.532,4.5" transform="translate(-3.798 0)" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </g>
            </svg>
        )}
        {el.icon === 'hearth' && (
            <myContext.Consumer>
                {({ favouritesCount }) => (
                    <Hearth>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24.829" height="23.135" viewBox="0 0 24.829 23.135">
                            <path id="Path_154" data-name="Path 154" d="M11.665,21.375l-1.2-1.079a103.581,103.581,0,0,1-7.611-7.582A9.927,9.927,0,0,1,0,6.153,5.957,5.957,0,0,1,1.764,1.764,5.922,5.922,0,0,1,6.124,0,6.632,6.632,0,0,1,9.069.714a6.922,6.922,0,0,1,2.6,2.347A8.458,8.458,0,0,1,14.318.714,6.16,6.16,0,0,1,17.205,0a5.922,5.922,0,0,1,4.36,1.764,5.957,5.957,0,0,1,1.764,4.389,9.927,9.927,0,0,1-2.858,6.561A103.581,103.581,0,0,1,12.86,20.3Zm0-2.3" transform="translate(0.75 0.75)" fill="none" stroke="#bababa" strokeWidth="1.5" />
                        </svg>
                        <span>({favouritesCount})</span>
                    </Hearth>
                )}
            </myContext.Consumer>
        )}
    </Link>
)


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
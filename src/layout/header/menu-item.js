import { Link } from "gatsby"
import React from "react"
import { myContext } from "../../hooks/provider"
import Counter from "./favourite-counter"

export const Item = ({ onBlur = () => { }, tabIndex = 0, el, func = () => { } }) => (
    <Link activeClassName='active' onBlur={onBlur} tabIndex={tabIndex} target={el.url.includes('http') ? '_blank' : ''} rel={el.url.includes('http') ? 'noopener noreferrer' : ''} className="item" onClick={() => { func(false) }} to={el.url}>
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
                    <Counter favourites={favouritesCount} />
                )}
            </myContext.Consumer>
        )}
    </Link>
)
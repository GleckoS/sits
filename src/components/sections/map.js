import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import MapContent from "../organism/map-content"
import { myContext } from "../../hooks/provider"
import { getCookie } from "../../helpers/coockie-manager"
import { StaticImage } from "gatsby-plugin-image"
import { acceptCookiesFirst, acceptCookiesSecond, acceptCookiesThird } from "../../texts/cookie"

// const MapContent = React.lazy(() => import('../organism/map-content'))

function Map({ language, subset, lat, lon, scale, isActive, setIsActive }) {

    const [isCookiesAccepted, setIsCookiesAccepted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsCookiesAccepted(getCookie('marketing') === 'granted')
        }, 1)
    }, [isActive])

    if (!isCookiesAccepted) {
        return (
            <Placeholder>
                <StaticImage className="image" src='./../../../static/map.jpg' alt='background' />
                <h2>
                    {acceptCookiesFirst[language]}
                    <button className="underline" onClick={() => { setIsActive(true) }}> {acceptCookiesSecond[language]} </button><br />
                    {acceptCookiesThird[language]}
                </h2>
            </Placeholder>
        )
    }

    return (
        <MapContent language={language} subset={subset} lat={lat} lon={lon} scale={scale} />
    )
}

export default function MapWrapper({ subset, lat, lon, scale }) {
    return (
        <myContext.Consumer>
            {context => {
                return (
                    <Map subset={subset} lat={lat} lon={lon} scale={scale} isActive={context.isCookiesActive} setIsActive={context.setIsCookiesActive} />
                )
            }}
        </myContext.Consumer>
    )
}

const Placeholder = styled.section`
    padding: 45px 0;
    background-color: #FBFAF7;
    margin-bottom: -120px;
    margin-top: clamp(45px, ${120 / 1194 * 100}vw, 160px);
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .image{
        position: absolute;
        inset: 16px;
        z-index: 0;
        opacity: .2;
    }
    
    h2{
        position: relative;
        z-index: 2;
        text-align: center;
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);

        button{
            border: none;
            background-color: transparent;
            transform: unset;
            font-weight: 300;
        }
    }
`
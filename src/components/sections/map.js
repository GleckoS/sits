import React, { useMemo } from "react"
import styled from "styled-components"
import MapContent from "../organism/map-content"
import { myContext } from "../../hooks/provider"
import { getCookie } from "../../helpers/coockie-manager"
import { StaticImage } from "gatsby-plugin-image"

// const MapContent = React.lazy(() => import('../organism/map-content'))

function Map({ isActive, setIsActive }) {

    const isCookiesAccepted = useMemo(() => {
        return getCookie('marketing') === 'granted'
    }, [isActive])

    if (!isCookiesAccepted) {
        return (
            <Placeholder>
                <StaticImage className="image" src='./../../../static/map.jpg' alt='background'/>
                <h2>
                    Please accept <button className="underline" onClick={() => { setIsActive(true) }}>cookies policy</button><br />
                    to see the map
                </h2>
            </Placeholder>
        )
    }

    return (
        // <Suspense fallback={<div>Loading...</div>}>
        <MapContent />
        // </Suspense>
    )
}

export default function MapWrapper() {
    return (
        <myContext.Consumer>
            {context => {
                return (
                    <Map isActive={context.isCookiesActive} setIsActive={context.setIsCookiesActive} />
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
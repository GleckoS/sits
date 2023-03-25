import React, { useMemo } from "react"
import styled from "styled-components"
import MapContent from "../organism/map-content"
import { myContext } from "../../hooks/provider"
import { getCookie } from "../../helpers/coockie-manager"

// const MapContent = React.lazy(() => import('../organism/map-content'))

function Map({ isActive, setIsActive }) {

    const isCookiesAccepted = useMemo(() => {
        return getCookie('marketing') === 'granted'
    }, [isActive])

    if (isCookiesAccepted) {
        return (
            <Placeholder>
                <h2>
                    Please accept <button onClick={() => { setIsActive(true) }}>cookies policy</button>
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
    
    h2{
        text-align: center;
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);
    }
`
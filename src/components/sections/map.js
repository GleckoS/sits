import React from "react"
import styled from "styled-components"
import MapContent from "../organism/map-content"

export default function Map() {
    if (null) {
        return (
            <Placeholder>
                <h2>To see the map you should accept cookies</h2>
            </Placeholder>
        )
    }

    return (
        <MapContent />
    )
}

const Placeholder = styled.section`
    padding: 45px 0;
    background-color: #FBFAF7;
    margin-bottom: -120px;
    margin-top: clamp(45px, ${120 / 1194 * 100}vw, 160px);
    
    h2{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 clamp(45px, ${75 / 1194 * 100}vw, 110px);
    }
`
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { graphql, useStaticQuery } from "gatsby"
import { Container } from "../atoms/container"
import { csvParser } from './../../helpers/csvParser'
import MarkerClusterGroup from 'react-leaflet-markercluster'
require('react-leaflet-markercluster/dist/styles.min.css')

export default function Map() {

    const { wpPage: { retailers: { csvFile } } } = useStaticQuery(graphql`
    query {
        wpPage(id: {eq: "cG9zdDozMDkxNA=="}) {
            retailers {
                csvFile {
                  id
                  localFile {
                    publicURL
                  }
                }
            }
        }
    }
  `)

    const [retailers, setRetailers] = useState(null)

    useEffect(() => {
        fetch(csvFile.localFile.publicURL)
            .then(res => res.text())
            .then(data => {
                setRetailers(csvParser(data))
            })
    }, [])

    return (
        <Wrapper>
            <Container>
                <Content>
                    <ItemsWrapper>

                    </ItemsWrapper>
                    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup>
                            {retailers?.map(el => (
                                <Marker
                                    position={[el.Latitude, el.Longitude]}>
                                    <Popup>
                                        {el['Shop name']} <br /> {el.Phone}.
                                    </Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Content>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 45px 0;
    background-color: #FBFAF7;
    margin-bottom: -120px;
    margin-top: 160px;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 445px 1370fr;
    grid-gap: 16px;
    .leaflet-container{
        height: 100%;
        aspect-ratio: 1.54453213078;
        position: relative;
        z-index: 0;
    }
`

const ItemsWrapper = styled.div`

`
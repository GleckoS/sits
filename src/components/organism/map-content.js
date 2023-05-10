import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MapContainer, TileLayer } from 'react-leaflet'
import { graphql, useStaticQuery } from "gatsby"
import { Container } from "../atoms/container"
import { csvParser } from './../../helpers/csvParser'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import Marker from "../moleculas/map-marker"
import { motion } from "framer-motion"
import InView from "../sections/in-view-provider"
import { imageTransition, textTransition } from "../../helpers/animation-controller"
import { retailersTitle, filterTitle, buttonTitle } from "../../texts/map"
// import { FullscreenControl } from "react-leaflet-fullscreen";
require('react-leaflet-markercluster/dist/styles.min.css')

const titleAnimation = textTransition(1)
const mapAnimation = imageTransition(2)
const searchAnimation = imageTransition(3)

export default function MapContent({ subset, scale = 4, lat = '52.5144926020739', lon = '13.388333544050788' }) {

    const { wpPage: { retailers: { csvFile, csvFileDiscount } } } = useStaticQuery(graphql`
    query {
        wpPage(id: {eq: "cG9zdDozMDkxNA=="}) {
            retailers {
                csvFile {
                  id
                  localFile {
                    publicURL
                  }
                }
                csvFileDiscount{
                    id
                    localFile {
                      publicURL
                    }
                }
            }
        }
    }
  `)

    const file = subset ? csvFileDiscount || csvFile : csvFile

    const [mapCenter] = useState({ Latitude: lat, Longitude: lon })
    const [retailers, setRetailers] = useState(null)
    const [filtredRetailers, setFiltredRetailers] = useState(null)
    const [filter, changeFilter] = useState('')
    const [activeDot, setActiveDot] = useState(null)

    useEffect(() => {
        fetch(file.localFile.publicURL)
            .then(res => res.text())
            .then(data => {
                let arr = csvParser(data)
                setRetailers(arr)
                setFiltredRetailers(arr)
            })
    }, [file.localFile.publicURL])

    useEffect(() => {
        if (retailers) {
            setActiveDot(null)
            setFiltredRetailers(retailers.filter((el) =>
                el.City.toLowerCase().includes(filter.toLowerCase())
                || el.Country.toLowerCase().includes(filter.toLowerCase())
                || el.Continent.toLowerCase().includes(filter.toLowerCase())
                || el.Address.toLowerCase().includes(filter.toLowerCase())
                || el.Region.toLowerCase().includes(filter.toLowerCase())
            ))
        }
    }, [retailers, filter])

    const map = useRef()

    useEffect(() => {
        if (activeDot !== null) {
            setTimeout(() => {
                map.current.setView([filtredRetailers[activeDot].Latitude, filtredRetailers[activeDot].Longitude], 14)
            }, 1)
        }
    }, [activeDot])

    const markerClick = (index) => {
        setActiveDot(index)
        const offset = document.getElementById('map-item-' + index).offsetTop
        document.getElementById('map-content').scrollTo(0, offset)
    }

    const itemClick = (index) => {
        setActiveDot(index)
        const offset = document.getElementById('map-item-' + index).offsetTop
        document.getElementById('map-content').scrollTo(0, offset)
    }


    return (
        <InView margin="-100px 0px -15px 0px">
            <Wrapper>
                <a className="no-focus" href="#footer" aria-label='skip link to footer' />
                <Container>
                    <Content>
                        <Title variants={titleAnimation}>{retailersTitle['en']}</Title>
                        <InputWrapper>
                            <motion.div variants={searchAnimation}>
                                <input value={filter} onChange={(e) => { changeFilter(e.currentTarget.value) }} placeholder={filterTitle['en']} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                    <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                        <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                            <circle cx="8" cy="8" r="8" stroke="none" />
                                            <circle cx="8" cy="8" r="7" fill="none" />
                                        </g>
                                        <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                    </g>
                                </svg>
                            </motion.div>
                        </InputWrapper>
                        <MapItems>
                            <motion.div variants={searchAnimation}>
                                <ItemsContent id='map-content'>
                                    {filtredRetailers?.map((el, index) => {
                                        if (subset && subset !== el['Country']) {
                                            return null
                                        }
                                        return (
                                            <Item id={'map-item-' + index} onClick={() => { itemClick(index) }} className={activeDot === index ? 'active' : ''} key={index}>
                                                <p className="t">{el['Shop name']}</p>
                                                <p className="l">{el.Address}</p>
                                                <p className="l">{el.City}, {el.Country}</p>
                                                <a href={'tel:' + el.Phone} className="l phone">{el.Phone}</a>
                                                {(el.Website && el.Website !== ' ') && <a className="link underline" rel='noopener noreferrer nofollow' target='_blank' href={el.Website}>{buttonTitle['en']}</a>}
                                            </Item>
                                        )
                                    })}
                                </ItemsContent>
                            </motion.div>
                        </MapItems>
                        <motion.div className="map" variants={mapAnimation}>
                            <MapContainer whenCreated={mapInstance => { map.current = mapInstance }} center={[mapCenter.Latitude, mapCenter.Longitude]} zoom={scale} minZoom={3} maxZoom={16} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                                />
                                {/* <FullscreenControl position='topright'/> */}
                                <MarkerClusterGroup showCoverageOnHover={false}>
                                    {filtredRetailers?.map((el, index) => {
                                        if (subset && subset !== el['Country']) {
                                            return null
                                        }
                                        return (
                                            <Marker key={el['Shop name'] + index} isActive={activeDot === index} map={map} el={el} index={index} markerClick={markerClick} />
                                        )
                                    })}
                                </MarkerClusterGroup>
                            </MapContainer>
                        </motion.div>
                    </Content>
                </Container>
            </Wrapper>
        </InView >
    )
}

const MapItems = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: i;
`

const ItemsContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: auto;
`

const Item = styled.button`
    border: none;
    background-color: transparent;
    display: block;
    text-align: left;
    width: 100%;
    cursor: pointer;

    padding-bottom: 36px;
    padding-top: 36px;
    padding-left: 20px;
    border-bottom: 1px solid #707070;

    transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1), padding .4s cubic-bezier(0.42, 0, 0.58, 1);

    &:focus-visible{
        outline-color: #000000;
        outline-offset: -3px;
        outline: 1px solid;
    }

    &:hover{
        background-color:  #F8F5F0;
    }

    &.active{
        background-color: #F2EEE6;
    }

    p,a{
        font-size: 16px;
        color: #767676 ;
        line-height: 170%;

        &.t{
            color: unset !important;
        }

        &.l{
            font-weight: 300;
        }

        &.phone{
            color: #767676!important;
            transition: color .3s cubic-bezier(0.42, 0, 0.58, 1);

            &:hover{
                color: unset !important;
            }
        }

        &.link{
            padding-bottom: 1px;
            text-decoration: underline;
            font-size: 14px;
            display: block;
            margin-top: 16px;
            width: fit-content;
            @media (max-width: 1024px){
                margin-top: 8px;
            }
        }
    }

    @media (max-width: 1024px){
        padding-bottom: 20px;
        padding-top: 20px;
    }
`

const InputWrapper = styled.div`
    div{
        margin-top: clamp(32px, ${48 / 1194 * 100}vw,  48px);
        display: grid;
        align-items: flex-end;
        grid-template-columns: 1fr 24px;
        border-bottom: 1px solid #707070;
        padding-bottom: 8px;
        height: 43px;
    }
    grid-area: s;

    input{
        border: none;
        background-color: transparent;
        padding: 11px 0 0 0;
        font-size: 20px;
        font-weight: 300;
    }

    @media (max-width: 864px){
        div{
            margin-top: 16px;
        }
    }
`

const Wrapper = styled.section`
    position: relative;
    padding: 45px 0;
    background-color: #FBFAF7;
    margin-bottom: -120px;
    margin-top: clamp(45px, ${120 / 1194 * 100}vw, 160px);

    .leaflet-control{
        border: none;
        box-shadow: 0 3px 6px #00000025;
        span{
            font-family: unset;
            color: #D1D1D1;
        }
    }
    
    /* .leaflet-marker-icon{
        border: none;
        background-color: transparent;
        position: relative;
        svg{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -100%);
        }
    } */

    .marker-cluster{
        background-color: var(--color-brown-light);
        div{
            background-color: var(--color-brown);
            span{
                color: #fff;
                font-weight: 700;
                letter-spacing: 1px;
            }
        }
    }
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 445fr 1370fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
    't m'
    's m'
    'i m';
    grid-gap: 0 16px;
    .map{
        grid-area: m;
    }
    .leaflet-container{
        height: calc(100vh - 96px);
        position: relative;
        z-index: 0;
        max-width: 1370px;

        @media (max-width: 1024px) {
            height: 600px;
        }

        @media (max-width: 864px){
            height: 400px;
            margin-top: 36px;
        }

        @media (max-width: 400px) {
            height: 350px;
        }
    }

    @media (max-width: 864px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto  1fr;
        grid-template-areas: 
        't'
        'm'
        's'
        'i';
    }

    .leaflet-popup-content{
        margin: 0;
        padding: 16px;
    }

    .leaflet-popup-content{
        display: flex;
        align-items: flex-end;
        gap: 36px;
    }

    .leaflet-popup-content-wrapper{
        border-radius: 0;
        border: 1px solid #767676;
        background-color: #F2EEE6;
    }

    .leaflet-popup-tip{
        border: 1px solid #767676;
        background-color: #F2EEE6;
    }

    .leaflet-popup{
        @media (max-width: 864px) {
            display: none;
        }
    }

    .p{
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0.003em;
        color: #31231E;
        margin: 0;
    }

    .p-l{
        color: #31231E;
        margin: 0;
        color: #767676;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0.003em;
            transition: color .3s cubic-bezier(0.42, 0, 0.58, 1);

        &.phone:hover{
            color: unset;
        }
    }

    a{
        color: unset !important;
    }
`

const Title = styled(motion.div)`
    min-width: clamp(300px, ${392 / 1194 * 100}vw, 445px);
    font-size: 20px;
    font-weight: bold;
    grid-area: t;

    @media (max-width: 400px){
        min-width: unset;
    }
`
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { csvParser } from "../../helpers/csvParser"
import { Container } from "../atoms/container"

const searchPlaceholder = {
    en: 'Search'
}

export default function Content({ data: { title, salesRepresentative: { textUnderPageTitle, csvFileSales } } }) {

    const [retailers, setRetailers] = useState(null)
    const [filtredRetailres, setFiltredRetailers] = useState(null)

    useEffect(() => {
        fetch(csvFileSales.localFile.publicURL)
            .then(res => res.text())
            .then(data => {
                let arr = csvParser(data)
                setRetailers(arr)
                setFiltredRetailers(arr)
            })
    }, [csvFileSales.localFile.publicURL])

    const changeFilter = ({ currentTarget: { value } }) => {
        if (value !== '') {
            let arr = retailers.filter(el => {
                let isName = el.Name.toLowerCase().includes(value.toLowerCase())
                let isCountry = el.Country.toLowerCase().includes(value.toLowerCase())
                let isContinent = el.Region.toLowerCase().includes(value.toLowerCase())
                let isRegion = el.Continent.toLowerCase().includes(value.toLowerCase())
                return isName || isContinent || isCountry || isRegion
            })
            setFiltredRetailers(arr)
            return null
        }

        setFiltredRetailers(retailers)
    }

    return (
        <Wrapper>
            <Container>
                <h1>{title}</h1>
                {textUnderPageTitle && <p>{textUnderPageTitle}</p>}
                <Label>
                    <input onChange={(v) => { changeFilter(v) }} placeholder={searchPlaceholder['en']} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                        <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                            <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                <circle cx="8" cy="8" r="8" stroke="none" />
                                <circle cx="8" cy="8" r="7" fill="none" />
                            </g>
                            <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                        </g>
                    </svg>
                </Label>
                <Grid>
                    {filtredRetailres?.map((el, index) => (
                        <Item key={el.Name + index}>
                            <span className="country">{el.Country}</span>
                            <span className="name">{el.Name}</span>
                            {el['Phone 1'] && <a className="underline" href={'tel:' + el['Phone 1']}>{el['Phone 1']}</a>}
                            {el['Phone 2'] && <a className="underline"  href={'tel:' + el['Phone 2']}>{el['Phone 2']}</a>}
                            {el['E-mail'] && <a className="underline"  href={'mailto:' + el['E-mail']}>{el['E-mail']}</a>}
                        </Item>
                    ))}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 450px;
    border-bottom: 1px solid black;
    padding-bottom: 2px;
    margin-bottom: clamp(60px, ${110 / 1194 * 100}vw, 120px);

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        border: none;
        width: 100%;
        padding: 0 2px 2px 0;
        margin: 0 6px 0 0;
        transition: width .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

    @media (max-width: 480px) {
        span{
            display: none;
        }
    }
`

const Wrapper = styled.section`
    h1{
        font-size: clamp(26px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        margin: clamp(20px, ${75 / 1194 * 100}vw, 110px) 0 0 0;
        max-width: 1024px;
        margin-bottom: clamp(12px, ${20 / 1194 * 100}vw, 24px);
    }

    p{
        margin-bottom: clamp(45px, ${75 / 1194 * 100}vw, 110px);
        max-width: 1024px;
        font-size: clamp(16px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: clamp(60px, ${90 / 1194 * 100}vw, 120px) 32px;

    @media (max-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 680px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 450px) {
        grid-template-columns: 1fr;
    }
`

const Item = styled.div`
    span{
        display: block;
    }

    .country{
        margin-bottom: clamp(24px, ${32 / 1194 * 100}vw, 32px);
        font-size: clamp(20px, ${24 / 1194 * 100}vw, 24px);
        text-transform: uppercase;
    }   

    .name{
        margin-bottom: 12px;
        font-size: clamp(20px, ${28 / 1194 * 100}vw, 28px);
        font-weight: 300;
    }

    a{
        font-size: clamp(14px, ${18 / 1194 * 100}vw, 18px);
        display: block;
        margin-bottom: 6px;
        text-underline-offset: 2px;
        width: fit-content;
        text-transform: unset;

        &:last-child{
            margin-bottom: 0;
        }
    }
`
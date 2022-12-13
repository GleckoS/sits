import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Container } from "../../components/atoms/container"

const left = [
    { name: 'ABOUT', url: '/about-sits/' },
    { name: 'CONSCIOUS', url: '/conscious/' },
    { name: 'LEGAL', url: '/legal/' }
]

const right = [
    { name: 'WHERE TO BUY', url: '/where-to-buy/' },
    { name: 'FOR RETAILERS', url: 'https://sitsconnect.pl/' },
    { name: 'SALES REPRESENTATTIVE', url: '/sales-representative/' }
]

export default function Footer() {
    return (
        <Wrapper>
            <BottomPart>
                <Container className="container">
                    <Menu>
                        <Link to='/' className="logo" aria-label='link to homepage'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="161.888" height="50.45" viewBox="0 0 161.888 50.45">
                                <path id="SITS_Logo_black" d="M144.929,50.4c5.671,0,16.959-.909,16.959-12.733,0-10.807-4.654-18.725-17.6-18.725H127.06c-3.263,0-4.226-.8-4.226-2.247,0-2.14,1.444-4.119,4.922-4.119h14.873a1.964,1.964,0,0,0,1.979-1.926V1.926A1.98,1.98,0,0,0,142.736,0h-14.98c-12.3,0-17.6,7.169-17.6,18.725,0,2.568,0,12.786,16.959,12.786h17.227c3.959,0,4.922,2.247,4.922,4.066,0,1.391-.963,2.247-3.8,2.247H114.007a1.918,1.918,0,0,0-1.926,1.926v8.774a1.918,1.918,0,0,0,1.926,1.926h30.922Zm-53.553,0c-10,0-15.087-5.671-15.087-17.28V1.551A1.937,1.937,0,0,1,78.216,0h8.72a1.93,1.93,0,0,1,1.979,1.926V13.161H99.294a1.918,1.918,0,0,1,1.926,1.926v8.774a1.918,1.918,0,0,1-1.926,1.926H88.916v7.757c0,3.531,1.284,4.28,2.461,4.28h13.642A1.93,1.93,0,0,1,107,39.75v8.774a1.93,1.93,0,0,1-1.979,1.926H91.376Zm-34.56-1.872a1.918,1.918,0,0,0,1.926,1.926h8.774a1.918,1.918,0,0,0,1.926-1.926V1.926A1.918,1.918,0,0,0,67.516,0H58.742a1.918,1.918,0,0,0-1.926,1.926ZM34.828,50.4c5.671,0,16.959-.909,16.959-12.733,0-10.807-4.654-18.725-17.6-18.725H16.959c-3.263,0-4.226-.8-4.226-2.247,0-2.14,1.444-4.119,4.922-4.119H32.527a1.964,1.964,0,0,0,1.979-1.926V1.926A1.98,1.98,0,0,0,32.634,0H17.655C5.3,0,0,7.169,0,18.725c0,2.568,0,12.786,16.959,12.786H34.186c3.959,0,4.922,2.247,4.922,4.066,0,1.391-.963,2.247-3.8,2.247H3.8A1.918,1.918,0,0,0,1.872,39.75v8.774A1.918,1.918,0,0,0,3.8,50.45H34.828Z" fill="#c4c4c4" />
                            </svg>
                        </Link>
                        <Center>
                            <div>
                                {left.map(el => (
                                    <React.Fragment key={el.name}>
                                        <Link to={el.url}>{el.name}</Link>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div>

                                {right.map(el => (
                                    <React.Fragment key={el.name}>
                                        <Link to={el.url}>{el.name}</Link>
                                    </React.Fragment>
                                ))}
                            </div>
                        </Center>
                        <Flex>
                            <a href='https://www.facebook.com/sitseu' target='_blank' rel="noreferrer noopener me">
                                <svg xmlns="http://www.w3.org/2000/svg" width="43.21" height="43.21" viewBox="0 0 43.21 43.21">
                                    <path id="SoMe_Icons_Transp_SoMe_Facebook_Trans" d="M25.805,4.52A21.605,21.605,0,1,0,47.41,26.125,21.607,21.607,0,0,0,25.805,4.52ZM31.964,22.3l-.479,4.175c0,.052-.012.1-.02.153a2.342,2.342,0,0,0-.032.294H27.241V39.6H22.12V26.934H18.025V21.817h4.083V20.5c0-.628-.008-1.167.012-1.9a6.188,6.188,0,0,1,1.167-3.661,5.416,5.416,0,0,1,3.029-2.007,7.559,7.559,0,0,1,2-.257h.209c1.058,0,2.152.052,3.347.165H31.9v4.015H30.564c-.35,0-.7,0-1.054,0a4.944,4.944,0,0,0-.889.084,1.49,1.49,0,0,0-1.352,1.521c-.032.555-.036,1.122-.036,1.669v1.677H32.02l-.052.507Z" transform="translate(-4.2 -4.52)" fill="#c4c4c4" />
                                </svg>
                            </a>
                            <a href='https://www.instagram.com/sits_furniture/' target='_blank' rel="noreferrer noopener me">
                                <svg id="SoMe_Icons_Transp_SoMe_Instagram_Trans" xmlns="http://www.w3.org/2000/svg" width="43.21" height="43.21" viewBox="0 0 43.21 43.21">
                                    <path id="Path_33" data-name="Path 33" d="M51.429,48.74a4.2,4.2,0,1,0,4.191,4.2,4.2,4.2,0,0,0-4.191-4.2Z" transform="translate(-29.82 -30.952)" fill="#c4c4c4" />
                                    <path id="Path_34" data-name="Path 34" d="M52.428,36.926a4.591,4.591,0,0,0-4.537-3.174c-3.616,0-7.228-.012-10.845.008a5.107,5.107,0,0,0-1.617.249,4.584,4.584,0,0,0-3.178,4.509q-.012,5.461,0,10.917a4.586,4.586,0,0,0,1.963,3.89,4.668,4.668,0,0,0,2.848.869h10.8a4.9,4.9,0,0,0,1.669-.249,4.655,4.655,0,0,0,3.166-4.554c0-3.608.012-7.212-.008-10.821a5.275,5.275,0,0,0-.249-1.641ZM42.464,50.374a6.4,6.4,0,1,1,6.408-6.408A6.429,6.429,0,0,1,42.464,50.374Zm6.613-11.448a1.61,1.61,0,1,1,1.677-1.585A1.621,1.621,0,0,1,49.077,38.926Z" transform="translate(-20.863 -21.991)" fill="#c4c4c4" />
                                    <path id="Path_35" data-name="Path 35" d="M25.555,4.52A21.605,21.605,0,1,0,47.16,26.125,21.6,21.6,0,0,0,25.555,4.52ZM37.977,32.569c-.04.253-.068.511-.125.76a6.77,6.77,0,0,1-5.121,5.394c-.362.1-.744.137-1.114.205H19.485c-.253-.04-.511-.068-.76-.125a6.77,6.77,0,0,1-5.394-5.121c-.1-.362-.137-.744-.205-1.114V20.437c.04-.253.068-.511.125-.76a6.77,6.77,0,0,1,5.121-5.394c.362-.1.744-.137,1.114-.205H31.617c.253.04.511.068.76.125a6.77,6.77,0,0,1,5.394,5.121c.1.362.137.744.205,1.114V32.569Z" transform="translate(-3.95 -4.52)" fill="#c4c4c4" />
                                </svg>
                            </a>
                            <a href='https://www.youtube.com/@sits4093' target='_blank' rel="noreferrer noopener me">
                                <svg id="SoMe_Icons_Transp_SoMe_YouTube_Trans" xmlns="http://www.w3.org/2000/svg" width="43.21" height="43.21" viewBox="0 0 43.21 43.21">
                                    <path id="Path_36" data-name="Path 36" d="M51.99,56.443c2.124-1.227,4.216-2.434,6.364-3.677-2.148-1.239-4.24-2.45-6.364-3.677v7.349Z" transform="translate(-32.819 -31.161)" fill="#c4c4c4" />
                                    <path id="Path_37" data-name="Path 37" d="M25.935,4.52A21.605,21.605,0,1,0,47.54,26.125,21.607,21.607,0,0,0,25.935,4.52ZM37.991,29.154a23.873,23.873,0,0,1-.334,2.562,2.962,2.962,0,0,1-2.675,2.51c-1.138.145-2.285.245-3.431.294-1.87.08-3.741.109-4.96.141-3.117-.028-5.579-.06-8.033-.241a15.912,15.912,0,0,1-1.85-.225,2.967,2.967,0,0,1-2.494-2.43,19.537,19.537,0,0,1-.382-3.21,38.035,38.035,0,0,1,.044-5.459,23.131,23.131,0,0,1,.3-2.414A3.027,3.027,0,0,1,17.073,18c1.508-.153,3.021-.249,4.537-.314q4.32-.181,8.64,0c1.412.056,2.824.161,4.236.265a3.96,3.96,0,0,1,1.525.378,3.035,3.035,0,0,1,1.645,2.144,20.97,20.97,0,0,1,.386,3.246,37.185,37.185,0,0,1-.048,5.439Z" transform="translate(-4.33 -4.52)" fill="#c4c4c4" />
                                </svg>
                            </a>
                        </Flex>
                    </Menu>
                </Container>
            </BottomPart>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    max-width: 1920px;
    margin: 0 auto;
    margin-top: 120px;
    width: 100%;
    
    a{
        color: #31231E;
        font-size: 18px;
        font-weight: 300;
    }
`

const BottomPart = styled.div`
    padding: 45px 0 60px 0;
    background-color: #F9F5F0;

    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const Center = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    div{
        display: grid;
        grid-gap: 20px;

        &:last-child{
            text-align: right;
        }
    }

    @media (max-width: 640px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 40px;

        div{
            text-align: center !important; 
        }
    }
`

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    grid-gap: 20px;
    width: 100%;
    
    .logo{
        margin-bottom: 20px;
    }

    @media (max-width: 640px){
        align-items: center;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 20px;
`
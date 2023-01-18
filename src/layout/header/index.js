import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { CloseButton } from "../../components/atoms/close-button"
import { Container } from "../../components/atoms/container"
import { Search } from "../../components/moleculas/search"
import { LangChanger } from "./lang-changer"
import { Item } from "./menu-item"
import scrollLock from './../../helpers/scroll-lock'

const linksLeft = {
    en: [
        { name: 'Best Seller', url: '/best-sellers/' },
        { name: 'New Arrivals', url: '/new-arrivals/' },
        { name: 'All products', url: '/products/' },
        { name: 'Sofas', url: '/products/sofas/' },
        { name: 'Armchairs', url: '/products/armchairs/' },
        { name: 'Dining Chairs', url: '/products/dining-chairs/' },
        { name: 'Footstools', url: '/products/footstools/' },
        { name: 'Coffee Tables', url: '/products/coffee-tables/' },
        { name: 'Outdoor Furniture', url: '/products/outdoor-furnitures/' },
        { name: 'Covers', url: '/materials/' },
        { name: 'My Favourites', icon: 'hearth', url: '/favourite/' }
    ]
}

const linksRight = {
    en: [
        { name: 'About Sits', url: '/about-sits/' },
        { name: 'Conscious', url: '/conscious/' },
        { name: 'Furniture Care', url: '/furniture-care/' },
        { name: 'Catalogues', url: '/catalogues/' },
        { name: 'Virtual showroom', url: 'https://showroom.sits.eu/' },
        { name: 'Sales Representative', url: '/sales-representative/' },
        { name: 'Where to Buy', url: '/where-to-buy/' },
        { name: 'Contact', url: '/contact/' },
        // { name: 'For Retailers', icon: 'out', url: 'https://sitsconnect.pl/' },
    ]
}

const languages = [

]

const furnitureTitle = {
    'en': 'FURNITURE'
}

const companyTitle = {
    'en': 'COMPANY'
}

export default function Header() {

    const [isLeftMenuOpened, setLeftMenuOpened] = useState(false)
    const [isRightMenuOpened, setRightMenuOpened] = useState(false)
    const [isMobileMenuOpened, setMobileMenuOpened] = useState(false)

    useEffect(() => {
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape) {
                setLeftMenuOpened(false)
                setRightMenuOpened(false)
            }
        };
    }, [])

    useEffect(() => {
        if (isLeftMenuOpened || isRightMenuOpened || isMobileMenuOpened) {
            scrollLock.enable('menu')
        } else {
            scrollLock.disable('menu')
        }

        return () => {
            scrollLock.disable('menu')
        }
    }, [isLeftMenuOpened, isRightMenuOpened, isMobileMenuOpened])

    const closeAll = () => {
        setLeftMenuOpened(false)
        setRightMenuOpened(false)
        setMobileMenuOpened(false)
    }

    return (
        <>
            <Wrapper>
                <a className="no-focus" href="#main" aria-label='skip link to main content' />
                <Container className="container">
                    <Button className="control-desctop" onClick={() => { setLeftMenuOpened(true); setRightMenuOpened(false) }}>
                        {furnitureTitle['en']}
                    </Button>
                    <LeftMenu className={isLeftMenuOpened ? 'active' : ''}>
                        <Flex>
                            <b>{furnitureTitle['en']}</b>
                            <CloseButton tabIndex={isLeftMenuOpened ? '0' : '-1'} as='button' func={setLeftMenuOpened} val={false} />
                        </Flex>
                        <MenuContent>
                            <Search func={closeAll} tabIndex={isLeftMenuOpened ? '0' : '-1'} />
                            {linksLeft['en'].map((el, index) => (
                                <React.Fragment key={el.name}>
                                    <Item onBlur={() => index === linksLeft['en'].length - 1 ? setLeftMenuOpened() : null} tabIndex={isLeftMenuOpened ? '0' : '-1'} el={el} func={(v) => { setLeftMenuOpened(v) }} />
                                </React.Fragment>
                            ))}
                        </MenuContent>
                    </LeftMenu>
                    <Link onClick={() => { closeAll() }} aria-label='homepage link' to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="133.17" height="41.5" viewBox="0 0 133.17 41.5">
                            <path id="SITS_Logo_black" d="M119.219,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H104.52c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389h12.234a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,117.415,0H105.092C94.97,0,90.613,5.9,90.613,15.4c0,2.112,0,10.518,13.951,10.518h14.171c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H93.782A1.578,1.578,0,0,0,92.2,32.7v7.217A1.578,1.578,0,0,0,93.782,41.5h25.437Zm-44.052,0c-8.23,0-12.41-4.665-12.41-14.215V1.276A1.594,1.594,0,0,1,64.34,0h7.173a1.588,1.588,0,0,1,1.628,1.584v9.242H81.68a1.578,1.578,0,0,1,1.584,1.584v7.217a1.578,1.578,0,0,1-1.584,1.584H73.142v6.381c0,2.9,1.056,3.521,2.024,3.521H86.389A1.588,1.588,0,0,1,88.017,32.7v7.217A1.588,1.588,0,0,1,86.389,41.5H75.166Zm-28.429-1.54A1.578,1.578,0,0,0,48.321,41.5h7.217a1.578,1.578,0,0,0,1.584-1.584V1.584A1.578,1.578,0,0,0,55.539,0H48.321a1.578,1.578,0,0,0-1.584,1.584ZM28.65,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H13.951c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389H26.757a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,26.845,0H14.523C4.357,0,0,5.9,0,15.4c0,2.112,0,10.518,13.951,10.518H28.121c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H3.125A1.578,1.578,0,0,0,1.54,32.7v7.217A1.578,1.578,0,0,0,3.125,41.5H28.65Z" fill="#bababa" />
                        </svg>
                    </Link>
                    <div className="right">
                        <LangChanger />
                        <Button className="control-desctop" onClick={() => { setRightMenuOpened(true); setLeftMenuOpened(false) }}>
                            {companyTitle['en']}
                        </Button>
                    </div>
                    <RightMenu className={isRightMenuOpened ? 'active' : ''}>
                        <Flex >
                            <CloseButton tabIndex={isRightMenuOpened ? '0' : '-1'} as='button' func={setRightMenuOpened} val={false} />
                            <b>{companyTitle['en']}</b>
                        </Flex>
                        <MenuContent className="reverse">
                            {linksRight['en'].map((el, index) => (
                                <React.Fragment key={el.name}>
                                    <Item onBlur={() => index === linksRight['en'].length - 1 ? setRightMenuOpened() : null} tabIndex={isRightMenuOpened ? '0' : '-1'} el={el} func={(v) => { setRightMenuOpened(v) }} />
                                </React.Fragment>
                            ))}
                        </MenuContent>
                    </RightMenu>
                    <Burger aria-label='burger button' className={isMobileMenuOpened ? 'open control-mobile' : "control-mobile"} onClick={() => { setMobileMenuOpened(!isMobileMenuOpened) }}>
                        <span />
                    </Burger>
                    <MobileMenu className={isMobileMenuOpened ? 'active' : ''}>
                        <Container className="content">
                            <Search func={closeAll} tabIndex={isMobileMenuOpened ? '0' : '-1'} />
                            <div className="wrap">
                                {linksLeft['en'].map(el => (
                                    <React.Fragment key={el.name}>
                                        <Item tabIndex={isMobileMenuOpened ? '0' : '-1'} el={el} func={(v) => { setMobileMenuOpened(v) }} />
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="wrap">
                                {linksRight['en'].map(el => (
                                    <React.Fragment key={el.name}>
                                        <Item tabIndex={isMobileMenuOpened ? '0' : '-1'} el={el} func={(v) => { setMobileMenuOpened(v) }} />
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="wrap">
                                <LangChanger onblur={() => { setMobileMenuOpened(false) }} tabIndex={isMobileMenuOpened ? '0' : '-1'} />
                            </div>
                        </Container>
                    </MobileMenu>
                    <Overlay onClick={() => { setLeftMenuOpened(false); setRightMenuOpened(false) }} className={isLeftMenuOpened || isRightMenuOpened ? 'visible' : ''} />
                </Container>
            </Wrapper>
        </>
    )
}

const Overlay = styled.div`
    background-color: rgba(49, 35, 30, 0.35);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 110;
    opacity: 0;
    pointer-events: none;
    transition:  opacity .5s ease-out;

    &.visible{
        opacity: 1;
        pointer-events: all;
    }
`

const Wrapper = styled.header`
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    z-index: 108;
    top: 0;
    padding: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #ddd;
    height: 95px;
    background-color: #fff;

    .right{
        width: fit-content;
        margin-left: auto;
    }

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;

        svg{
            path{
                fill: transparent;
                transition: all .5s ease-out;
            }
        }

        &:hover{
            svg{

                path{
                    fill: #edc53d;
                    stroke: #edc53d;
                }
            }
        }

        &.active{
            font-weight: 600;
            svg{
                path{
                    fill: #edc53d;
                    stroke: #edc53d;
                }
            }
        }
    }

    .control-mobile{
        display: none;
    }

    .container{
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    @media (max-width: 840px) {
        height: 76px;

        .right{
            display: none;
        }

        svg{
            height: 30px;
            width: fit-content;
        }

        .container{
            display: flex;
            justify-content: space-between;
        }

        .control-desctop{
            display: none;
        }
        .control-mobile{
            display: block;
        }
    }
`

const MobileMenu = styled.div`
    display: none;
    @media (max-width: 840px) {
        display: block;
    }
    position: fixed;
    z-index: 111;
    left: 0;
    right: 0;
    top: 75px;
    bottom: 0;
    background-color: #fff;
    transition:  all var(--menu-animation);

    pointer-events: none;
    opacity: 0;
    transform: translateX(50px);

    &.active{
        pointer-events: all;
        opacity: 1;
        transform: translateX(0);
    }

    .wrap{
        margin-top: 40px;
    }

    .content{
        margin-top: 20px;
        max-height: calc(100vh - 96px);
        overflow: auto;

        a{
            display: flex ;
            gap: 10px;
            align-items: center;
            width: fit-content;
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 300;
        }
    }
`

const LeftMenu = styled.div`
    overflow: auto;
    position: fixed;
    z-index: 111;
    width: 400px;
    padding: 42px;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transform: translateX(-500px);
    transition: transform var(--menu-animation);

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        font-size: 16px;
        font-weight: 300;

        &:nth-child(2){
            margin-top: 16px;
        }
    }

    &.active{
        transform: translateX(0);
    }

    @media (max-width: 840px){
        display: none;
    }
`

const MenuContent = styled.div`
    margin-top: 60px;
    display: grid;
    grid-gap: 16px;

    &.reverse{
        text-align: right;
    }
`

const RightMenu = styled.div`
    overflow: auto;
    position: fixed;
    z-index: 111;
    width: 400px;
    padding: 42px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transform: translateX(500px);
    transition:  transform var(--menu-animation);

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        margin-left: auto;
        font-size: 16px;
        font-weight: 300;
    }

    &.active{
        transform: translateX(0);
    }

    @media (max-width: 840px){
        display: none;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    b{
    font-size: 16px;
    letter-spacing: 1px;
    }
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: fit-content;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 300;
`

const Burger = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;

    width: 25px;
    height: 20px;
    position: relative;

    &::after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 2px;
        background-color: #000;
        transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

    span{
        &::after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 2px;
            background-color: #000;
            transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        }

        &::before{
            content: "";
            position: absolute;
            left: 7px;
            right: 0;
            bottom: 0;
            height: 2px;
            background-color: #000;
            transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        }
    }

    &.open{
        &::after{
            right: unset;
            width: 100%;
            left: 0;
            top: 50%;
            transform-origin: 50% 50%;
            transform: rotateZ(45deg);
        }   
        span{
            &::after{
                right: unset;
                width: 100%;
                left: 0;
                transform-origin: 50% 50%;
                transform: rotateZ(-45deg);
            }

            &::before{
                transform: translateX(-100%) ;
                opacity: 0;
            }
        }
    }

`
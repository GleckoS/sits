import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { CloseButton } from "../../components/atoms/close-button"
import { Container } from "../../components/atoms/container"
import { Search } from "../../components/moleculas/search"
import { LangChanger } from "./lang-changer"
import { Item } from "./menu-item"

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
        { name: 'Sales Representative', url: '/sales-representative/' },
        { name: 'Where to Buy', url: '/where-to-buy/' },
        { name: 'Contact', url: '/contact/' },
        { name: 'For Retailers', icon: 'out', url: 'https://sitsconnect.pl/' },
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

    return (
        <>
            <LeftMenu className={isLeftMenuOpened ? 'active' : ''}>
                <Flex>
                    <b>{furnitureTitle['en']}</b>
                    <CloseButton func={setLeftMenuOpened} val={false} />
                </Flex>
                <MenuContent>
                    <Search />
                    {linksLeft['en'].map(el => (
                        <React.Fragment key={el.name}>
                            <Item el={el} func={(v) => { setLeftMenuOpened(v) }} />
                        </React.Fragment>
                    ))}
                </MenuContent>
            </LeftMenu>
            <Wrapper>
                <Container className="container">
                    <Button className="control-desctop" onClick={() => { setLeftMenuOpened(true); setRightMenuOpened(false) }}>
                        {furnitureTitle['en']}
                    </Button>
                    <Link aria-label='homepage link' to='/'>
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
                    <Burger aria-label='burger button' className={isMobileMenuOpened ? 'open control-mobile' : "control-mobile"} onClick={() => { setMobileMenuOpened(!isMobileMenuOpened) }}>
                        <span />
                    </Burger>
                </Container>
            </Wrapper>
            <RightMenu className={isRightMenuOpened ? 'active' : ''}>
                <Flex >
                    <CloseButton func={setRightMenuOpened} val={false} />
                    <b>{companyTitle['en']}</b>
                </Flex>
                <MenuContent className="reverse">
                    {linksRight['en'].map(el => (
                        <React.Fragment key={el.name}>
                            <Item el={el} func={(v) => { setRightMenuOpened(v) }} />
                        </React.Fragment>
                    ))}
                </MenuContent>
            </RightMenu>
            <MobileMenu className={isMobileMenuOpened ? 'active' : ''}>
                <Container className="content">
                    <Search />
                    <div className="wrap">
                        {linksLeft['en'].map(el => (
                            <React.Fragment key={el.name}>
                                <Item el={el} func={(v) => { setMobileMenuOpened(v) }} />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="wrap">
                        {linksRight['en'].map(el => (
                            <React.Fragment key={el.name}>
                                <Item el={el} func={(v) => { setMobileMenuOpened(v) }} />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="wrap">
                        <LangChanger />
                    </div>
                </Container>
            </MobileMenu>
        </>
    )
}

const Wrapper = styled.header`
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    position: sticky;
    z-index: 108;
    top: 0;
    padding: 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    border-bottom: 1px solid #ddd;
    height: 110px;

    .right{
        width: fit-content;
        margin-left: auto;
    }

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        margin-left: auto;
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
    transform: translateX(100%);
    transition:  transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &.active{
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
            font-size: 24px;
            font-weight: 300;

            @media (max-width: 840px) {
                font-size: 20px;
            }
        }
    }
`

const LeftMenu = styled.div`
    position: fixed;
    z-index: 111;
    width: 500px;
    padding: 42px;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transform: translateX(-500px);
    transition:  transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        font-size: 24px;
        font-weight: 300;
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
    grid-gap: 20px;

    &.reverse{
        text-align: right;
    }
`

const RightMenu = styled.div`
    position: fixed;
    z-index: 111;
    width: 500px;
    padding: 42px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transform: translateX(500px);
    transition:  transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    .item{
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        margin-left: auto;
        font-size: 24px;
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
        font-size: clamp(18px, ${18 / 1194 * 100}vw, 20px);
    }
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    font-size: clamp(18px, ${18 / 1194 * 100}vw, 20px);
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
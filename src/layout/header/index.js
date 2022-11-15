import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { CloseButton } from "../../components/atoms/close-button"
import { Container } from "../../components/atoms/container"
import { Search } from "../../components/moleculas/search"

const linksRight = [
    { name: 'Best Seller' },
    { name: 'Sofas' },
    { name: 'Armchairs' },
    { name: 'Dining Chairs' },
    { name: 'Footstools' },
    { name: 'Coffee Tables' },
    { name: 'Outdoor Furniture' },
    { name: 'Covers' },
    { name: 'Inspiration' },
    { name: 'My Favourites' }
]

export default function Header() {

    const [isLeftMenuOpened, setLeftMenuOpened] = useState(false)
    // const [isRightMenuOpened, setRightMenuOpened] = useState(false)

    return (
        <>
            <LeftMenu className={isLeftMenuOpened ? 'active' : ''}>
                <Flex>
                    <b>FURNITURE</b>
                    <CloseButton func={setLeftMenuOpened} val={false} />
                </Flex>
                <MenuContent>
                    <Search />
                    {linksRight.map(el => (
                        <Link to='#'>{el.name}</Link>
                    ))}
                </MenuContent>
            </LeftMenu>
            <Wrapper>
                <Container className="container">
                    <Button onClick={() => { setLeftMenuOpened(true) }}>
                        FURNITURE
                    </Button>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="133.17" height="41.5" viewBox="0 0 133.17 41.5">
                            <path id="SITS_Logo_black" d="M119.219,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H104.52c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389h12.234a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,117.415,0H105.092C94.97,0,90.613,5.9,90.613,15.4c0,2.112,0,10.518,13.951,10.518h14.171c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H93.782A1.578,1.578,0,0,0,92.2,32.7v7.217A1.578,1.578,0,0,0,93.782,41.5h25.437Zm-44.052,0c-8.23,0-12.41-4.665-12.41-14.215V1.276A1.594,1.594,0,0,1,64.34,0h7.173a1.588,1.588,0,0,1,1.628,1.584v9.242H81.68a1.578,1.578,0,0,1,1.584,1.584v7.217a1.578,1.578,0,0,1-1.584,1.584H73.142v6.381c0,2.9,1.056,3.521,2.024,3.521H86.389A1.588,1.588,0,0,1,88.017,32.7v7.217A1.588,1.588,0,0,1,86.389,41.5H75.166Zm-28.429-1.54A1.578,1.578,0,0,0,48.321,41.5h7.217a1.578,1.578,0,0,0,1.584-1.584V1.584A1.578,1.578,0,0,0,55.539,0H48.321a1.578,1.578,0,0,0-1.584,1.584ZM28.65,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H13.951c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389H26.757a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,26.845,0H14.523C4.357,0,0,5.9,0,15.4c0,2.112,0,10.518,13.951,10.518H28.121c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H3.125A1.578,1.578,0,0,0,1.54,32.7v7.217A1.578,1.578,0,0,0,3.125,41.5H28.65Z" fill="#bababa" />
                        </svg>
                    </Link>
                    <Button>
                        COMPANY
                    </Button>
                </Container>
            </Wrapper>
            {/* <RightMenu>

            </RightMenu> */}
        </>
    )
}

const Wrapper = styled.header`
    position: sticky;
    z-index: 100;
    top: 0;
    padding: 32px 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    border-bottom: 1px solid #ddd;
    height: 110px;

    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    &.active{
        transform: translateX(0);
    }
`

const MenuContent = styled.div`
    margin-top: 60px;
    display: grid;
    grid-gap: 20px;
`

// const RightMenu = styled.div`
//     position: fixed;
//     z-index: 101;
//     width: 500px;
//     padding: 42px;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     background-color: #fff;
// `

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`
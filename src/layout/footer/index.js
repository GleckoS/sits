import { motion, useInView } from 'framer-motion'
import { Link } from 'gatsby'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/atoms/container'
import { myContext } from "../../hooks/provider"
import { manageCookies, left, right } from '../../texts'
import { homepageUrl } from '../../texts/urls'

const logoAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: .5, delay: .3 } }
}

const leftColumnAnimation = {
  animate: { transition: { staggerChildren: .075, delayChildren: .5 } }
}

const rightColumnAnimation = {
  animate: { transition: { staggerChildren: .075, delayChildren: .5 } }
}

const leftLinkAnimation = {
  initial: { x: -6, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: .35 } }
}

const rightLinkAnimation = {
  initial: { x: 6, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: .35 } }
}

const socialColumnAnimation = {
  animate: { transition: { staggerChildren: .1, delayChildren: 1 } }
}

const socialAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: .5 } }
}

export default function Footer({ language, setIsCookiesActive }) {

  const section = useRef(null)
  const isSectionInView = useInView(section, { margin: "-100px 0px -100px 0px", once: true })

  return (
    <myContext.Consumer>
      {({ transition }) => {
        return (
          <Wrapper
            initial='initial'
            animate={isSectionInView ? 'animate' : 'initial'}
            exit='exit'
            ref={section}
            id='footer'>
            <BottomPart opacity={transition}>
              <Container className='container'>
                <Menu>
                  <motion.div variants={logoAnimation}>
                    <Link to={homepageUrl[language]} className='logo' aria-label='link to homepage'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='161.888'
                        height='50.45'
                        viewBox='0 0 161.888 50.45'>
                        <path
                          id='SITS_Logo_black'
                          d='M144.929,50.4c5.671,0,16.959-.909,16.959-12.733,0-10.807-4.654-18.725-17.6-18.725H127.06c-3.263,0-4.226-.8-4.226-2.247,0-2.14,1.444-4.119,4.922-4.119h14.873a1.964,1.964,0,0,0,1.979-1.926V1.926A1.98,1.98,0,0,0,142.736,0h-14.98c-12.3,0-17.6,7.169-17.6,18.725,0,2.568,0,12.786,16.959,12.786h17.227c3.959,0,4.922,2.247,4.922,4.066,0,1.391-.963,2.247-3.8,2.247H114.007a1.918,1.918,0,0,0-1.926,1.926v8.774a1.918,1.918,0,0,0,1.926,1.926h30.922Zm-53.553,0c-10,0-15.087-5.671-15.087-17.28V1.551A1.937,1.937,0,0,1,78.216,0h8.72a1.93,1.93,0,0,1,1.979,1.926V13.161H99.294a1.918,1.918,0,0,1,1.926,1.926v8.774a1.918,1.918,0,0,1-1.926,1.926H88.916v7.757c0,3.531,1.284,4.28,2.461,4.28h13.642A1.93,1.93,0,0,1,107,39.75v8.774a1.93,1.93,0,0,1-1.979,1.926H91.376Zm-34.56-1.872a1.918,1.918,0,0,0,1.926,1.926h8.774a1.918,1.918,0,0,0,1.926-1.926V1.926A1.918,1.918,0,0,0,67.516,0H58.742a1.918,1.918,0,0,0-1.926,1.926ZM34.828,50.4c5.671,0,16.959-.909,16.959-12.733,0-10.807-4.654-18.725-17.6-18.725H16.959c-3.263,0-4.226-.8-4.226-2.247,0-2.14,1.444-4.119,4.922-4.119H32.527a1.964,1.964,0,0,0,1.979-1.926V1.926A1.98,1.98,0,0,0,32.634,0H17.655C5.3,0,0,7.169,0,18.725c0,2.568,0,12.786,16.959,12.786H34.186c3.959,0,4.922,2.247,4.922,4.066,0,1.391-.963,2.247-3.8,2.247H3.8A1.918,1.918,0,0,0,1.872,39.75v8.774A1.918,1.918,0,0,0,3.8,50.45H34.828Z'
                          fill='#c4c4c4'
                        />
                      </svg>
                    </Link>
                  </motion.div>
                  <Center>
                    <motion.div variants={leftColumnAnimation}>
                      {left[language].map((el) => (
                        <motion.div variants={leftLinkAnimation} key={el.name}>
                          <Link className='left styled-link' to={el.url}>
                            {el.name}
                          </Link>
                        </motion.div>
                      ))}
                      <motion.button variants={leftLinkAnimation} className='left styled-link' onClick={() => { setIsCookiesActive(true) }}>
                        {manageCookies[language]}
                      </motion.button>
                    </motion.div>
                    <motion.div variants={rightColumnAnimation}>
                      {right[language].map((el) => (
                        <motion.div variants={rightLinkAnimation} key={el.name}>
                          <Link className='right styled-link' to={el.url}>
                            {el.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </Center>
                  <Flex variants={socialColumnAnimation}>
                    <motion.a
                      variants={socialAnimation}
                      className='path'
                      aria-label='facebook'
                      href='https://www.facebook.com/sitseu'
                      target='_blank'
                      rel='noreferrer noopener me'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='43.21'
                        height='43.21'
                        viewBox='0 0 43.21 43.21'>
                        <path
                          id='SoMe_Icons_Transp_SoMe_Facebook_Trans'
                          d='M25.805,4.52A21.605,21.605,0,1,0,47.41,26.125,21.607,21.607,0,0,0,25.805,4.52ZM31.964,22.3l-.479,4.175c0,.052-.012.1-.02.153a2.342,2.342,0,0,0-.032.294H27.241V39.6H22.12V26.934H18.025V21.817h4.083V20.5c0-.628-.008-1.167.012-1.9a6.188,6.188,0,0,1,1.167-3.661,5.416,5.416,0,0,1,3.029-2.007,7.559,7.559,0,0,1,2-.257h.209c1.058,0,2.152.052,3.347.165H31.9v4.015H30.564c-.35,0-.7,0-1.054,0a4.944,4.944,0,0,0-.889.084,1.49,1.49,0,0,0-1.352,1.521c-.032.555-.036,1.122-.036,1.669v1.677H32.02l-.052.507Z'
                          transform='translate(-4.2 -4.52)'
                          fill='#c4c4c4'
                        />
                      </svg>
                    </motion.a>
                    <motion.a
                      variants={socialAnimation}
                      className='rect'
                      aria-label='instagram'
                      href='https://www.instagram.com/sits_furniture/'
                      target='_blank'
                      rel='noreferrer noopener me'>
                      <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.900391" y="0.900391" width="43.2" height="43.2" rx="21.6" fill="#C4C4C4" />
                        <path d="M22.4982 19.127C20.5112 19.127 18.8896 20.6428 18.8896 22.5003C18.8896 24.3577 20.5112 25.8735 22.4982 25.8735C24.4852 25.8735 26.1068 24.3577 26.1068 22.5003C26.1068 20.6428 24.4852 19.127 22.4982 19.127ZM33.3213 22.5003C33.3213 21.1034 33.3349 19.7191 33.2509 18.3248C33.167 16.7052 32.7718 15.2679 31.5048 14.0835C30.2352 12.8967 28.7003 12.5298 26.9677 12.4513C25.4733 12.3729 23.9925 12.3855 22.5009 12.3855C21.0066 12.3855 19.5258 12.3729 18.0341 12.4513C16.3016 12.5298 14.7639 12.8992 13.497 14.0835C12.2273 15.2704 11.8348 16.7052 11.7509 18.3248C11.667 19.7217 11.6805 21.1059 11.6805 22.5003C11.6805 23.8946 11.667 25.2814 11.7509 26.6757C11.8348 28.2953 12.23 29.7327 13.497 30.917C14.7666 32.1038 16.3016 32.4708 18.0341 32.5492C19.5285 32.6277 21.0093 32.615 22.5009 32.615C23.9953 32.615 25.4761 32.6277 26.9677 32.5492C28.7003 32.4708 30.2379 32.1013 31.5048 30.917C32.7745 29.7301 33.167 28.2953 33.2509 26.6757C33.3376 25.2814 33.3213 23.8971 33.3213 22.5003ZM22.4982 27.6905C19.4256 27.6905 16.9459 25.3725 16.9459 22.5003C16.9459 19.628 19.4256 17.31 22.4982 17.31C25.5708 17.31 28.0505 19.628 28.0505 22.5003C28.0505 25.3725 25.5708 27.6905 22.4982 27.6905ZM28.2779 18.3096C27.5605 18.3096 26.9812 17.7681 26.9812 17.0975C26.9812 16.4269 27.5605 15.8853 28.2779 15.8853C28.9953 15.8853 29.5747 16.4269 29.5747 17.0975C29.5749 17.2567 29.5415 17.4144 29.4764 17.5616C29.4113 17.7087 29.3158 17.8424 29.1953 17.955C29.0749 18.0676 28.9318 18.1569 28.7744 18.2178C28.617 18.2786 28.4483 18.3098 28.2779 18.3096Z" fill="#F8F5F0" />
                      </svg>
                    </motion.a>
                    <motion.a
                      variants={socialAnimation}
                      className='path'
                      aria-label='youtube'
                      href='https://www.youtube.com/@sits_furniture'
                      target='_blank'
                      rel='noreferrer noopener me'>
                      <svg
                        id='SoMe_Icons_Transp_SoMe_YouTube_Trans'
                        xmlns='http://www.w3.org/2000/svg'
                        width='43.21'
                        height='43.21'
                        viewBox='0 0 43.21 43.21'>
                        <path
                          id='Path_36'
                          data-name='Path 36'
                          d='M51.99,56.443c2.124-1.227,4.216-2.434,6.364-3.677-2.148-1.239-4.24-2.45-6.364-3.677v7.349Z'
                          transform='translate(-32.819 -31.161)'
                          fill='#c4c4c4'
                        />
                        <path
                          id='Path_37'
                          data-name='Path 37'
                          d='M25.935,4.52A21.605,21.605,0,1,0,47.54,26.125,21.607,21.607,0,0,0,25.935,4.52ZM37.991,29.154a23.873,23.873,0,0,1-.334,2.562,2.962,2.962,0,0,1-2.675,2.51c-1.138.145-2.285.245-3.431.294-1.87.08-3.741.109-4.96.141-3.117-.028-5.579-.06-8.033-.241a15.912,15.912,0,0,1-1.85-.225,2.967,2.967,0,0,1-2.494-2.43,19.537,19.537,0,0,1-.382-3.21,38.035,38.035,0,0,1,.044-5.459,23.131,23.131,0,0,1,.3-2.414A3.027,3.027,0,0,1,17.073,18c1.508-.153,3.021-.249,4.537-.314q4.32-.181,8.64,0c1.412.056,2.824.161,4.236.265a3.96,3.96,0,0,1,1.525.378,3.035,3.035,0,0,1,1.645,2.144,20.97,20.97,0,0,1,.386,3.246,37.185,37.185,0,0,1-.048,5.439Z'
                          transform='translate(-4.33 -4.52)'
                          fill='#c4c4c4'
                        />
                      </svg>
                    </motion.a>
                  </Flex>
                </Menu>
              </Container>
            </BottomPart>
          </Wrapper>
        )
      }}
    </myContext.Consumer>
  )
}

const Wrapper = styled(motion.footer)`
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 120px;
  width: 100%;

  a, button {
    color: #31231e;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
  }
`

const BottomPart = styled(motion.div)`
  padding: 45px 0 60px 0;
  background-color: #f9f5f0;
  transition: opacity .4s cubic-bezier(0.42, 0, 0.58, 1);

    opacity: ${props => props.opacity};
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Center = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    display: grid;
    align-items: center;
    grid-gap: 12px;
  }

  button{
    border: none;
    background-color: transparent;
  }

  .right {
    text-align: right;
    margin-left: auto;
  }

  a{
    height: fit-content;
  }

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 40px;

    div {
      text-align: center !important;
      margin: 0 auto;

      a, button{
        margin: 0 auto;
      }
    }
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  grid-gap: 20px;
  width: 100%;

  .logo {
    margin-bottom: 20px;
    svg {
      max-height: 42px;
      width: fit-content;
    }
    /* svg path{
            transition: fill .4s cubic-bezier(0.42, 0, 0.58, 1);
        } */
    /* &:hover{
            svg path{
                fill: #EDC53D;
            }
        } */
  }

  @media (max-width: 640px) {
    align-items: center;
  }
`

const Flex = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;


  a{
    width: 43.2px;
    height: 43.2px;
    border-radius: 50%;
  }

  svg path, svg rect {
    transition: fill 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }
  .path:hover {
    svg path {
      fill: #edc53d;
    }
  }

  .rect:hover {
    svg{
      rect{
        fill: #edc53d;
      }
    }
  }
`

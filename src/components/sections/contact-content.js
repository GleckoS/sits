import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { Form } from "../organism/contact-form"
import { motion } from "framer-motion"
import InView from "./in-view-provider"
import { textTransition } from "../../helpers/animation-controller"

const titleAnimation = textTransition(1)

const formAnimation = {
    initial: { opacity: 1 },
    animate: { transition: { staggerChildren: .1, delayChildren: .5 } }
}

const inputAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .6 } }
}

const titleSecondAnimation = textTransition(6)

const textSecondAnimation = textTransition(7)

const titleThirdAnimation = textTransition(8)

const textThirdAnimation = textTransition(9)

const gridAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: .1, delayChildren: 2.1 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0% 1px' },
    animate: {
        opacity: 1, transition: { duration: .4 },
        transitionEnd: {
            backgroundSize: '80% 1px',
            transition: { duration: .4 }
        }
    }
}

export default function Content({ language, data: { privacyPolicyText, leftColumnTitle, leftColumnContent, rightColumnTitle, rightColumnContent, rightColumnFilesToUpload } }) {
    return (
        <InView>
            <Wrapper>
                <Container className="container">
                    <Grid>
                        <Form language={language} privacyPolicyText={privacyPolicyText} inputAnimation={inputAnimation} titleAnimation={titleAnimation} formAnimation={formAnimation} />
                        <div className="left">
                            <motion.h2 variants={titleSecondAnimation}>{leftColumnTitle}</motion.h2>
                            <motion.div variants={textSecondAnimation} className="content" dangerouslySetInnerHTML={{ __html: leftColumnContent }} />
                        </div>
                        <div className="right">
                            <motion.h2 variants={titleThirdAnimation}>{rightColumnTitle}</motion.h2>
                            <motion.div variants={textThirdAnimation} className="content" dangerouslySetInnerHTML={{ __html: rightColumnContent }} />
                            <motion.div variants={gridAnimation} className="files">
                                {rightColumnFilesToUpload?.map(el => (
                                    <motion.a variants={linkAnimation} className="file" download href={el.file.localFile.publicURL}>
                                        {el.file.localFile.publicURL.includes('.pdf') ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.297" height="22.513" viewBox="0 0 19.297 22.513">
                                                <path id="Icon_metro-file-pdf" data-name="Icon metro-file-pdf" d="M21.013,6.977a2.923,2.923,0,0,1,.6.955,2.9,2.9,0,0,1,.251,1.106V23.511a1.2,1.2,0,0,1-1.206,1.206H3.777a1.2,1.2,0,0,1-1.206-1.206V3.41A1.2,1.2,0,0,1,3.777,2.2H15.033a2.9,2.9,0,0,1,1.106.251,2.923,2.923,0,0,1,.955.6ZM15.435,3.912V8.636h4.724a1.373,1.373,0,0,0-.276-.515L15.95,4.188a1.372,1.372,0,0,0-.515-.276Zm4.824,19.2V10.244H15.033a1.2,1.2,0,0,1-1.206-1.206V3.812H4.179v19.3H20.26ZM13.8,15.659a9.559,9.559,0,0,0,1.055.7,12.466,12.466,0,0,1,1.47-.088q1.847,0,2.224.616a.607.607,0,0,1,.025.653.036.036,0,0,1-.013.025l-.025.025v.013q-.075.477-.892.477a5.182,5.182,0,0,1-1.445-.251,9.161,9.161,0,0,1-1.633-.666,22.622,22.622,0,0,0-4.925,1.043Q7.722,21.5,6.6,21.5a.731.731,0,0,1-.352-.088l-.3-.151q-.013-.013-.075-.063a.519.519,0,0,1-.075-.452,2.728,2.728,0,0,1,.7-1.15,6.072,6.072,0,0,1,1.658-1.212.183.183,0,0,1,.289.075.072.072,0,0,1,.025.05q.653-1.068,1.344-2.475a19.175,19.175,0,0,0,1.307-3.292,10.156,10.156,0,0,1-.383-2,4.885,4.885,0,0,1,.082-1.6q.138-.5.528-.5h.276a.53.53,0,0,1,.44.188,1,1,0,0,1,.113.854.272.272,0,0,1-.05.1.327.327,0,0,1,.013.1v.377a16.451,16.451,0,0,1-.176,2.412,6.356,6.356,0,0,0,1.834,2.99ZM6.566,20.822a5.547,5.547,0,0,0,1.721-1.985,7.162,7.162,0,0,0-1.1,1.055A4.176,4.176,0,0,0,6.566,20.822Zm5-11.558a3.736,3.736,0,0,0-.025,1.658q.013-.088.088-.553,0-.038.088-.54a.283.283,0,0,1,.05-.1.036.036,0,0,1-.013-.025.025.025,0,0,0-.006-.019.025.025,0,0,1-.006-.019.723.723,0,0,0-.163-.452.036.036,0,0,1-.013.025v.025Zm-1.558,8.3a18.427,18.427,0,0,1,3.568-1.018,1.9,1.9,0,0,1-.163-.119,2.25,2.25,0,0,1-.2-.17,6.655,6.655,0,0,1-1.6-2.211,16.788,16.788,0,0,1-1.043,2.475q-.377.7-.565,1.043Zm8.116-.2a3.006,3.006,0,0,0-1.759-.3,4.752,4.752,0,0,0,1.558.352,1.218,1.218,0,0,0,.226-.013q0-.013-.025-.038Z" transform="translate(-2.571 -2.203)" opacity="0.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                                                <g clip-path="url(#clip0_136_21)">
                                                    <path d="M18.442 5.51725C18.7021 5.79361 18.9059 6.11798 19.042 6.47225C19.1977 6.8208 19.283 7.19666 19.293 7.57825V22.0512C19.2938 22.2098 19.2632 22.367 19.2029 22.5137C19.1425 22.6604 19.0537 22.7936 18.9416 22.9058C18.8294 23.0179 18.6962 23.1067 18.5495 23.1671C18.4028 23.2274 18.2456 23.258 18.087 23.2572H1.20604C1.04745 23.258 0.890264 23.2274 0.743587 23.1671C0.596909 23.1067 0.463645 23.0179 0.351498 22.9058C0.239352 22.7936 0.150549 22.6604 0.0902236 22.5137C0.029898 22.367 -0.000753187 22.2098 4.17979e-05 22.0512V1.95025C-0.0012847 1.79132 0.0289742 1.63371 0.0890618 1.48656C0.149149 1.33942 0.237869 1.20568 0.350068 1.09311C0.462268 0.980541 0.595712 0.891379 0.742654 0.830805C0.889595 0.77023 1.04711 0.739449 1.20604 0.74025H12.462C12.8436 0.75031 13.2195 0.835607 13.568 0.99125C13.9223 1.12736 14.2467 1.33115 14.523 1.59125L18.442 5.51725ZM12.864 2.45225V7.17625H17.588C17.5341 6.98677 17.4399 6.81113 17.312 6.66125L13.379 2.72825C13.2292 2.60034 13.0535 2.5062 12.864 2.45225ZM17.688 21.6522V8.78425H12.462C12.3034 8.78505 12.1463 8.75439 11.9996 8.69407C11.8529 8.63374 11.7196 8.54494 11.6075 8.43279C11.4954 8.32065 11.4065 8.18738 11.3462 8.0407C11.2859 7.89403 11.2552 7.73685 11.256 7.57825V2.35225H1.60804V21.6522H17.688Z" fill="#808080" />
                                                    <rect x="3.37207" y="10.3525" width="12.0975" height="1.6123" rx="0.806152" fill="#808080" />
                                                    <rect x="3.37207" y="13.9648" width="12.0975" height="1.6123" rx="0.806152" fill="#808080" />
                                                    <rect x="3.37207" y="17.5771" width="12.0975" height="1.6123" rx="0.806152" fill="#808080" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37207 3.24805C3.81979 3.24805 3.37207 3.69576 3.37207 4.24805V7.7041C3.37207 8.25639 3.81979 8.7041 4.37207 8.7041H8.43958C8.99186 8.7041 9.43958 8.25639 9.43958 7.7041V4.24805C9.43958 3.69576 8.99186 3.24805 8.43958 3.24805H4.37207ZM4.24237 4.46582L5.16016 7.71777H5.74132L6.39393 5.43601H6.41934L7.07036 7.71777H7.65152L8.56931 4.46582H7.93575L7.34983 6.85715H7.32125L6.69404 4.46582H6.11764L5.49202 6.85556H5.46185L4.87593 4.46582H4.24237Z" fill="#808080" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_136_21">
                                                        <rect width="19.29" height="22.52" fill="white" transform="translate(0 0.740234)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        )}
                                        <div>
                                            <span className="underline">{el.file.title} </span><span>({el.file.localFile.prettySize})</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.section`
    margin-top: clamp(20px, ${70 / 1194 * 100}vw, 90px);

    .container{
        overflow: hidden;
    }

    .files{
        margin-top: 30px;
        display: grid;
        grid-gap: 16px;

        .file{
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 16px;
            align-items: center;
            width: fit-content;
            text-decoration: unset;

            div{
                display: flex;
                background-size: inherit;

                .underline{
                    background-size: inherit;
                }
            }

            span{
                text-transform: unset;
                min-width: fit-content;
            }

            &:hover{
                span{
                    background-size: 100% 1px;
                }
            }
        }
    }

    h1, h2{
        font-size: clamp(26px, ${44 / 1366 * 100}vw, 44px);
        font-weight: 300;
        font-family: 'Ivy';
        margin-bottom: clamp(16px, ${32 / 1366 * 100}vw, 32px);

        @media (max-width: 768px) {
            font-size: clamp(26px, ${26 / 320 * 100}vw, 44px);
        }
    }

    .left, .right{
        margin-bottom: 5px;
        div{
            display: grid;
            grid-gap: 16px;
            *{
                font-size: clamp(16px, ${20 / 1366 * 100}vw, 20px);
                font-weight: 300;

                @media (max-width: 768px) {
                    font-size: clamp(16px, ${16 / 320 * 100}vw, 20px);
                }
            }
            &.content a{
                width: fit-content;
                position: relative;
                padding-bottom: 3px;
                text-decoration: unset !important;

                transition: background-size 0.5s cubic-bezier(0.42, 0, 0.58, 1);

                background-image: linear-gradient(#222b40, #222b40);
                background-size: 80% 1px;
                background-position: left bottom;
                background-repeat: no-repeat;

                &:hover {
                    background-size: 100% 1px;
                }
            }
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 475px 475px;
    grid-template-areas: 
        'f l'
        'f r';
    grid-gap: 64px 260px;
    width: fit-content;
    margin: 0 auto;

    @media (max-width: 1366px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: clamp(32px, ${64 / 1366 * 100}vw, 64px) clamp(40px, ${40 / 640 * 100}vw, 64px);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:
       'f'
       'l'
       'r' ;
       max-width: 530px;
       margin: 0 auto;
    }

    .left{
        grid-area: l;

        /* @media (max-width: 1194px) {
            max-width: 536px;
        } */
    }

    .right{
        grid-area: r;

        /* @media (max-width: 1194px) {
            margin-right: clamp(0px,  ${100 / 1194 * 100}vw, 100px);
        } */

        @media (max-width: 864px) {
            margin-right: 0;
        }
    }

    .form{
        grid-area: f;

        /* @media (max-width: 1194px){
            max-width: unset;
            min-width: unset;
        } */
    }
`
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

export default function Hero({ data: { backgroundVideo, pageTitle, linkUnderPageTitle, backgroundImage } }) {
    return (
        <Wrapper>
            {/* <GatsbyImage className="background" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} /> */}
            <video className="background" playsInline autoPlay muted loop poster={backgroundImage.localFile.publicURL} >
                <source src={backgroundVideo.localFile.publicURL} type="video/mp4" />
            </video>
            <div className="content">
                <h1 className="title">{pageTitle}</h1>
                {linkUnderPageTitle
                    ? <Link className="link" to={linkUnderPageTitle.url} target={linkUnderPageTitle ? linkUnderPageTitle : null}>{linkUnderPageTitle.title}</Link>
                    : null}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    position: relative;
    overflow: hidden;
    .background{
        max-width: 100%;
        min-width: 964px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        min-height: 530px;
    }
    .content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        text-align: center;

        @media (max-width: 500px) {
            width: 100%;
            padding: 0 20px;
        }
    }
    .title{
        font-family: 'Ivy';
        font-size: clamp(48px, ${71 / 768 * 100}vw, 88px);
        color: #fff;
        font-weight: 300;
        margin-bottom: 30px;
    }
    .link{
        font-size: 18px;
        color: #fff;
        text-transform: uppercase;
        position: relative;
        padding-bottom: 3px;
        text-decoration: underline;
    }
`
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

export default function Hero({ data: { pageTitle, linkUnderPageTitle, backgroundImage } }) {
    return (
        <Wrapper>
            <GatsbyImage className="background" image={backgroundImage.localFile.childImageSharp.gatsbyImageData} alt={backgroundImage.altText} />
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
    .background{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        min-height: 600px;
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
        text-shadow: 0px 0px 2px #222;
        margin-bottom: 30px;
    }
    .link{
        font-size: 18px;
        color: #fff;
        text-transform: uppercase;
        position: relative;
        padding-bottom: 3px;
        text-shadow: 0px 0px 2px #222;
        text-decoration: underline;
    }
`
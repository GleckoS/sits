import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"

export default function Video({ data: { video, previewImage } }) {

    const videoRef = useRef()
    const [isPaused, changeIsPaused] = useState(true)

    const videoState = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
            changeIsPaused(false)
        } else {
            videoRef.current.pause()
            changeIsPaused(true)
        }
    }

    return (
        <Wrapper>
            <Container className="container" onClick={() => { videoState() }}>
                <video ref={videoRef} className="background" playsInline muted loop poster={previewImage.localFile.publicURL} >
                    <source src={video.localFile.publicURL} type="video/mp4" />
                </video>
                <button className={isPaused ? 'content visible' : 'content'} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="164" height="164" viewBox="0 0 164 164">
                        <g id="Group_133" data-name="Group 133" transform="translate(-863 -616)">
                            <circle id="Ellipse_94" data-name="Ellipse 94" cx="82" cy="82" r="82" transform="translate(863 616)" fill="#fff" opacity="0.404" />
                            <path id="Polygon_1" data-name="Polygon 1" d="M39.175,7.457a5,5,0,0,1,8.65,0l34.82,60.034A5,5,0,0,1,78.32,75H8.68a5,5,0,0,1-4.325-7.509Z" transform="translate(993 654) rotate(90)" fill="#fff" />
                        </g>
                    </svg>
                </button>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding-top: 60px;
    position: relative;

    @media (max-width: 480px) {
        .container{
            padding: 0;
        }
    }
    video{
        width: 100%;
    }
    .content{
        position: absolute;
        border: none;
        background-color: transparent;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

        &.visible{
            opacity: 1;
        }
    }
`
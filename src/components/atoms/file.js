import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

export const File = ({ variants, file }) => {
    if (!file?.localFile?.publicURL) {
        return null
    }

    return (
        <Wrapper variants={variants} href={file.localFile.publicURL} download>
            <svg xmlns="http://www.w3.org/2000/svg" width="19.297" height="22.513" viewBox="0 0 19.297 22.513">
                <path id="Icon_metro-file-pdf" data-name="Icon metro-file-pdf" d="M21.013,6.977a2.923,2.923,0,0,1,.6.955,2.9,2.9,0,0,1,.251,1.106V23.511a1.2,1.2,0,0,1-1.206,1.206H3.777a1.2,1.2,0,0,1-1.206-1.206V3.41A1.2,1.2,0,0,1,3.777,2.2H15.033a2.9,2.9,0,0,1,1.106.251,2.923,2.923,0,0,1,.955.6ZM15.435,3.912V8.636h4.724a1.373,1.373,0,0,0-.276-.515L15.95,4.188a1.372,1.372,0,0,0-.515-.276Zm4.824,19.2V10.244H15.033a1.2,1.2,0,0,1-1.206-1.206V3.812H4.179v19.3H20.26ZM13.8,15.659a9.559,9.559,0,0,0,1.055.7,12.466,12.466,0,0,1,1.47-.088q1.847,0,2.224.616a.607.607,0,0,1,.025.653.036.036,0,0,1-.013.025l-.025.025v.013q-.075.477-.892.477a5.182,5.182,0,0,1-1.445-.251,9.161,9.161,0,0,1-1.633-.666,22.622,22.622,0,0,0-4.925,1.043Q7.722,21.5,6.6,21.5a.731.731,0,0,1-.352-.088l-.3-.151q-.013-.013-.075-.063a.519.519,0,0,1-.075-.452,2.728,2.728,0,0,1,.7-1.15,6.072,6.072,0,0,1,1.658-1.212.183.183,0,0,1,.289.075.072.072,0,0,1,.025.05q.653-1.068,1.344-2.475a19.175,19.175,0,0,0,1.307-3.292,10.156,10.156,0,0,1-.383-2,4.885,4.885,0,0,1,.082-1.6q.138-.5.528-.5h.276a.53.53,0,0,1,.44.188,1,1,0,0,1,.113.854.272.272,0,0,1-.05.1.327.327,0,0,1,.013.1v.377a16.451,16.451,0,0,1-.176,2.412,6.356,6.356,0,0,0,1.834,2.99ZM6.566,20.822a5.547,5.547,0,0,0,1.721-1.985,7.162,7.162,0,0,0-1.1,1.055A4.176,4.176,0,0,0,6.566,20.822Zm5-11.558a3.736,3.736,0,0,0-.025,1.658q.013-.088.088-.553,0-.038.088-.54a.283.283,0,0,1,.05-.1.036.036,0,0,1-.013-.025.025.025,0,0,0-.006-.019.025.025,0,0,1-.006-.019.723.723,0,0,0-.163-.452.036.036,0,0,1-.013.025v.025Zm-1.558,8.3a18.427,18.427,0,0,1,3.568-1.018,1.9,1.9,0,0,1-.163-.119,2.25,2.25,0,0,1-.2-.17,6.655,6.655,0,0,1-1.6-2.211,16.788,16.788,0,0,1-1.043,2.475q-.377.7-.565,1.043Zm8.116-.2a3.006,3.006,0,0,0-1.759-.3,4.752,4.752,0,0,0,1.558.352,1.218,1.218,0,0,0,.226-.013q0-.013-.025-.038Z" transform="translate(-2.571 -2.204)" opacity="0.5" />
            </svg>
            <span className="underline">{file.title}</span>
        </Wrapper>
    )
}

const Wrapper = styled(motion.a)`
    margin-top: 10px;
    width: fit-content;
    display: grid;
    grid-template-columns: 20px auto;
    grid-gap: 16px;

    svg{
        margin-top: 3px;
    }

    span{
        ${props => props.variants && `
            background-size: inherit;
        `}
        
        font-size: 18px;
        text-transform: unset;
    }

    &:hover{
        span{
            background-size: 100% 1px;
        }
    }

`
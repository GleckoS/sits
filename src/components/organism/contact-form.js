import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import styled from "styled-components"
import { Label } from "../moleculas/label"

const title = {
    en: 'Contact us'
}

const email = {
    placeholder: {
        en: 'Your e-Mail',
    },
    label: {
        en: 'E-Mail'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21.223" height="24.789" viewBox="0 0 21.223 24.789">
    <g id="envelope.open" opacity="0.5">
      <rect id="Rectangle_566" data-name="Rectangle 566" width="21.223" height="24.789" opacity="0"/>
      <path id="Path_650" data-name="Path 650" d="M2.879,22.116H18.345a2.548,2.548,0,0,0,2.879-2.855V9.3a2.778,2.778,0,0,0-1.269-2.755L12.466.795A2.993,2.993,0,0,0,10.612,0,3.007,3.007,0,0,0,8.757.795L1.272,6.541A2.774,2.774,0,0,0,0,9.3v9.965A2.543,2.543,0,0,0,2.879,22.116ZM2.85,20.961a1.52,1.52,0,0,1-1.7-1.709V9.123A1.729,1.729,0,0,1,1.97,7.4L9.382,1.742a1.929,1.929,0,0,1,1.229-.549,1.957,1.957,0,0,1,1.232.549L19.257,7.4a1.733,1.733,0,0,1,.812,1.718V19.252a1.531,1.531,0,0,1-1.692,1.709ZM.916,20.455l.807.795,7.732-7.6a1.713,1.713,0,0,1,1.194-.59,1.719,1.719,0,0,1,1.2.59l7.732,7.6.8-.795-7.85-7.683a2.634,2.634,0,0,0-1.88-.872,2.622,2.622,0,0,0-1.877.872Zm6.463-6.061.8-.785L1.793,7.368l-.8.795Zm5.739-.785.8.785,6.39-6.231-.8-.795Z" fill="rgba(0,0,0,0.85)"/>
    </g>
  </svg>
  `
}

const name = {
    placeholder: {
        en: 'Your name',
    },
    label: {
        en: 'Name'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16.831" height="18.166" viewBox="0 0 16.831 18.166">
    <g id="person" opacity="0.5">
      <rect id="Rectangle_567" data-name="Rectangle 567" width="16.83" height="18.166" opacity="0"/>
      <path id="Path_651" data-name="Path 651" d="M2.108,18.166H14.719c1.43,0,2.111-.452,2.111-1.444,0-2.543-3.208-6.175-8.413-6.175S0,14.178,0,16.722C0,17.714.678,18.166,2.108,18.166Zm-.3-1.145c-.442,0-.6-.108-.6-.422,0-1.85,2.614-4.908,7.208-4.908s7.2,3.059,7.2,4.908c0,.314-.149.422-.591.422Zm6.62-7.8a4.3,4.3,0,0,0,4.1-4.5A4.241,4.241,0,0,0,8.426.34a4.263,4.263,0,0,0-4.1,4.395A4.3,4.3,0,0,0,8.426,9.221Zm0-1.145A3.126,3.126,0,0,1,5.531,4.735a3.077,3.077,0,0,1,2.895-3.25,3.069,3.069,0,0,1,2.895,3.24A3.134,3.134,0,0,1,8.426,8.076Z" fill="rgba(0,0,0,0.85)"/>
    </g>
  </svg>
  `
}

const country = {
    placeholder: {
        en: 'Your country',
    },
    label: {
        en: 'Country'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16.787" height="18.673" viewBox="0 0 16.787 18.673">
    <g id="flag" opacity="0.5">
      <rect id="Rectangle_568" data-name="Rectangle 568" width="16.787" height="18.673" opacity="0"/>
      <path id="Path_652" data-name="Path 652" d="M.579,18.673a.571.571,0,0,0,.576-.572v-5.69a8.327,8.327,0,0,1,2.725-.459c3.547,0,5.728,1.752,9.156,1.752a5.774,5.774,0,0,0,2.741-.483,1.5,1.5,0,0,0,1.01-1.446V2.064a.732.732,0,0,0-.831-.718,16.879,16.879,0,0,1-3.045.428C9.483,1.774,7.306.022,3.758.022A5.8,5.8,0,0,0,1.01.5,1.5,1.5,0,0,0,0,1.944V18.1A.582.582,0,0,0,.579,18.673Zm12.456-6.116c-3.3,0-5.511-1.749-9.156-1.749a8.34,8.34,0,0,0-2.725.391V1.95c.152-.343,1.071-.781,2.6-.781,3.425,0,5.626,1.746,9.153,1.746a9.551,9.551,0,0,0,2.728-.361v9.222C15.484,12.12,14.565,12.557,13.035,12.557Z" fill="rgba(0,0,0,0.85)"/>
    </g>
  </svg>
  `
}

const subject = {
    placeholder: {
        en: 'Choose',
    },
    label: {
        en: 'Subject'
    },
    subjects: {
        en: []
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="19.345" height="14.021" viewBox="0 0 19.345 14.021">
    <g id="list.bullet" opacity="0.5">
      <rect id="Rectangle_569" data-name="Rectangle 569" width="19.345" height="14.021" opacity="0"/>
      <path id="Path_653" data-name="Path 653" d="M5.314,1.783H18.738a.6.6,0,0,0,.606-.6.6.6,0,0,0-.606-.606H5.314a.592.592,0,0,0-.606.606A.591.591,0,0,0,5.314,1.783Zm0,5.839H18.738a.6.6,0,1,0,0-1.206H5.314a.6.6,0,1,0,0,1.206Zm0,5.835H18.738a.6.6,0,1,0,0-1.206H5.314a.6.6,0,1,0,0,1.206Z" fill="rgba(0,0,0,0.85)"/>
      <path id="Path_654" data-name="Path 654" d="M1.164,2.338A1.161,1.161,0,1,0,0,1.18,1.157,1.157,0,0,0,1.164,2.338Zm0,5.842A1.164,1.164,0,1,0,0,7.015,1.158,1.158,0,0,0,1.164,8.179Zm0,5.842A1.164,1.164,0,1,0,0,12.857,1.164,1.164,0,0,0,1.164,14.021Z" fill="rgba(0,0,0,0.85)"/>
    </g>
  </svg>
  `
}

const message = {
    placeholder: {
        en: 'Your message',
    },
    label: {
        en: 'Message'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21.797" height="19.95" viewBox="0 0 21.797 19.95">
    <g id="message" opacity="0.5">
      <rect id="Rectangle_570" data-name="Rectangle 570" width="21.797" height="19.95" opacity="0"/>
      <path id="Path_655" data-name="Path 655" d="M4.141,19.944c1.209,0,3.675-1.137,5.609-2.432C16.29,17.91,21.8,14.1,21.8,8.783,21.8,3.932,16.963,0,10.9,0S0,3.932,0,8.783a8.414,8.414,0,0,0,5.128,7.449A18.234,18.234,0,0,1,3.5,18.617C3,19.246,3.26,19.944,4.141,19.944ZM4.852,18.7c-.078.02-.1-.032-.046-.1A15.47,15.47,0,0,0,6.46,16.3a.624.624,0,0,0-.32-.965c-3.06-1.42-4.891-3.807-4.891-6.547,0-4.167,4.283-7.544,9.65-7.544s9.657,3.377,9.657,7.544-4.28,7.543-9.657,7.543c-.316,0-.692-.022-1.134-.047a1.363,1.363,0,0,0-.882.308A19.957,19.957,0,0,1,4.852,18.7Z" fill="rgba(0,0,0,0.85)"/>
    </g>
  </svg>
  `
}

const submit = {
    en: 'Send your message'
}

const thans = {
    en: 'Thanks for your message!'
}

const reply = {
    en: 'We’ll get back to you as soon as possible.'
}

export const Form = ({ inputAnimation, titleAnimation, formAnimation }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [isSended, setIsSended] = useState(false)

    const onSubmit = data => {
        setIsSended(true)

        let url = 'https://sits.kryptonum.co.uk/wp-json/contact-form-7/v1/contact-forms/34241/feedback'

        let body = new FormData()

        body.append('email', data.email)
        body.append("message", data.message)
        body.append('fullname', data.name)
        body.append('country', data.country)
        body.append('subject', data.subject)

        axios.post(url, body)
            .then((res) => {
                if (res.status === 200) {
                    setIsSended(true)
                    reset()
                } else {
                    toast('There was some problem with contact form, try later')
                }
            })
    }

    return (
        <Wrapper className="form">
            <motion.h1 variants={titleAnimation}>{title['en']}</motion.h1>
            <motion.form autocomplete="off" variants={formAnimation} onSubmit={handleSubmit(onSubmit)}>
                <Label variants={inputAnimation} register={register} errors={errors} name='email' obj={email} />
                <Label variants={inputAnimation} register={register} errors={errors} name='name' obj={name} />
                <Label variants={inputAnimation} register={register} errors={errors} name='country' obj={country} />
                <Label variants={inputAnimation} register={register} errors={errors} name='subject' obj={subject} />
                <Label variants={inputAnimation} register={register} errors={errors} name='message' obj={message} rows='3' />
                <Checkbox variants={inputAnimation}>
                    <input {...register('check', { required: true })} type='checkbox' />
                    <div className="check" />
                    <span>By sending message, I agree to the <Link to='/privacy-policy/' className='underline'>privacy policy.</Link></span>
                </Checkbox>
                <Submit variants={inputAnimation}>{submit['en']}</Submit>
                <AnimatePresence mode="wait">
                    {isSended && (
                        <Success initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {duration: .5} }} exit={{ opacity: 0 }} className={isSended ? 'sended' : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="71.15" height="71.174" viewBox="0 0 71.15 71.174">
                                <g id="checkmark.circle" opacity="0.2">
                                    <rect id="Rectangle_621" data-name="Rectangle 621" width="71.149" height="71.174" opacity="0" />
                                    <path id="Path_673" data-name="Path 673" d="M35.569,71.139a35.784,35.784,0,0,0,35.58-35.569A35.789,35.789,0,0,0,35.545,0,35.76,35.76,0,0,0,0,35.569,35.8,35.8,0,0,0,35.569,71.139Zm0-4.6A30.975,30.975,0,1,1,66.55,35.569,30.881,30.881,0,0,1,35.569,66.539Z" fill="rgba(0,0,0,0.85)" />
                                    <path id="Path_674" data-name="Path 674" d="M17.742,37.577a2.589,2.589,0,0,0,2.2-1.26L37.162,9.4a3.907,3.907,0,0,0,.631-1.72,2.152,2.152,0,0,0-2.237-2.042A2.467,2.467,0,0,0,33.648,6.86L17.633,32.228,9.448,22.151a2.291,2.291,0,0,0-2.02-1.078,2.126,2.126,0,0,0-2.115,2.153,2.9,2.9,0,0,0,.651,1.726l9.478,11.365A2.731,2.731,0,0,0,17.742,37.577Z" transform="translate(13.982 14.838)" fill="rgba(0,0,0,0.85)" />
                                </g>
                            </svg>
                            <span className="title">{thans['en']}</span>
                            <span className="text">{reply['en']}</span>
                        </Success>
                    )}
                </AnimatePresence>
            </motion.form>
        </Wrapper>
    )
}

const Checkbox = styled(motion.label)`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    position: relative;

    input{
        width: 30px;
        height: 30px;
        position: absolute;
        user-select: none;
        opacity: 0;
    }

    input:checked ~ .check {
        &::after{
            transform: unset;
        }

        &::before{
            opacity: 1;
        }
    }

    .check{
        width: 30px;
        height: 30px;
        border: 2px solid #767676;
        border-radius: 3px;
        position: relative;

        &::after{
            content: "✓";
            position: absolute;
            color: #767676;
            left: 3px;
            top: -8px;
            font-size: 40px;
            transform: scale(0);
            transform-origin: 50% 80%;
            transition: transform .3s ease-out;
        }

        &::before{
            content: '';
            position: absolute;
            width: 13px;
            height: 13px;
            right: -2px;
            top: -2px;
            background-color: #fff;
            transition: opacity .1s ease-out;
            opacity: 0;
        }
    }

    span{
        font-weight: 400;
        font-size: 20px;
        line-height: 150% ;
        font-feature-settings: 'pnum' on, 'onum' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss04' on;
        color: #767676;

        a{
            display: inline-block;
            text-transform: unset;
            color: #767676;
            background-image: linear-gradient(#767676, #767676);
        }
    }
`

const Success = styled(motion.div)`
    position: absolute;
    left: 0;
    top: 0;
    bottom: -5px;
    right: 0;

    @media (max-width: 640px) {
        left: -24px;
        right: -24px;
    }

    background-color: #FFF;
    opacity: 1;
    pointer-events: all;
    transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);


    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    svg{
        margin: 0 auto;
    }

    .title{
        margin-top: 32px;
        margin-bottom: 20px;

        font-size: clamp(28px, ${40 / 1194 * 100}vw, 40px);
        font-family: 'Ivy';
        font-weight: 300;
        padding: 0 24px;
    }

    .text{
        font-size: clamp(18px, ${24 / 1194 * 100}vw, 24px);
        font-weight: 300;
        padding: 0 24px;
    }
`

const Wrapper = styled.div`
    
    form{
        position: relative;
        display: grid;
        grid-gap: 48px;

        /* @media (max-width: 1194px) {
            grid-gap: 24px 48px;
            max-width: unset;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            grid-template-areas:
            'first second'
            'third fourth'
            'fifth fifth'
            '. sixth';

            label:nth-child(1){
                grid-area: first;
            }
            label:nth-child(2){
                grid-area: second;
            }
            label:nth-child(3){
                grid-area: third;
            }
            label:nth-child(4){
                grid-area: fourth;
            }
            label:nth-child(5){
                grid-area: fifth;
            }

            button{
                grid-area: sixth;
            }
        } */

        @media (max-width: 820px) {
            grid-template-columns: 1fr;
            grid-template-areas: unset;

            *{
                grid-area: unset !important;
            }
        }
        
    }
`

const Submit = styled(motion.button)`
    width: fit-content;
    padding: 17px;
    width: 100%;
    background-color: var(--color-brown);

    font-size: clamp(14px, ${18 / 1024 * 100}vw, 18px);
    text-transform: uppercase;
    color: #fff;
    border: none;
    display: block;
    cursor: pointer;
    transition: background-color .4s ease-out;

    &:hover{
        background-color: #785836;
    }

    &:active{
        background-color: #785836;
    }

    &:focus-visible{
        outline: 1px solid #88643D;
        outline-offset: 2px;
    }

    &:disabled{
        background: #CFCFCF;
    }
`
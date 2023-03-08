import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import styled from "styled-components"
import { Label } from "../moleculas/label"
import { email, name, country, subject, message, errorMessage , title, submit, thans, reply} from "../../texts/contact"

export const Form = ({ language, privacyPolicyText, inputAnimation, titleAnimation, formAnimation }) => {
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
            <motion.h1 variants={titleAnimation}>{title[language]}</motion.h1>
            <motion.form autocomplete="off" variants={formAnimation} onSubmit={handleSubmit(onSubmit)}>
                <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name='email' obj={email} />
                <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name='name' obj={name} />
                <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name='country' obj={country} />
                <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name='subject' obj={subject} />
                <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name='message' obj={message} rows='3' />
                <Checkbox variants={inputAnimation}>
                    <input {...register('check', { required: true })} type='checkbox' />
                    <div className="check" />
                    <span dangerouslySetInnerHTML={{__html: privacyPolicyText}}/>
                    <AnimatePresence mode='wait'>
                        {errors['check'] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="erorr-span">
                            {errorMessage[language]}
                        </motion.span>}
                    </AnimatePresence>
                </Checkbox>
                <Submit variants={inputAnimation}>{submit[language]}</Submit>
                <AnimatePresence mode="wait">
                    {isSended && (
                        <Success initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: .5 } }} exit={{ opacity: 0 }} className={isSended ? 'sended' : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="71.15" height="71.174" viewBox="0 0 71.15 71.174">
                                <g id="checkmark.circle" opacity="0.2">
                                    <rect id="Rectangle_621" data-name="Rectangle 621" width="71.149" height="71.174" opacity="0" />
                                    <path id="Path_673" data-name="Path 673" d="M35.569,71.139a35.784,35.784,0,0,0,35.58-35.569A35.789,35.789,0,0,0,35.545,0,35.76,35.76,0,0,0,0,35.569,35.8,35.8,0,0,0,35.569,71.139Zm0-4.6A30.975,30.975,0,1,1,66.55,35.569,30.881,30.881,0,0,1,35.569,66.539Z" fill="rgba(0,0,0,0.85)" />
                                    <path id="Path_674" data-name="Path 674" d="M17.742,37.577a2.589,2.589,0,0,0,2.2-1.26L37.162,9.4a3.907,3.907,0,0,0,.631-1.72,2.152,2.152,0,0,0-2.237-2.042A2.467,2.467,0,0,0,33.648,6.86L17.633,32.228,9.448,22.151a2.291,2.291,0,0,0-2.02-1.078,2.126,2.126,0,0,0-2.115,2.153,2.9,2.9,0,0,0,.651,1.726l9.478,11.365A2.731,2.731,0,0,0,17.742,37.577Z" transform="translate(13.982 14.838)" fill="rgba(0,0,0,0.85)" />
                                </g>
                            </svg>
                            <span className="title">{thans[language]}</span>
                            <span className="text">{reply[language]}</span>
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
            transform: translate(-50%, -50%) scale(1);
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
            content: "";
            position: absolute;
            color: #767676;
            font-size: 40px;
            width: 16px;
            height: 16px;
            background-color: #767676;
            border-radius: 2px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            transform-origin: 50% 50%;
            transition: transform .3s cubic-bezier(0.42, 0, 0.58, 1);
        }
    }

    span{
        font-weight: 400;
        font-size: clamp(16px, ${20 / 1194 * 100}vw, 20px);
        line-height: 150% ;
        font-feature-settings: 'pnum' on, 'onum' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss04' on;
        color: #767676;

        a{
            display: inline-block;
            color: #767676;
            background-image: linear-gradient(#767676, #767676);

            width: fit-content;
            position: relative;
            padding-bottom: 3px;
            text-decoration: unset !important;

            transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

            background-size: 80% 1px;
            background-position: left bottom;
            background-repeat: no-repeat;

            &:hover {
                background-size: 100% 1px !important;
            }
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

    .erorr-span{
        font-size: 14px;
        color: #A32D2D;
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        transform: translateY(-100%);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    
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
    transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1);

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
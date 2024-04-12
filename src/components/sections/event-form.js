import InView from "./in-view-provider";
import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion";
import {
  imageTransition,
  textTransition,
} from "../../helpers/animation-controller";
import {
  email,
  name,
  company,
  errorMessage,
  thans,
  reply,
  sign_up,
} from "../../texts/contact";
import { Label } from "../moleculas/label";
import { useForm } from "react-hook-form";

const imageAnimation = imageTransition(1);
const titleAnimation = textTransition(2);
const textAnimation = textTransition(3);
const textAnimation2 = textTransition(4);
const textAnimation3 = textTransition(5);
const textAnimation4 = textTransition(7);

const formAnimation = {
  initial: { opacity: 1 },
  animate: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } },
};

const inputAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

export default function EventForm({ language, title, event }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSended, setIsSended] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data) => {
    setIsSended(false);

    data.groupID = event.idOfContactForm;

    try {
      const response = await fetch("/api/mailerlite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // temporary part of code
        fetch("https://hook.eu1.make.com/uqlnrh5dmtssoshxvjfv4i4cbgn86ywk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        })
          .then((res) => res.json())
          .then((res) => {
            setIsSended(true);
            reset();
          })
          .catch((err) => {
            alert("Error while adding to google sheet");
          });
      } else {
        alert(responseData.error);
      }
    } catch {
      alert("Error while submitting form");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <InView>
      <Wrapper>
        <motion.div variants={imageAnimation}>
          <GatsbyImage
            image={
              event.imageNextToContactForm.localFile.childImageSharp
                .gatsbyImageData
            }
            alt={event.imageNextToContactForm.altText}
          />
        </motion.div>
        <Container className="container">
          <motion.h1 variants={titleAnimation} className="title">
            {title}
          </motion.h1>
          <motion.p
            className="text"
            variants={textAnimation}
            dangerouslySetInnerHTML={{ __html: event.dates }}
          />
          <motion.div
            className="text"
            variants={textAnimation2}
            dangerouslySetInnerHTML={{ __html: event.placeAtEventForm }}
          />
          <motion.div
            className="additional"
            variants={textAnimation3}
            dangerouslySetInnerHTML={{
              __html: event.additionalDescriptionAboveForm,
            }}
          />
          <motion.form
            autocomplete="off"
            variants={formAnimation}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label
              language={language}
              variants={inputAnimation}
              register={register}
              required={true}
              errors={errors}
              name="name"
              obj={name}
            />
            <Label
              language={language}
              variants={inputAnimation}
              register={register}
              required={true}
              errors={errors}
              name="email"
              pattern={
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
              obj={email}
            />
            <Label
              language={language}
              variants={inputAnimation}
              register={register}
              required={true}
              errors={errors}
              name="company"
              obj={company}
            />
            <Checkbox variants={inputAnimation}>
              <input
                {...register("check", { required: true })}
                type="checkbox"
              />
              <div className="check" />
              <span
                dangerouslySetInnerHTML={{
                  __html: event.privacyPolicyCheckboxText,
                }}
              />
              <AnimatePresence mode="wait">
                {errors["check"] && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="erorr-span"
                  >
                    {errorMessage[language]}
                  </motion.span>
                )}
              </AnimatePresence>
            </Checkbox>
            <Submit disabled={isSending} variants={inputAnimation}>
              {sign_up[language]}
            </Submit>
            <AnimatePresence mode="wait">
              {isSended && (
                <Success
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                  className={isSended ? "sended" : ""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="71.15"
                    height="71.174"
                    viewBox="0 0 71.15 71.174"
                  >
                    <g id="checkmark.circle" opacity="0.2">
                      <rect
                        id="Rectangle_621"
                        data-name="Rectangle 621"
                        width="71.149"
                        height="71.174"
                        opacity="0"
                      />
                      <path
                        id="Path_673"
                        data-name="Path 673"
                        d="M35.569,71.139a35.784,35.784,0,0,0,35.58-35.569A35.789,35.789,0,0,0,35.545,0,35.76,35.76,0,0,0,0,35.569,35.8,35.8,0,0,0,35.569,71.139Zm0-4.6A30.975,30.975,0,1,1,66.55,35.569,30.881,30.881,0,0,1,35.569,66.539Z"
                        fill="rgba(0,0,0,0.85)"
                      />
                      <path
                        id="Path_674"
                        data-name="Path 674"
                        d="M17.742,37.577a2.589,2.589,0,0,0,2.2-1.26L37.162,9.4a3.907,3.907,0,0,0,.631-1.72,2.152,2.152,0,0,0-2.237-2.042A2.467,2.467,0,0,0,33.648,6.86L17.633,32.228,9.448,22.151a2.291,2.291,0,0,0-2.02-1.078,2.126,2.126,0,0,0-2.115,2.153,2.9,2.9,0,0,0,.651,1.726l9.478,11.365A2.731,2.731,0,0,0,17.742,37.577Z"
                        transform="translate(13.982 14.838)"
                        fill="rgba(0,0,0,0.85)"
                      />
                    </g>
                  </svg>
                  <span className="title">
                    {event.successFormSubmitTitle ?? thans[language]}
                  </span>
                  <span className="text">
                    {event.successFormSubmitText ?? reply[language]}
                  </span>
                </Success>
              )}
            </AnimatePresence>
          </motion.form>
          <motion.div
            className="additional-grey"
            variants={textAnimation4}
            dangerouslySetInnerHTML={{
              __html: event.additionalDescriptionUnderForm,
            }}
          />
        </Container>
      </Wrapper>
    </InView>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 964px) {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto;
    width: 100%;
    max-width: 532px;
    gap: 64px;
  }

  .erorr-span {
    font-size: 14px;
    color: #a32d2d;
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    transform: translateY(-100%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .title {
    font-family: "Ivy";
    font-size: clamp(36px, ${(36 / 1240) * 100}vw, 40px);
    font-weight: 300;
    margin-bottom: clamp(12px, ${(12 / 1194) * 100}vw, 24px);

    @media (max-width: 1240px) {
      font-size: clamp(28px, ${(40 / 1194) * 100}vw, 40px);
      margin-bottom: 24px;
    }
  }

  .text {
    margin-top: 12px;

    color: #767676;
    font-size: clamp(16px, 2.01005vw, 24px);
    line-height: 150%;

    p {
      color: #767676;
      font-size: clamp(16px, 2.01005vw, 24px);
      line-height: 150%;
    }

    p + p {
      margin-top: 12px;
    }
  }

  .additional {
    margin-top: 48px;
    margin-bottom: 48px;
    p {
      color: #31231e;
      font-size: clamp(20px, 2.01005vw, 24px);
      line-height: 150%;
    }
  }

  .additional-grey {
    margin-top: 16px;
    p {
      color: #767676;
      font-size: clamp(16px, 2.01005vw, 20px);
      line-height: 150%;
      text-align: center;
    }
  }

  .container {
    max-width: 560px;
    margin-top: clamp(45px, ${(120 / 1200) * 100}vw, 120px);
    margin-left: 0;
  }

  form {
    position: relative;
    display: grid;
    grid-gap: 48px;
  }
`;

const Checkbox = styled(motion.label)`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  position: relative;

  input {
    width: 30px;
    height: 30px;
    position: absolute;
    user-select: none;
    opacity: 0;
  }

  input:focus ~ .check {
    outline: 2px solid var(--color-brown);
  }

  input:checked ~ .check {
    &::after {
      transform: translate(-50%, -50%) scale(1);
    }

    &::before {
      opacity: 1;
    }
  }

  .check {
    width: 30px;
    height: 30px;
    border: 2px solid #767676;
    border-radius: 3px;
    position: relative;

    &::after {
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
      transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);
    }
  }

  span {
    font-weight: 400;
    font-size: clamp(16px, ${(20 / 1194) * 100}vw, 20px);
    line-height: 150%;
    font-feature-settings: "pnum" on, "onum" on, "ss01" on, "ss02" on, "ss03" on,
      "ss04" on;
    color: #767676;

    a {
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
`;

const Success = styled(motion.div)`
  position: absolute;
  left: -5px;
  top: -30px;
  bottom: -5px;
  right: -5px;

  @media (max-width: 640px) {
    left: -24px;
    right: -24px;
  }

  background-color: #fff;
  opacity: 1;
  pointer-events: all;
  transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  svg {
    margin: 0 auto;
  }

  .title {
    margin-top: 32px;
    margin-bottom: 20px;

    font-size: clamp(28px, ${(40 / 1194) * 100}vw, 40px);
    font-family: "Ivy";
    font-weight: 300;
    padding: 0 24px;
  }

  .text {
    font-size: clamp(18px, ${(24 / 1194) * 100}vw, 24px);
    font-weight: 300;
    padding: 0 24px;
  }
`;

const Submit = styled(motion.button)`
  width: fit-content;
  padding: 17px;
  width: 100%;
  background-color: var(--color-brown);

  font-size: clamp(14px, ${(18 / 1024) * 100}vw, 18px);
  text-transform: uppercase;
  color: #fff;
  border: none;
  display: block;
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    background-color: #785836;
  }

  &:active {
    background-color: #785836;
  }

  &:focus-visible {
    outline: 1px solid #88643d;
    outline-offset: 2px;
  }

  &:disabled {
    background: #cfcfcf;
  }
`;

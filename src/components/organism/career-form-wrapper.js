import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { backToForm } from '../../texts/career';
import BackToFormButton from './back-to-form-button';
import CareerForm from './career-form';
export default function CareerFormWrapper({ data: { language, selectedCity, jobTitle, receiverEmail } }) {
  const [isFormInView, setIsFormInView] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  console.log(receiverEmail);

  console.log(isFormSubmitted);

  useEffect(() => {
    console.log('useEffect');
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (isFormSubmitted) {
      setIsFormInView(false);
      observer.unobserve(formElement);
    }

    const formElement = document.getElementById('career-form');
    console.log(formElement);
    if (formElement) {
      observer.observe(formElement);
    }

    return () => {
      if (formElement) {
        observer.unobserve(formElement);
      }
    };
  }, []);

  return (
    <>
      <Wrapper className="form-wrapper">
        <CareerForm id="career-form" data={{ language, selectedCity, receiverEmail, jobTitle, onFormSubmit: () => setIsFormSubmitted(true) }} />
      </Wrapper>
      <BackToFormButton className="back-to-form-button" to="#form" isVisible={!isFormInView && !isFormSubmitted}>
        {backToForm[language]}
      </BackToFormButton>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #fff;
  padding: 40px 40px 32px;
  align-self: start;
  width: 100%;
  width: clamp(320px, calc(320vw / 7.68), 519px);

  @media (max-width: 1149px) {
    grid-column: 1/-1;
    width: 100%;
    padding: clamp(32px, calc(40vw / 7.68), 40px) clamp(16px, calc(40vw / 7.68), 40px);
    div.form {
      max-width: 608px;
      margin: 0 auto;
    }
  }

  @media (max-width: 499px) {
    width: calc(100% + 2 * var(--page-margin));
    margin-left: calc(-1 * var(--page-margin));
  }
`;

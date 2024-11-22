import React from 'react';
import styled from 'styled-components';
import CitySelector from '../moleculas/city-selector';
import CareerForm from '../organism/career-form';

export default function NoSpecificOffer({ data: { heading, paragraph, language, citiesAvailable } }) {
  return (
    <Wrapper className="max-width">
      <header>
        <MailIcon />
        <h2>{heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: paragraph }} />
      </header>
      <CareerForm data={{ language, citiesAvailable }} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: flex-start;
  gap: clamp(48px, calc(64vw / 7.68), 64px) 48px;
  justify-content: space-between;
  padding: clamp(80px, calc(96vw / 7.68), 128px) 0;
  margin-bottom: -120px;
  header {
    max-width: 407px;

    svg {
      margin-bottom: clamp(20px, calc(24vw / 7.68), 24px);
    }

    h2 {
      margin-bottom: clamp(20px, calc(24vw / 7.68), 24px);
      font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
      font-weight: 400;
      line-height: 1.6;
    }

    p {
      font-size: calc(16rem / 16);
      line-height: 1.5;
    }
  }

  div.form {
    flex-shrink: 0;
    width: 100%;
    max-width: 519px;
    padding: 40px 40px 32px;

    @media (max-width: 459px) {
      padding: 0;

      div.city-selector {
        margin-bottom: -12px;
      }
    }
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    header,
    form {
      max-width: 528px;
    }
  }
`;

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none">
    <path stroke="#886B4B" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M29.335 17.333v-8a4 4 0 0 0-4-4H6.668a4 4 0 0 0-4 4v13.333a4 4 0 0 0 4 4h9.333M4.668 7.446l10.01 8.833a2 2 0 0 0 2.646 0l10.01-8.832m2 17.886a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
  </svg>
);

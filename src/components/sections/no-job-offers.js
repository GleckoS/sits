import React from 'react';
import styled from 'styled-components';
import OffersHeader from '../moleculas/offers-header';
import CareerForm from '../organism/career-form';

export default function NoJobOffers({ data: { heading, paragraph, listTitle, language, citiesAvailable } }) {
  return (
    <Wrapper id="offers">
      <div className="header-wrapper max-width">
        <OffersHeader data={{ heading: listTitle, offersLength: 0 }} />
      </div>
      <div className="content-wrapper max-width">
        <h3>{heading}</h3>
        <div className="paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
        <CareerForm data={{ language, citiesAvailable }} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: #f8f5f1;
  margin-bottom: -120px;
  scroll-margin-top: 80px;
  padding: clamp(48px, calc(80vw / 7.68), 80px) 0;
  div.header-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header {
    margin-bottom: clamp(24px, calc(40vw / 7.68), 56px);
  }

  div.form {
    width: 100%;
    max-width: 519px;
    padding: 40px 40px 32px;

    @media (max-width: 799px) {
      padding: 40px clamp(16px, calc(40vw / 7.68), 40px) 32px;
    }

    @media (max-width: 439px) {
      padding: 0;
    }
  }
  div.content-wrapper {
    padding: 48px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;

    @media (max-width: 799px) {
      padding: clamp(16px, calc(48vw / 7.68), 48px);
    }

    @media (max-width: 439px) {
      width: 100%;
      padding: clamp(16px, calc(32vw / 7.68), 40px);
    }
  }

  h3 {
    margin-bottom: clamp(20px, calc(24vw / 7.68), 36px);
    font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
    font-weight: 400;
    line-height: 1.6;
    padding: 0 40px;
  }
  div.paragraph {
    margin-bottom: 40px;
    line-height: 1.5;
    padding: 0 40px;

    @media (max-width: 899px) {
      margin-bottom: clamp(48px, calc(64vw / 7.68), 64px);
    }
  }

  h3,
  div.paragraph {
    width: 100%;
    max-width: 519px;

    @media (max-width: 799px) {
      padding: 0;
    }
  }
`;

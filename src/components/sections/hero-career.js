import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import InView from './in-view-provider';
import { showOffersBtn } from '../../texts/career';

export default function Hero({ data: { image, heading, paragraph, language } }) {
  const scrollToOffers = () => {
    const offersSection = document.getElementById('offers');
    if (offersSection) {
      offersSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <InView>
      <Wrapper>
        <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
        <div className="max-width">
          <HeroContent>
            <Heading>{heading}</Heading>
            <Content>
              <div dangerouslySetInnerHTML={{ __html: paragraph }} />
              <button onClick={scrollToOffers} className="underline control-desctop" type="button">
                {showOffersBtn[language]}
              </button>
            </Content>
          </HeroContent>
        </div>
      </Wrapper>
    </InView>
  );
}

const Wrapper = styled.section`
  width: 100%;
  margin-bottom: clamp(80px, calc(80vw / 7.68), 96px);
  div:first-of-type {
    margin-bottom: clamp(40px, calc(48vw / 7.68), 48px);
  }
`;

const HeroContent = styled.header`
  display: flex;
  justify-content: space-between;
  gap: clamp(56px, calc(128vw / 7.68), 128px) clamp(24px, calc(32vw / 7.68), 32px);
  align-items: flex-start;

  @media (max-width: 1099px) {
    flex-direction: column;
  }

  @media (max-width: 399px) {
    gap: 56px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(calc(26rem / 16), calc(40vw / 7.68), calc(40rem / 16));
  font-style: italic;
  font-weight: 400;
  line-height: 1.4;
  font-family: 'Ivy';
  max-width: calc(408rem / 16);
`;

const Content = styled.div`
  max-width: 628px;

  div:first-of-type {
    font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
    line-height: 1.5;
    margin-bottom: clamp(32px, calc(48vw / 7.68), 48px);
  }

  button {
    background-color: transparent;
    border: none;
    font-size: calc(16rem / 16);
  }
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { parseDate } from '../../helpers/parse-date';
import CitySelector from '../moleculas/city-selector';
import JobOfferCard from '../moleculas/job-offer-card';
import OffersHeader from '../moleculas/offers-header';

const OFFERS_AMOUNT = 6;

export default function OfferList({ data: { heading, offers, language } }) {
  const [showMore, setShowMore] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  const validOffers = offers
    .filter((offer) => {
      const validUntil = parseDate(offer.jobOfferDetails.validUntil);
      return validUntil >= new Date(); // Compare with today
    })
    .sort((a, b) => {
      const dateA = parseDate(a.jobOfferDetails.createdAt);
      const dateB = parseDate(b.jobOfferDetails.createdAt);
      return dateA - dateB; // Descending order (newest first)
    });

  const citiesAvailable = [...new Set(validOffers.map((offer) => offer.jobOfferDetails.city.split(',')[0]))];

  const offersFiltered = currentCity ? validOffers.filter((offer) => offer.jobOfferDetails.city.split(',')[0] === currentCity) : validOffers;
  return (
    <Wrapper id="offers">
      <div className="max-width wrapper">
        <OffersHeader data={{ heading, offersLength: offersFiltered.length, language }} />
        <CitySelector language={language} className="selector" setCurrentCity={setCurrentCity} currentCity={currentCity} citiesAvailable={citiesAvailable} />
        <List>
          {offersFiltered.slice(0, showMore ? offersFiltered.length : OFFERS_AMOUNT).map((offer) => (
            <JobOfferCard data={{ ...offer.jobOfferDetails, language, name: offer.title, city: offer.jobOfferDetails.city.split(',')[0], href: offer.uri.split('/').filter(Boolean).pop() }} />
          ))}
        </List>
        {offersFiltered.length > OFFERS_AMOUNT && (
          <ShowMore
            className="control-desctop underline"
            onClick={(e) => {
              if (showMore) {
                e.preventDefault();
                const element = document.getElementById('offers');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'instant',
                  });
                }
              }
              setShowMore(!showMore);
            }}
          >
            {showMore ? 'Pokaż mniej' : 'Pokaż więcej'}
          </ShowMore>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: clamp(64px, calc(80vw / 7.68), 80px) 0;
  background-color: #f8f5f1;
  scroll-margin-top: 80px;

  header {
    margin-bottom: clamp(calc(24rem / 16), calc(40vw / 7.68), calc(40rem / 16));
  }
  div.wrapper {
    display: flex;
    flex-direction: column;
  }

  div.selector {
    margin-bottom: clamp(32px, calc(40vw / 7.68), 40px);

    @media (max-width: 459px) {
      margin-bottom: 24px;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 32px;

  @media (max-width: 1159px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 599px) {
    row-gap: 36px;
  }
`;

const ShowMore = styled.button`
  background-color: transparent;
  border: none;
  align-self: center;
  margin-top: clamp(64px, calc(80vw / 7.68), 80px);
  cursor: pointer;
`;

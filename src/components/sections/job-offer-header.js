import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { addedDate, applicationTime, months, today as todayText, yesterday as yesterdayText } from '../../texts/career';
export default function JobOfferHeader({ data: { title, image, language, city, employmentType, shiftType, createdAt, validUntil } }) {
  const formatDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return todayText[language];
    if (date.getTime() === yesterday.getTime()) return yesterdayText[language];

    return `${parseInt(day)} ${months[language][parseInt(month)]} ${year}`;
  };

  return (
    <Header>
      <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
      <div className="content">
        <h1>{title}</h1>
        <div className="row">
          <div>
            <PinIcon />
            <span>{city}</span>
          </div>
          <div>
            <ContractIcon />
            <span>{employmentType}</span>
          </div>
          <div>
            <ChartIcon />
            <span>{shiftType}</span>
          </div>
        </div>
      </div>
      <div className="dates">
        <div>
          <span>{addedDate[language]}:</span> <date>{formatDate(createdAt)}</date>
        </div>
        <div>
          <span>{applicationTime[language]}:</span> <date>{formatDate(validUntil)}</date>
        </div>
      </div>
    </Header>
  );
}

const Header = styled.header`
  background-color: #fff;
  grid-column: 1/3;
  padding: 32px;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  gap: 32px;

  div.image {
    max-width: 108px;
    width: 100%;
    height: 72px;
  }

  div.content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-items: start;

    h1 {
      font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
      font-weight: 400;
      line-height: 1.6;
    }

    div.row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 24px;

      div {
        display: flex;
        align-items: center;
        gap: 8px;

        span,
        svg {
          color: #767676;
          font-size: calc(16rem / 16);
          line-height: 1.5;
        }

        svg {
          padding-top: 1px;
        }
      }
    }
  }

  div.dates {
    display: flex;
    align-self: start;
    align-items: center;
    gap: 8px 32px;
    flex-wrap: wrap;

    div {
      font-size: calc(16rem / 16);
      line-height: 1.5;

      span {
        color: #767676;
      }
    }
  }

  @media (max-width: 1169px) {
    grid-template-columns: auto 1fr;
    gap: 28px 24px;
    padding: clamp(calc(32rem / 16), calc(40vw / 7.68), calc(40rem / 16)) clamp(calc(16rem / 16), calc(40vw / 7.68), calc(40rem / 16));

    div.content {
    }

    div.image {
      max-width: 114px;
      height: 76px;
    }

    div.dates {
      grid-column: 2/3;
      grid-row: 2/3;
    }
  }

  @media (max-width: 499px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding-left: 16px;
    padding-right: 16px;
    width: calc(100% + 2 * var(--page-margin));
    margin: 0 calc(-1 * var(--page-margin));

    div.image {
      max-width: 100%;
      grid-column: 1/-1;
      height: 196px;
    }

    div.dates {
      grid-column: 1/-1;
      grid-row: 3/4;
    }

    div.content {
      margin-bottom: 4px;
    }
  }
`;

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <g stroke="#767676" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.83 7.333c0 3.307-3.105 5.838-4.577 6.85-.226.157-.34.235-.517.278a1.172 1.172 0 0 1-.477 0c-.178-.043-.291-.121-.518-.277-1.471-1.013-4.577-3.544-4.577-6.85a5.333 5.333 0 0 1 10.667 0Z" />
      <path d="M10.23 7.333a1.732 1.732 0 1 1-3.465 0 1.732 1.732 0 0 1 3.465 0Z" />
    </g>
  </svg>
);

const ContractIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <path stroke="#767676" strokeLinecap="round" strokeLinejoin="round" d="M9.83 1.597v2.736a1 1 0 0 0 1 1h2.667M5.831 9.669h5.333M5.831 11.97h5.333M8.586 1.333H6.364c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.108v6.933c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h4.267c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V6.407c0-.518 0-.777-.062-1.02a1.998 1.998 0 0 0-.266-.604c-.137-.209-.328-.384-.71-.735l-2.045-1.874c-.339-.31-.508-.466-.703-.577a2 2 0 0 0-.55-.215c-.219-.049-.449-.049-.909-.049Z" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <path stroke="#767676" strokeLinecap="round" strokeLinejoin="round" d="M3.444 11.666a6.333 6.333 0 1 0 8.72-8.72m-5.552-.439c.315-.13.638-.236.967-.316.411-.1.617-.151.883-.068.202.063.448.257.558.437.143.239.143.506.143 1.04v3.466c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437c-.213.11-.493.11-1.054.11H4.097c-.534 0-.801 0-1.04-.145a1.146 1.146 0 0 1-.437-.557c-.083-.266-.033-.472.068-.883a6.666 6.666 0 0 1 3.924-4.575Z" />
  </svg>
);

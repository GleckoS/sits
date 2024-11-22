import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { checkOffer } from '../../texts/career';

export default function JobOfferCard({ data: { name, image, href, city, employmentType, language } }) {
  return (
    <Card>
      <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
      <div className="content">
        <h3>{name}</h3>
        <div className="details">
          <div>
            <PinIcon />
            <span>{city}</span>
          </div>
          <div>
            <DocIcon />
            <span>{employmentType}</span>
          </div>
        </div>
        <Link to={href} className="control-desctop underline">
          {checkOffer[language]}
        </Link>
      </div>
    </Card>
  );
}

const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 24px;
  div.image {
    height: 271px;
    width: 100%;
  }
  h3 {
    margin-bottom: 12px;
    font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
    line-height: 1.6;
    font-weight: 400;
  }
  div.details {
    display: flex;
    align-items: center;
    gap: 8px 24px;
    flex-wrap: wrap;
    margin-bottom: 24px;

    div {
      display: flex;
      align-items: center;
      gap: 8px;

      font-size: calc(16rem / 16);

      span,
      svg {
        line-height: 1.5;
        color: #767676;
      }

      svg {
        padding-top: 1px;
      }
    }
  }

  @media (max-width: 899px) {
    flex-direction: row;
    div.content {
      flex-grow: 1;
      order: 1;
    }
    div.image {
      order: 2;
      width: 281px;
      width: 100%;
      max-width: clamp(218px, calc(281vw / 7.68), 328px);
      height: 187px;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
  }

  @media (max-width: 599px) {
    flex-direction: column;
    width: 100%;
    max-width: 406px;
    margin: 0 auto;

    div.content {
      order: 2;
    }
    div.image {
      order: 1;
      max-width: none;
    }
  }
`;

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none">
    <g stroke="#767676" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.335 7.52c0 3.308-3.106 5.838-4.578 6.851-.226.156-.34.234-.517.278a1.172 1.172 0 0 1-.478 0c-.177-.044-.29-.122-.517-.278-1.471-1.013-4.577-3.543-4.577-6.85a5.333 5.333 0 1 1 10.667 0Z" />
      <path d="M9.734 7.52a1.732 1.732 0 1 1-3.465 0 1.732 1.732 0 0 1 3.465 0Z" />
    </g>
  </svg>
);

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none">
    <path stroke="#767676" strokeLinecap="round" strokeLinejoin="round" d="M9.335 1.784v2.737a1 1 0 0 0 1 1H13M5.335 9.857h5.333m-5.333 2.3h5.333M8.09 1.522H5.868c-1.12 0-1.68 0-2.108.217a2 2 0 0 0-.874.875c-.218.427-.218.987-.218 2.108v6.933c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h4.267c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-5.06c0-.518 0-.777-.062-1.02a1.998 1.998 0 0 0-.266-.603c-.137-.21-.328-.385-.71-.735l-2.045-1.874c-.339-.311-.509-.467-.703-.578A2 2 0 0 0 9 1.57c-.219-.05-.449-.05-.91-.05Z" />
  </svg>
);

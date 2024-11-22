import React from 'react';
import styled from 'styled-components';

export default function OffersHeader({ data: { heading, offersLength }, ...props }) {
  return (
    <Header {...props}>
      <h2>{heading}</h2>
      <span>({offersLength})</span>
    </Header>
  );
}

const Header = styled.header`
  h2 {
    font-size: clamp(calc(26rem / 16), calc(40vw / 7.68), calc(40rem / 16));
    font-style: italic;
    line-height: 1.4;
    font-family: 'Ivy';
    display: inline;
    font-weight: 400;
  }

  span {
    display: inline-block;
    color: #767676;
    transform: translate(16px, -12px);
    font-style: italic;
    line-height: 2.4;
    font-size: clamp(calc(16rem / 16), calc(20vw / 7.68), calc(20rem / 16));
    font-family: 'Ivy';

    @media (max-width: 539px) {
      transform: translate(6px, -8px);
    }
  }
`;

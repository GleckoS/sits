import React from 'react';
import styled from 'styled-components';

export default function JobOfferGrid({ children }) {
  return (
    <Wrapper>
      <GridView className="max-width">{children}</GridView>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: #f8f5f1;
  padding: 40px 0 128px;
  margin-bottom: -120px;

  @media (max-width: 899px) {
    padding: clamp(16px, calc(80vw / 7.68), 80px) 0 clamp(64px, calc(128vw / 7.68), 128px);
  }

  @media (max-width: 499px) {
    padding-bottom: 64px;
  }
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  gap: clamp(16px, calc(32vw / 7.68), 32px);

  @media (max-width: 1149px) {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;

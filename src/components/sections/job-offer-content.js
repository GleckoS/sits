import React from 'react';
import styled from 'styled-components';
import { backToForm } from '../../texts/career';
import BackToFormButton from '../organism/back-to-form-button';
export default function JobOfferContent({ data: { jobFields, language } }) {
  return (
    <Wrapper id="form">
      {jobFields?.map(({ heading, content }) => (
        <ContentBlock>
          <h2>{heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContentBlock>
      ))}

      <BackToFormButton to="#form">{backToForm[language]}</BackToFormButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-column: 1/2;
  grid-row: 2/4;
  background-color: #fff;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: clamp(56px, calc(72vw / 7.68), 72px);
  scroll-margin-top: 140px;

  @media (max-width: 1149px) {
    grid-column: 1/-1;
    grid-row: 2/3;
    width: 100%;
    padding: clamp(32px, calc(40vw / 7.68), 40px) clamp(16px, calc(40vw / 7.68), 40px);

    a:last-child {
      display: none;
    }
  }

  @media (max-width: 499px) {
    width: calc(100% + 2 * var(--page-margin));
    margin: 0 calc(-1 * var(--page-margin));
    padding-left: 16px;
    padding-right: 16px;
  }

  a {
    margin-top: auto;
  }
`;

const ContentBlock = styled.div`
  h2 {
    margin-bottom: clamp(24px, calc(36vw / 7.68), 36px);
    font-size: clamp(calc(20rem / 16), calc(24vw / 7.68), calc(24rem / 16));
    font-weight: 400;
    line-height: 1.5;
    text-transform: uppercase;
  }

  div {
    font-size: clamp(16px, calc(18vw / 7.68), 18px);
    line-height: 1.6;

    p:not(:last-child) {
      margin-bottom: 24px;
    }

    ul,
    ol {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, calc(20vw / 7.68), 20px);

      li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: clamp(12px, calc(16vw / 7.68), 16px);

        &::before {
          padding-top: 3px;
          content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImNoZWNrLTAxIj4KPHBhdGggaWQ9Ikljb24iIGQ9Ik00LjUgMTEuNUw5LjgzMzMzIDE3TDIwLjUgNiIgc3Ryb2tlPSIjODg2QjRCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=');
        }
      }
    }
  }
`;

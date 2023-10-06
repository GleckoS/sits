import React from 'react';
import styled from 'styled-components';

export default function HeroDiscontinuedCollection({ isLast, data: { title, text } }) {
  return (
    <Wrapper className={isLast ? 'last' : ""}>
      <div className='content'>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5504 4.38409C20.315 3.94359 19.6835 3.94359 19.448 4.38411L4.24391 32.8304C4.02138 33.2469 4.32306 33.7501 4.79511 33.7501H35.2032C35.6755 33.7501 35.977 33.2469 35.7545 32.8304L20.5504 4.38409ZM16.1408 2.61644C17.7889 -0.467195 22.2095 -0.4672 23.8577 2.61644L39.0617 31.0629C40.6195 33.9771 38.5077 37.5001 35.2032 37.5001H4.79511C1.49062 37.5001 -0.620999 33.9771 0.936668 31.0629L16.1408 2.61644ZM22.4992 27.5001C22.4992 28.8809 21.38 30.0001 19.9992 30.0001C18.6185 30.0001 17.4992 28.8809 17.4992 27.5001C17.4992 26.1194 18.6185 25.0001 19.9992 25.0001C21.38 25.0001 22.4992 26.1194 22.4992 27.5001ZM21.8742 14.3751C21.8742 13.3396 21.0348 12.5001 19.9992 12.5001C18.9637 12.5001 18.1242 13.3396 18.1242 14.3751V20.6251C18.1242 21.6607 18.9637 22.5001 19.9992 22.5001C21.0348 22.5001 21.8742 21.6607 21.8742 20.6251V14.3751Z" fill="#A32D2D" />
        </svg>
        <div className='title' dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  background-color: #F9F5F0;
  padding: 45px 45px 60px 45px;

  &.last{
    margin-bottom: calc(-1 * clamp(120px, ${120 / 1194 * 100}vw, 160px));
  }

  @media (max-width: 768px) {
    padding: 45px 24px 60px 24px;
  }

  .content{
    max-width: 592px;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 420px) {
      text-align: left;
    }
  }

  svg{
    display: block;
    margin: 0 auto;
    @media (max-width: 420px) {
      margin: 0;
    }
  }

  .title{
    padding: 32px 0 24px 0;
    *{
        font-family: 'Ivy';
        font-size: clamp(25px, ${36 / 1194 * 100}vw, 36px);
        font-style: italic;
        font-weight: 300;
        position: relative;
        width: fit-content;
    }
  }

  .text{
    *{
      
    }
  }
`

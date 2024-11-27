import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { textTransition } from '../../helpers/animation-controller';
import { Container } from '../atoms/container';
import InView from '../sections/in-view-provider';

const titleAnimation = textTransition(1);
const textAnimation = textTransition(2);

export const Title = ({ h2, small, title, text }) => (
  <InView>
    <Wrapper className={small ? 'small' : '' + h2 ? 'h2' : ''}>
      <Container>
        {h2 ? <motion.h2 variants={titleAnimation}>{title}</motion.h2> : <motion.h1 variants={titleAnimation}>{title}</motion.h1>}
        {text && <motion.p variants={textAnimation} dangerouslySetInnerHTML={{ __html: text }}></motion.p>}
      </Container>
    </Wrapper>
  </InView>
);

const Wrapper = styled.div`
  margin: clamp(20px, ${(75 / 1194) * 100}vw, 110px) 0 clamp(45px, ${(75 / 1194) * 100}vw, 110px);

  * {
    font-size: clamp(16px, ${(18 / 1194) * 100}vw, 18px);
    font-weight: 300;
  }

  &.small {
    margin: 30px 0;
  }

  &.h2 {
    margin-top: clamp(60px, ${(90 / 1194) * 100}vw, 180px);

    h2 {
    }
  }

  h1,
  h2 {
    font-size: clamp(26px, ${(40 / 1194) * 100}vw, 40px);
    font-family: 'Ivy';
    font-weight: 300;
  }

  p {
    margin-top: 20px;
    max-width: 640px;

    a {
      text-transform: unset;
    }
  }

  h3,
  h4,
  h5,
  h6 {
    font-size: clamp(22px, ${(28 / 1194) * 100}vw, 28px);
    font-family: 'Ivy';
    font-weight: 300;
  }

  ul,
  ol {
    margin-top: 20px;
    padding-left: 20px;
    display: grid;
    grid-gap: 20px;
  }
`;

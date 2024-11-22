import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

export default function BackToFormButton({ children, to, isVisible = true, ...props }) {
  return (
    <BackToForm to={to} $isVisible={isVisible} {...props}>
      {children}
    </BackToForm>
  );
}

const BackToForm = styled(Link)`
  background-color: #886b4b;
  color: #f8f5f0;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 100%;
  transition: background-color 0.3s ease-in-out;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  &:hover {
    background: #88643d;
  }

  &.back-to-form-button {
    position: sticky;
    top: 114px;
    z-index: 100;
    grid-row: 3/4;
    grid-column: 2/3;
    transition: opacity 0.3s ease-in-out;

    @media (max-width: 1149px) {
      display: none;
    }
  }
`;

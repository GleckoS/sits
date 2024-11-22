import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { errorMessage } from '../../texts/contact';

export const Label = ({ language, required = false, variants, disabled, register, errors, name, obj, rows, pattern = null }) => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  return (
    <Wrapper
      variants={variants}
      onFocus={() => {
        setIsActive(true);
      }}
      onBlur={() => {
        setIsActive(!!inputValue);
      }}
      className={errors[name] ? 'error' : ''}
    >
      <span className={isActive ? 'active' : ''}>{obj[language]}</span>
      {rows ? (
        <textarea
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          value={inputValue}
          rows={rows}
          {...register(name, {
            required: required,
            onChange: (e) => {
              setInputValue(e.currentTarget.value);
            },
          })}
        />
      ) : (
        <input
          autoComplete="off"
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          {...register(name, {
            required: required,
            pattern: pattern,
            onChange: (e) => {
              setInputValue(e.currentTarget.value);
            },
          })}
        />
      )}
      <AnimatePresence mode="wait">
        {errors[name] && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="erorr-span">
            {errorMessage[language]}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {errors[name] && (
          <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="error-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0312 16H12.0413M12.0312 8V12M7.89125 2H16.1712L22.0312 7.86V16.14L16.1712 22H7.89125L2.03125 16.14V7.86L7.89125 2Z" stroke="#A32D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled(motion.label)`
  position: relative;

  .error-svg {
    position: absolute;
    right: 5px;
    top: 9px;
  }

  span {
    position: absolute;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0.003em;
    color: #767676;
    left: 0;
    top: 5px;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

    &.active {
      font-size: clamp(12px, ${(16 / 1366) * 100}vw, 16px);
      top: 0;
      transform: translateY(-100%);
    }
  }

  @media (max-width: 1194px) {
    div {
      margin-top: 10px;
    }
  }

  div {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 16px;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }
  input,
  textarea {
    background-color: transparent;
    border: unset;
    border-bottom: 1px solid #707070;
    transition: background-color 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
    width: 100% !important;
    font-weight: 400;
    font-size: clamp(20px, ${(24 / 1366) * 100}vw, 24px);
    letter-spacing: 0.003em;
    padding-bottom: 10px;
    padding-top: 5px;

    &:hover {
      background-color: #f9f5f0;
    }

    &:focus-visible {
      background-color: #70707016;
      outline: none;
    }
  }
`;

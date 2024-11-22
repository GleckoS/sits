import styled from 'styled-components';
import { allCities, selectCity } from '../../texts/career';
import React from 'react';

export default function CitySelector({ disabled, setCurrentCity, currentCity, citiesAvailable, showAll = true, language, ...props }) {
  return (
    <Selector {...props}>
      <span>{selectCity[language]}</span>
      <ul>
        <li>
          {showAll && (
            <button tabIndex={disabled ? -1 : 0} disabled={disabled} data-active={!currentCity} onClick={() => setCurrentCity(null)}>
              {allCities[language]}
            </button>
          )}
        </li>
        {citiesAvailable.map((city, i) => (
          <li key={i}>
            <button tabIndex={disabled ? -1 : 0} disabled={disabled || currentCity === city} data-active={currentCity === city} onClick={() => setCurrentCity(city)}>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </Selector>
  );
}

const Selector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 36px;
  flex-wrap: wrap;

  span {
    flex-shrink: 0;
  }

  ul {
    display: flex;
    gap: 6px;
    align-items: center;
    list-style: none;
    flex-wrap: wrap;
    button {
      display: flex;
      height: 44px;
      width: 92px;
      border: 1px solid var(--primary-800, #31231e);
      border-radius: 999px;
      padding: 0px 12px 3px 12px;
      justify-content: center;
      background-color: transparent;
      align-items: center;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      cursor: pointer;

      &[disabled] {
        cursor: default;
      }

      &[data-active='true'] {
        background: var(--primary-800, #31231e);
        color: #ffffff;
      }

      &:hover {
        &[data-active='false'] {
          background-color: #f0ede9;
        }
      }
    }
  }
`;

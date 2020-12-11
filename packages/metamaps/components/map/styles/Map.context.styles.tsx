import styled from 'styled-components';

import {
  ContextBorderColor,
  ContextColor,
  Easing,
} from '../../../theme/Theme.colors';

export const MapContextContainer = styled.div`
  position: fixed;
  left: 25px;
  top: 25px;
  z-index: 1111;
  background: ${ContextColor};
  border-radius: 5px;
  border: 2px solid ${ContextBorderColor};
  width: 180px;
  transition: ${Easing};

  button.item,
  div.item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    font-size: 18px;
    letter-spacing: 0.5px;
    cursor: pointer;

    transition: ${Easing};
    border-bottom: 2px solid ${ContextBorderColor};
    &:last-of-type {
      border-bottom: none;
    }

    &:hover {
      background: ${ContextBorderColor};

      div.sub-context {
        opacity: 1;
        pointer-events: inherit;
      }
    }

    div.sub-context {
      position: absolute;
      left: 100%;
      width: 100%;
      top: -2px;

      opacity: 0;
      pointer-events: none;
      transition: ${Easing};

      background: ${ContextColor};
      border-radius: 5px;
      border: 2px solid ${ContextBorderColor};
    }
  }
`;

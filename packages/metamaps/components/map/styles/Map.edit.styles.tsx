import styled from 'styled-components';

import {
  ContextBorderColor,
  ContextColor,
  Easing,
} from '../../../theme/Theme.colors';

export const MapEditContainer = styled.div`
  position: fixed;
  left: 25px;
  top: 25px;
  z-index: 1111;
  padding: 15px;
  cursor: pointer;

  background: ${ContextColor};
  border-radius: 5px;
  border: 2px solid ${ContextBorderColor};
  min-width: 240px;
  transition: ${Easing};

  div.input {
    padding: 0 0 15px 0;
    &:last-of-type {
      padding: 0;
    }

    p {
      font-weight: bold;
      font-size: 14px;
      padding: 0 0 5px 0;
    }
  }
`;

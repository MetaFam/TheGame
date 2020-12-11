import styled from 'styled-components';

import {
  ContextBorderColor,
  ContextColor,
  Easing,
} from '../../../theme/Theme.colors';

export const MapProfileContainer = styled.div`
  position: fixed;
  left: 50px;
  top: 50px;
  width: 240px;
  padding: 15px;
  border: 2px solid ${ContextBorderColor};
  background: ${ContextColor};
  border-radius: 5px;
  transition: ${Easing};
  z-index: 1111;

  p {
    font-size: 14px;
    font-weight: bold;
    padding: 0 0 5px 0;
  }

  div.profile {
    padding: 5px;
    p {
      font-weight: normal;
    }

    &:last-of-type {
      padding-bottom: 0;
    }
  }
`;

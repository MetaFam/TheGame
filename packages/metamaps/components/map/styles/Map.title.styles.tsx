import styled from 'styled-components';

import {
  ContextBorderColor,
  Easing,
  TitleColor,
} from '../../../theme/Theme.colors';

export const MapTitleContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  width: 100%;
  height: 40px;
  background: ${TitleColor};
  border-bottom: 2px solid ${ContextBorderColor};
  transition: ${Easing};

  &.minimized {
    background: transparent;
    border-bottom: 2px solid transparent;

    div.menu {
      opacity: 0;
    }
  }

  display: flex;
  align-items: center;
  justify-content: space-between;

  button.info {
    display: flex;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;

    img {
      height: 32px;
      margin: 0 10px 0 0;
    }

    h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 0 0 2.5px 0;
    }
  }

  div.menu {
    display: flex;
    align-items: center;
    padding: 0;
    height: 100%;
    transition: ${Easing};

    button.link {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 15px;
      font-size: 18px;
      cursor: pointer;

      p {
        margin: 0 0 0 10px;
      }

      transition: ${Easing};
      &:hover {
        background: ${ContextBorderColor};
      }
    }
  }
`;

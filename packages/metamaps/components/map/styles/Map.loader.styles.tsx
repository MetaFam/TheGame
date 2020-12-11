import styled from 'styled-components';

import { Easing, PrimaryBackground } from '../../../theme/Theme.colors';

export const MapLoaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9001;
  transition: ${Easing};
  background: ${PrimaryBackground};
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  &.active {
    opacity: 1;
  }

  @keyframes hover {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  img {
    animation: hover 3s infinite;
  }
`;

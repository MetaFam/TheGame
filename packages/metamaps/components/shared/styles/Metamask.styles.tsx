import styled from 'styled-components';
import { Easing } from '../../../theme/Theme.colors';

export const MetamaskContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: ${Easing};
  pointer-events: none;
  &.active { opacity: 0; }

  img {
    height: 128px;
    margin: 30px 0;
  }

  p {
    font-size: 24px;
  }
`;
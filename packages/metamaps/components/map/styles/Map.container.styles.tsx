import styled from 'styled-components';

import { PrimaryBackground } from '../../../theme/Theme.colors';

export const MapContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: ${PrimaryBackground};

  video.bg-video {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

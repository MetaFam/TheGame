import styled from 'styled-components';

import { PrimaryBackground, FontColor } from './Theme.colors'; 

export const AppContainer = styled.div`
    position: relative;
    background: ${PrimaryBackground};
    color: ${FontColor};
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;

    &.map {
        overflow-y: hidden;
    }

    video.video {
        position: absolute;
        left: 0;
        top: 0;
        min-width: 100%;
        min-height: 100%;
        pointer-events: none;
        z-index: 0;
        object-fit: cover;
    }
`;
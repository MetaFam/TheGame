import styled from 'styled-components';

import { PrimaryBackground, FontColor } from './Theme.colors'; 

export const AppContainer = styled.div`
    background: ${PrimaryBackground};
    color: ${FontColor};
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
`;
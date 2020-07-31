import styled from 'styled-components';

import { BackgroundColor } from './Styles'; 

export const LoadingContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1110;
    background: ${BackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;

    transition: left, top, opacity 0.25s cubic-bezier(0.45, 0, 0.55, 1);
    opacity: 0;
    pointer-events: none;
`;
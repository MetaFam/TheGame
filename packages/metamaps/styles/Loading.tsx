import styled from 'styled-components';

import { BackgroundColor, WhiteColor } from './Styles'; 

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

export const MetaMaskContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1111;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    img {
        height: 128px;
    }

    h2 {
        font-size: 24px;
        color: ${WhiteColor};
        padding: 15px;
    }
`;
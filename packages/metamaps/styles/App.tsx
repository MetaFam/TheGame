import styled from 'styled-components';
import { BackgroundColor, WhiteColor, PopupColor, ButtonColor } from './Styles'; 

export const App = styled.div`
    background: ${BackgroundColor};
    width: 100vw;
    height: 100vh;
`;

export const PopupContainer = styled.div`
    position: fixed;
    left: calc(50% - 160px);
    top: 180px;
    border-radius: 8px;
    background: ${PopupColor};
    border: 2px solid ${ButtonColor};
    z-index: 11;

    width: 320px;
    padding: 15px;

    transition: left, top, opacity 0.25s cubic-bezier(0.45, 0, 0.55, 1);
    opacity: 0;
    &.active { opacity: 1; }

    p {
        color: ${WhiteColor};
        padding: 0 0 15px 0;
    }
`;
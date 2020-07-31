import styled from 'styled-components';
import { PopupColor, ButtonColor } from './Styles';

export const ThreeBoxContainer = styled.div`
    position: fixed;
    left: 15px;
    bottom: 15px;
    padding: 10px 15px;
    background: ${PopupColor};
    z-index: 11;
    border-radius: 8px;

    input {
        margin: 0 15px 0 0;
        padding: 0 10px;
        border-radius: 5px;
    }
`;
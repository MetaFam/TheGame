import styled from 'styled-components';
import { PopupColor, ButtonColor } from './Styles';

export const MenuContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    border-radius: 8px;
    background: ${PopupColor};
    border: 2px solid ${ButtonColor};

    display: flex;
    align-items: center;
    padding: 10px 15px 10px 15px;
    transition: left, top, opacity 0.25s cubic-bezier(0.45, 0, 0.55, 1);
    opacity: 0;

    input[type="file"] { display: none; }
    input[type="text"] {
        margin: 0 15px 0 0;
        padding: 0 10px;
        border-radius: 5px;
    }

    &.textarea {
        display: block;

        textarea {
            width: 100%;
            height: 90px;
            margin: 0 0 15px 0;
            padding: 5px;
            border-radius: 5px;
        }
    }
`;
import styled from 'styled-components';

import { ButtonColor, PopupColor, BackgroundColor, WhiteColor } from './Styles';

export const MenuContainer = styled.div`
    div.title {
        position: fixed;
        left: 15px;
        top: 15px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        background: ${PopupColor};
        border-radius: 8px;
    }

    div.title-image {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 50px;
        height: 50px;
        margin: 10px 5px;
        background: ${BackgroundColor};
        border-radius: 50%;

        img {
            width: 40px;
        }
    }

    h3 {
        font-size: 24px;
        color: ${WhiteColor};
        padding: 0 15px 5px 15px;
    }
`;

export const ContextMenuContainer = styled.div`
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
    pointer-events: none;

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
import styled from 'styled-components';
import { BackgroundColor, Easing } from '../../../theme/Theme.colors';

export const MapMenuContainer = styled.div`
    position: fixed;
    left: 15px;
    top: 15px;

    height: 70px;
    background: rgba(0, 0, 0, 0.75);
    z-index: 11;
    border-radius: 8px;

    display: flex;
    align-items: center;
    padding: 0 7.5px;

    div.image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: ${BackgroundColor};
        border-radius: 50%;
        margin: 0 15px 0 7.5px;
        img {
            height: 36px;
        }
    }

    h2 {
        font-size: 24px;
        font-weight: bold;
        margin: 0 15px 5px 0;
    }

    button {
        margin: 0 7.5px;
    }
`;
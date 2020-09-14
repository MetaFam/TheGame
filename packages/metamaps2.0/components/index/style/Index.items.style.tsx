import styled from 'styled-components';
import { BackgroundColor, ForegroundColor, Easing } from '../../../theme/Theme.colors';

export const IndexItemsContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 768px;
    min-height: 320px;
    margin: auto;
    padding: 15px;

    div.loading-cover {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 11;
        border-radius: 8px;

        transition: ${Easing};
        opacity: 0;
        pointer-events: none;
        &.active {
            opacity: 1;
            pointer-events: inherit;
        }
    }

    div.item {
        position: relative;
        display: flex;
        align-items: center;
        background: ${BackgroundColor};
        border-radius: 8px;
        padding: 15px;
        margin: 15px 0;
        cursor: pointer;

        div.item-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            background: ${ForegroundColor};
            border-radius: 50%;
            margin: 0 15px 0 0;
            img {
                height: 48px;
            }
        }

        h3 {
            font-size: 24px;
        }

        a.remove {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 10px;
            top: 10px;
            width: 32px;
            height: 32px;
        }
    }
`;
import styled from 'styled-components';
import { BackgroundColor, Easing } from '../../../theme/Theme.colors';

export const MapContainerContainer = styled.div`
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
`;
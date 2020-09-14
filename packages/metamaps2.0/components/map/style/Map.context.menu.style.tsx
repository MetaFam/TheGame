import styled from 'styled-components';
import { BackgroundColor, Easing } from '../../../theme/Theme.colors';

export const MapContextMenuContainer = styled.div`
    position: fixed;
    z-index: 1111;
    left: 120px;
    top: 120px;
    background: rgba(0, 0, 0, 0.75);
    padding: 15px;
    border-radius: 8px;

    display: flex;
    align-items: center;

    transition: ${Easing};
`;
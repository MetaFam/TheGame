import styled from 'styled-components';
import { BackgroundColor, Easing } from '../../../theme/Theme.colors';

export const MapAuxContainer = styled.div`
    position: fixed;
    z-index: 1111;
    left: 120px;
    top: 120px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;

    display: flex;
    align-items: flex-end;

    transition: ${Easing};

    div.input {
        padding: 10px;
        p {
            font-size: 12px;
            font-weight: bold;
            margin: 0 0 5px 0;
        }
    }
`;
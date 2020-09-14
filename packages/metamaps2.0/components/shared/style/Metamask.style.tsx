import styled from 'styled-components';
import { Easing } from '../../../theme/Theme.colors';

export const MetamaskContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    transition: ${Easing};
    
    opacity: 0;
    pointer-events: none;

    &.visible {
        opacity: 1;
        pointer-events: inherit;
    }

    img {
        height: 96px;
        margin: 15px;
    }

    h2 {
        font-size: 24px;
    }
`;
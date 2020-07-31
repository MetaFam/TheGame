import styled from 'styled-components';
import { SquareColor, CircleColor } from './Styles';

export const MappingContainer = styled.div`
    position: relative;
    width: calc(100vw - 280px);
    height: 100vh;
`;

export const SquareContainer = styled.div`
    position: absolute;
    background: ${SquareColor};
    border-radius: 8px;
    cursor: move;
`;

export const CircleContainer = styled.div`
    position: absolute;
    cursor: move;
    div.circle {
        width: 100%;
        height: 100%;
        background: ${CircleColor};
        border-radius: 50%;
        pointer-events: none;
    }
`;

export const LineContainer = styled.svg`
    position: absolute;
    cursor: move;
`;

export const ImageContainer = styled.div`
    position: absolute;
    cursor: move;

    img {
        pointer-events: none;
        height: 100%;
    }
`;
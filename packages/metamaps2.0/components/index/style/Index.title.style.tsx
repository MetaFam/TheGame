import styled from 'styled-components';
import { Easing } from '../../../theme/Theme.colors';

export const IndexTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 420px;

    @keyframes hover {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-30px); }
        100% { transform: translateY(0px); }
    }

    img {
        animation: 5s cubic-bezier(0.65, 0, 0.35, 1) 0s infinite normal none running hover;
        height: 96px;
        margin: 15px;
    }

    h1 {
        font-size: 32px;
        font-weight: bold;
    }
`;
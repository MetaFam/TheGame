import styled from 'styled-components';
import { WhiteColor, TitleBackground } from '../../../styles/Styles';

export const NavigationTitleContainer = styled.div`
    div.title-heading {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 320px;
        color: ${WhiteColor};
        padding: 0 0 60px 0;

        h2 {
            font-size: 32px;
            font-weight: bold;
            margin: 0 15px;
        }

        @keyframes hover {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0px); }
        }

        img {
            position: relative;
            top: 24px;
            height: 96px;
            animation: 5s cubic-bezier(0.65, 0, 0.35, 1) 0s infinite normal none running hover;
        }
    }
`;
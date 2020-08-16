import styled from 'styled-components';
import { AlternateColor, BackgroundColor, WhiteColor } from '../../../styles/Styles';

export const NavigationItemsContainer = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;
    padding: 15px;

    div.item {
        position: relative;
        display: flex;
        align-items: center;
        background: ${AlternateColor};
        width: 100%;
        height: 90px;
        margin: 15px;
        border-radius: 8px;
        cursor: pointer;

        div.item-image {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            width: 70px;
            height: 70px;
            margin: 10px 15px;
            background: ${BackgroundColor};
            border-radius: 50%;

            img {
                width: 60px;
            }
        }

        div.item-text {
            h3 {
                font-size: 24px;
                color: ${WhiteColor};
                padding: 0 15px 5px 15px;
            }
        }
    }
`;
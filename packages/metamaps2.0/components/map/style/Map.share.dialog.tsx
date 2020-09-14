import styled from 'styled-components';
import { BackgroundColor, Easing } from '../../../theme/Theme.colors';

export const MapShareDialogContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: none;

    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    z-index: 1111;
    
    align-items: center;
    justify-content: center;
    padding: 0 7.5px;

    div.wrap {
        background: ${BackgroundColor};
        width: 640px;
        max-width: 100%;
        height: 90px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;

        h2 {
            font-size: 24px;
        }
    }
`;
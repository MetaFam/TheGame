import { FC } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@chakra-ui/core';

import { PopupContainer } from '../styles/App';
import { WhiteColor, ButtonColor } from '../styles/Styles';

export interface PopupProps {
    dispatch: any;
    renderedPopupText: string;
    popupActive: boolean;
}

export const PopupComponent: FC<PopupProps> = ({
    dispatch,
    renderedPopupText,
    popupActive,
}) => {
    return(
        <PopupContainer className={popupActive ? 'active' : ''}>
            <p>
                {renderedPopupText}
            </p>
            <ButtonGroup display="flex" justifyContent="center">
                <Button
                    size="sm"
                    backgroundColor={ButtonColor}
                    color={WhiteColor}
                    onClick={(e: any) => {
                        dispatch({ type: 'CLOSE_POPUP' })
                    }}
                    >Close</Button>
            </ButtonGroup>
        </PopupContainer>
    );
}

export const Popup = connect(
    (state: any) => ({
        renderedPopupText: state.renderedPopupText,
        popupActive: state.popupActive,
    })
)(PopupComponent);
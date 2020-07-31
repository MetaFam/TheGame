import { FC } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@chakra-ui/core';

import { ThreeBoxContainer } from '../styles/ThreeBox';
import { WhiteColor, ButtonColor } from '../styles/Styles';

import { Save3BoxUrl, Load3BoxUrl } from '../redux/ThreeBox';

export interface ThreeBoxProps {
    dispatch: any;
    ethAccounts: Array<string>;
    activeSpace: string;
    items: Array<any>;
}

export const ThreeBoxComponent: FC<ThreeBoxProps> = ({
    dispatch,
    ethAccounts,
    activeSpace,
    items,
}) => {
    return(
        <ThreeBoxContainer>
            <input
                type="text"
                placeholder="3box Space URL"
                value={activeSpace}
                onChange={e => dispatch({ type: 'UPDATE_3BOX_URL', value: e.target.value })}
            />
            <ButtonGroup>
                <Button
                    size="sm"
                    backgroundColor={ButtonColor}
                    color={WhiteColor}
                    onClick={async e => dispatch(await Save3BoxUrl(ethAccounts[0], activeSpace, items))}>
                        Save
                </Button>
                <Button
                    size="sm"
                    backgroundColor={ButtonColor}
                    color={WhiteColor}
                    onClick={async e => dispatch(await Load3BoxUrl(ethAccounts[0], activeSpace))}>
                        Load
                </Button>
            </ButtonGroup>
        </ThreeBoxContainer>
    );
}

export const ThreeBox = connect(
    (state: any) => ({
        ethAccounts: state.ethAccounts,
        activeSpace: state.activeSpace,
        items: state.items,
    })
)(ThreeBoxComponent);
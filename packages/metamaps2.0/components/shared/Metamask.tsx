import React from 'react';
import { FC, useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';
import { LoadNavigation } from '../index/dispatch/Navigation.dispatch';

import { MetamaskContainer } from './style/Metamask.style';

declare const window: any;

export interface MetamaskProps {
    dispatch: any;
    metamask: boolean;
}
  
export const MetamaskComponent: FC<MetamaskProps> = ({ dispatch, metamask }) => {
    useLayoutEffect(() => {
        if (window.ethereum) {
            dispatch({ type: 'METAMASK', value: true });
            (async () => {
                const accounts = await window.ethereum.enable();
                dispatch({ type: 'UPDATE_ACCOUNTS', accounts });
                dispatch(await LoadNavigation(accounts[0]));
            })();
        } else {
            dispatch({ type: 'METAMASK', value: false });
        }
    }, []);

    return(
        <MetamaskContainer className={metamask ? 'invisible' : 'visible'}>
            <img src={require('../../image/metamask.png')}/>
            <h2>Please install Metamask</h2>
        </MetamaskContainer>
    )
}
  
export const Metamask = connect(
    (State: State) => ({
        metamask: State.navigation.metamask,
    })
)(MetamaskComponent);

import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MetamaskContainer } from './styles/Metamask.styles';

export interface MetamaskProps {
  dispatch: Dispatch;
  metamask: boolean;
}

export const MetamaskComponent: FC<MetamaskProps> = ({
  dispatch,
  metamask,
}) => {
  return (
    <MetamaskContainer className={metamask ? 'active' : ''}>
      <img src="/image/metamask.png" alt="metamask-logo" />
      <p>Please enable Metamask to use Metamaps</p>
    </MetamaskContainer>
  );
};

export const Metamask = connect((state: State) => ({
  metamask: state.metamask,
}))(MetamaskComponent);

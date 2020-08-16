import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer.state';

import { MetaMaskContainer } from '../../styles/Loading';

export interface MetamaskInterface {
    hasWeb3: boolean;
}

export const MetamaskComponent: FC<MetamaskInterface> = ({ hasWeb3 }) => {
    return(
        <MetaMaskContainer style={{ opacity: !hasWeb3 ? 1 : 0}}>
            <img src={require('../../image/metamask.png')}/>
            <h2>In order to use MetaMaps you need MetaMask</h2>
        </MetaMaskContainer>
    );
}

export const Metamask = connect(
    (state: State) => ({
        hasWeb3: state.hasWeb3,
    })
)(MetamaskComponent);
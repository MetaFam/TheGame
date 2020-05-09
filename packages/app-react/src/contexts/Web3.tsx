import React, {createContext, useCallback, useEffect, useState} from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { AsyncSendable, Web3Provider } from 'ethers/providers';
import {useApolloClient} from '@apollo/react-hooks';

import config from '../config';
import { did } from '@the-game/utils';
import {loginLoading, login, getTokenFromStore} from '../apollo/auth';

type Web3ContextType = {
  ethersProvider: Web3Provider | null,
  connectWeb3: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType>({
  ethersProvider: null,
  connectWeb3: async () => {},
});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: config.infuraId,
    }
  }
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});


const Web3ContextProvider: React.FC = props => {

  const apolloClient = useApolloClient();

  const [ethersProvider, setEthersProvider] = useState<Web3Provider | null>(null);

  const connectDID = useCallback(async (ethersProvider: Web3Provider) => {

    let token = getTokenFromStore();

    if(!token) {
      token = await did.createToken(ethersProvider);
    }

    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    await login(apolloClient, token, address);

  }, [apolloClient]);

  const connectWeb3 = useCallback(async () => {
    try {

      loginLoading(apolloClient);

      const provider = await web3Modal.connect();

      const web3Provider = new Web3(provider);
      const ethersProvider = new ethers.providers.Web3Provider(web3Provider.currentProvider as AsyncSendable);
      await connectDID(ethersProvider);

      setEthersProvider(ethersProvider);

    } catch(e) {
      loginLoading(apolloClient, false);
      throw e;
    }
  }, [apolloClient, connectDID]);

  useEffect(() => {
    if(web3Modal.cachedProvider) {
      connectWeb3().catch(console.error);
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider value={{ ethersProvider, connectWeb3 }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;

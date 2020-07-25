import { useApolloClient } from '@apollo/react-hooks';
import { did } from '@metafam/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { AsyncSendable, Web3Provider } from 'ethers/providers';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { getTokenFromStore, login, loginLoading, logout } from '../apollo/auth';
import { CONFIG } from '../config';

type Web3ContextType = {
  ethersProvider: Web3Provider | null;
  connectWeb3: () => Promise<void>;
  disconnect: () => void;
};

export const Web3Context = createContext<Web3ContextType>({
  ethersProvider: null,
  connectWeb3: async () => {},
  disconnect: () => undefined,
});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: CONFIG.infuraId,
    },
  },
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const apolloClient = useApolloClient();

  const [ethersProvider, setEthersProvider] = useState<Web3Provider | null>(
    null,
  );

  const connectDID = useCallback(
    async (provider: Web3Provider) => {
      let token = getTokenFromStore();

      if (!token) {
        token = await did.createToken(provider);
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      await login(apolloClient, token, address);
    },
    [apolloClient],
  );

  const connectWeb3 = useCallback(async () => {
    try {
      loginLoading(apolloClient);

      const modalProvider = await web3Modal.connect();

      const web3Provider = new Web3(modalProvider);
      const provider = new ethers.providers.Web3Provider(
        web3Provider.currentProvider as AsyncSendable,
      );
      await connectDID(provider);

      setEthersProvider(provider);
    } catch (e) {
      loginLoading(apolloClient, false);
      throw e;
    }
  }, [apolloClient, connectDID]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    logout(apolloClient);
  }, [apolloClient]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWeb3().catch(console.error);
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider value={{ ethersProvider, connectWeb3, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};

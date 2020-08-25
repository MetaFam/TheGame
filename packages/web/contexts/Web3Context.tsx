import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { AsyncSendable } from 'ethers/providers';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';

type Web3ContextType = {
  ethersProvider: ethers.providers.Web3Provider | null;
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

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      }),
    );
  }, []);

  const [
    ethersProvider,
    setEthersProvider,
  ] = useState<ethers.providers.Web3Provider | null>(null);

  const connectWeb3 = useCallback(async () => {
    if (web3Modal) {
      const modalProvider = await web3Modal.connect();

      const web3Provider = new Web3(modalProvider);
      const provider = new ethers.providers.Web3Provider(
        web3Provider.currentProvider as AsyncSendable,
      );

      setEthersProvider(provider);
    }
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    web3Modal?.clearCachedProvider();
  }, [web3Modal]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWeb3().catch(console.error);
    }
  }, [web3Modal, connectWeb3]);

  return (
    <Web3Context.Provider value={{ ethersProvider, connectWeb3, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};

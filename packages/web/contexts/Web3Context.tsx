import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';

type Web3ContextType = {
  provider?: ethers.providers.Web3Provider;
  connectWeb3: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  address?: string;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: undefined,
  connectWeb3: async () => {},
  disconnect: () => undefined,
  isConnected: false,
  address: undefined,
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
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      }),
    );
  }, []);

  const connectWeb3 = useCallback(async () => {
    if (web3Modal) {
      const modalProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(modalProvider);

      setAddress(await ethersProvider.getSigner().getAddress());
      setProvider(ethersProvider);
      setIsConnected(true);
    }
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    web3Modal?.clearCachedProvider();

    setAddress(undefined);
    setProvider(undefined);
    setIsConnected(false);
  }, [web3Modal]);

  return (
    <Web3Context.Provider
      value={{ provider, connectWeb3, disconnect, isConnected, address }}
    >
      {children}
    </Web3Context.Provider>
  );
};

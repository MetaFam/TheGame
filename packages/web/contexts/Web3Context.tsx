import { did } from '@metafam/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import { clearToken, getTokenFromStore, setTokenInStore } from 'lib/auth';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';

type Web3ContextType = {
  provider?: providers.Web3Provider;
  connectWeb3: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  address?: string;
  authToken: string | undefined;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: undefined,
  connectWeb3: async () => {},
  disconnect: () => undefined,
  isConnected: false,
  address: undefined,
  authToken: undefined,
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
  const [provider, setProvider] = useState<providers.Web3Provider>();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [authToken, setAuthToken] = useState<string>();

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
      const ethersProvider = new providers.Web3Provider(modalProvider);

      const ethAddress = await ethersProvider.getSigner().getAddress();
      setAddress(ethAddress);

      let token = getTokenFromStore();
      if (
        !token ||
        did.getSignerAddress(token)?.toLowerCase() !== ethAddress.toLowerCase()
      ) {
        token = await did.createToken(ethersProvider);
      }

      setTokenInStore(token);
      setProvider(ethersProvider);
      setAuthToken(token);
      setIsConnected(true);
    }
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    web3Modal?.clearCachedProvider();
    clearToken();
    setAuthToken(undefined);
    setAddress(undefined);
    setProvider(undefined);
    setIsConnected(false);
  }, [web3Modal]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      // eslint-disable-next-line no-console
      connectWeb3().catch(console.error);
    }
  }, [web3Modal, connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        connectWeb3,
        disconnect,
        isConnected,
        address,
        authToken,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

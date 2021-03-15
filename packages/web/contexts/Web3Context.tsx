import { did } from '@metafam/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import {
  clearToken,
  clearWCMobile,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';

export type Web3ContextType = {
  provider: providers.Web3Provider | null;
  connectWeb3: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  address: string | null;
  authToken: string | null;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  connectWeb3: async () => {},
  disconnect: () => undefined,
  isConnecting: false,
  isConnected: false,
  address: null,
  authToken: null,
});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: CONFIG.infuraId,
    },
  },
};

const web3Modal =
  typeof window !== 'undefined' &&
  new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  });

function getExistingAuth(ethAddress: string) {
  const token = getTokenFromStore();
  if (!token) return null;

  const signerAddress = did.getSignerAddress(token);
  if (
    !signerAddress ||
    signerAddress.toLowerCase() !== ethAddress.toLowerCase()
  ) {
    clearToken();
    return null;
  }
  return token;
}

async function authenticateWallet(
  ethersProvider: providers.Web3Provider,
): Promise<string> {
  const token = await did.createToken(ethersProvider);
  setTokenInStore(token);
  return token;
}

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    if (web3Modal === false) return;

    web3Modal.clearCachedProvider();
    clearWCMobile();
    clearToken();
    setAuthToken(null);
    setAddress(null);
    setProvider(null);
    setIsConnecting(false);
    setIsConnected(false);
  }, []);

  const connectWeb3 = useCallback(async () => {
    if (web3Modal === false) return;
    setIsConnecting(true);

    try {
      const modalProvider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(modalProvider);

      const ethAddress = await ethersProvider.getSigner().getAddress();
      setAddress(ethAddress);

      let token: string | null = getExistingAuth(ethAddress);
      if (!token) {
        token = await authenticateWallet(ethersProvider);
      }

      setProvider(ethersProvider);
      setAuthToken(token);
      setIsConnecting(false);
      setIsConnected(true);
    } catch (_) {
      setIsConnecting(false);
      disconnect();
    }
  }, [disconnect]);

  useEffect(() => {
    if (web3Modal === false) return;
    if (web3Modal.cachedProvider) {
      connectWeb3().catch(() => undefined);
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        connectWeb3,
        disconnect,
        isConnected,
        isConnecting,
        address,
        authToken,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

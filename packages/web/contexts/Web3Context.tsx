import { did } from '@metafam/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import {
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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

export async function getExistingAuth(
  ethersProvider: providers.Web3Provider,
): Promise<string | null> {
  const token = getTokenFromStore();
  if (!token) return null;

  try {
    await did.verifyToken(token, ethersProvider);
    return token;
  } catch (e) {
    clearToken();
    return null;
  }
}

export async function authenticateWallet(
  ethersProvider: providers.Web3Provider,
): Promise<string> {
  const token = await did.createToken(ethersProvider);
  setTokenInStore(token);
  return token;
}

interface Web3ContextProviderOptions {
  children: React.ReactElement;
  resetUrqlClient?: () => void;
}

export const Web3ContextProvider: React.FC<Web3ContextProviderOptions> = ({
  children,
  resetUrqlClient,
}) => {
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const calledOnce = useRef<boolean>(false);

  const disconnect = useCallback(() => {
    if (web3Modal === false) return;

    web3Modal.clearCachedProvider();
    clearWalletConnect();
    clearToken();
    setAuthToken(null);
    setAddress(null);
    setProvider(null);
    setIsConnecting(false);
    setIsConnected(false);
    if (resetUrqlClient) resetUrqlClient();
  }, [resetUrqlClient]);

  const connectWeb3 = useCallback(async () => {

    if (web3Modal === false) return;
    setIsConnecting(true);

    try {
      const web3Provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(web3Provider);

      const ethAddress = await ethersProvider.getSigner().getAddress();

      let token: string | null = await getExistingAuth(ethersProvider);

      if (!token) {
        token = await authenticateWallet(ethersProvider);
      }

      setAddress(ethAddress);
      setProvider(ethersProvider);
      setAuthToken(token);
      setIsConnecting(false);
      setIsConnected(true);
      if (resetUrqlClient) resetUrqlClient();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      setIsConnecting(false);
      disconnect();
    }
  }, [resetUrqlClient, disconnect]);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

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

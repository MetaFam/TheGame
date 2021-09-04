import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';
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
  useMemo,
  useRef,
  useState,
} from 'react';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';

export type Web3ContextType = {
  provider: providers.Web3Provider | null;
  ceramic: Ceramic | null;
  idx: IDX | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  address: string | null;
  authToken: string | null;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  ceramic: null,
  idx: null,
  connect: async () => {},
  disconnect: () => undefined,
  connecting: false,
  connected: false,
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
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const calledOnce = useRef<boolean>(false);
  const ceramic = useMemo(() => new Ceramic(process.env.CERAMIC_URL), []);

  useEffect(() => {
    if (address) {
        const threeIdConnect = new ThreeIdConnect();
        const authProvider = new EthereumAuthProvider(window.ethereum, address);
        threeIdConnect.connect(authProvider).then(() => {
          ceramic.did = new DID({
            provider: threeIdConnect.getDidProvider(),
            resolver: ThreeIdResolver.getResolver(ceramic),
          });
        });
    }
  }, [address, ceramic])
  const idx = new IDX({ ceramic });

  const disconnect = useCallback(() => {
    if (web3Modal === false) return;

    web3Modal.clearCachedProvider();
    clearWalletConnect();
    clearToken();
    setAuthToken(null);
    setAddress(null);
    setProvider(null);
    setConnecting(false);
    setConnected(false);
    if (resetUrqlClient) resetUrqlClient();
  }, [resetUrqlClient]);

  const connect = useCallback(async () => {
    if (web3Modal === false) return;

    setConnecting(true);

    try {
      const modal = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(modal);
      const addr = await web3Provider.getSigner().getAddress();

      let token: string | null = await getExistingAuth(web3Provider);

      if (!token) {
        token = await authenticateWallet(web3Provider);
      }

      setAddress(addr);
      setProvider(web3Provider);
      setAuthToken(token);
      setConnecting(false);
      setConnected(true);
      if (resetUrqlClient) resetUrqlClient();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      setConnecting(false);
      disconnect();
    }
  }, [resetUrqlClient, disconnect]);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    if (web3Modal === false) return;
    if (web3Modal.cachedProvider) {
      connect().catch(() => undefined);
    }
  }, [connect]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        ceramic,
        idx,
        connect,
        disconnect,
        connected,
        connecting,
        address,
        authToken,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

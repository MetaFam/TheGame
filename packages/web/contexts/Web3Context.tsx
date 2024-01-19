import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { did, Maybe } from '@metafam/utils';
import { Client as W3SClient } from '@web3-storage/w3up-client';
import {
  clearDIDSessionCache,
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { errorHandler } from 'utils/errorHandler';
import { providerOptions } from 'utils/walletOptions';
import Web3Modal from 'web3modal';
import { useW3upClient } from 'lib/hooks/useW3';

export type Web3ContextType = {
  provider: Maybe<Web3Provider>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  connect: () => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  isMetaMask: boolean;
  w3storage: Maybe<W3SClient>;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  address: null,
  chainId: null,
  authToken: null,
  connect: async () => undefined,
  disconnect: () => undefined,
  connecting: false,
  connected: false,
  isMetaMask: false,
  w3storage: null,
});

const web3Modal =
  typeof window === 'undefined'
    ? null
    : new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      });

export async function getExistingAuth(
  ethersProvider: Web3Provider,
  connectedAddress: string,
): Promise<Maybe<string>> {
  const token = getTokenFromStore();
  if (!token) return null;

  try {
    await did.verifyToken(token, ethersProvider, connectedAddress);
    return token;
  } catch (e) {
    errorHandler(e as Error);
    clearToken();
    return null;
  }
}

export async function authenticateWallet(
  ethersProvider: Web3Provider,
): Promise<string> {
  const token = await did.createToken(ethersProvider);
  setTokenInStore(token);
  return token;
}

type Web3ContextProviderOptions = PropsWithChildren<{
  resetUrqlClient?: () => void;
}>;

type Web3State = {
  wallet: Maybe<Web3Modal>;
  provider: Maybe<Web3Provider>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  w3storage: Maybe<W3SClient>;
};

export const Web3ContextProvider: React.FC<Web3ContextProviderOptions> = ({
  resetUrqlClient,
  children,
}) => {
  const [{ wallet, provider, chainId, address, authToken }, setWeb3State] =
    useState<Web3State>({
      wallet: null,
      provider: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
  const [connecting, setConnecting] = useState(false);
  const w3storage = useW3upClient();
  const connected = useMemo(
    () =>
      !!wallet &&
      !!provider &&
      !!address &&
      !!chainId &&
      !!authToken &&
      !connecting,
    [wallet, provider, address, authToken, chainId, connecting],
  );

  const disconnect = useCallback(() => {
    if (web3Modal === null) return;

    web3Modal.clearCachedProvider();
    clearWalletConnect();
    clearToken();
    clearDIDSessionCache();
    setWeb3State({
      wallet: null,
      provider: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
    setConnecting(false);
    resetUrqlClient?.();
  }, [resetUrqlClient]);

  const updateWeb3State = useCallback(
    async (prov: ExternalProvider) => {
      const web3Provider = new Web3Provider(prov);
      const network = (await web3Provider.getNetwork()).chainId;
      const addr = await web3Provider.getSigner().getAddress();

      let token = await getExistingAuth(web3Provider, addr);

      if (!token) {
        token = await authenticateWallet(web3Provider);
      }

      const networkId = `0x${network.toString(16)}`;

      setWeb3State({
        wallet: prov as Web3Modal,
        provider: web3Provider,
        chainId: networkId,
        address: addr,
        authToken: token,
        w3storage,
      });

      resetUrqlClient?.();
    },
    [resetUrqlClient],
  );

  const connect = useCallback(async () => {
    if (web3Modal == null) return;

    setConnecting(true);

    try {
      const prov = await web3Modal.connect();
      await updateWeb3State(prov);

      prov.on('accountsChanged', () => {
        disconnect();
        window.location.reload();
      });
      prov.on('chainChanged', () => {
        updateWeb3State(prov);
      });
    } catch (error) {
      console.error('`connect` Error', error);
      errorHandler(error as Error);
      disconnect();
    } finally {
      setConnecting(false);
    }
  }, [disconnect, updateWeb3State]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);

  const isMetaMask = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.ethereum?.isMetaMask === true &&
      provider?.connection?.url === 'metamask',
    [provider],
  );

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected.');
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        connect,
        disconnect,
        connected,
        connecting,
        address,
        authToken,
        chainId,
        isMetaMask,
        w3storage,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

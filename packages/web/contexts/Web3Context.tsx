import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import type { CeramicApi } from '@ceramicnetwork/common';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { did, Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DID } from 'dids';
import { providers } from 'ethers';
import {
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import { clearJotaiState } from 'lib/jotaiState';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { providerOptions } from 'utils/walletOptions';
import Web3Modal from 'web3modal';

export type Web3ContextType = {
  provider: Maybe<providers.Web3Provider>;
  ceramic: Maybe<CeramicApi>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  connect: () => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  isMetaMask: boolean;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  ceramic: null,
  address: null,
  chainId: null,
  authToken: null,
  connect: async () => undefined,
  disconnect: () => undefined,
  connecting: false,
  connected: false,
  isMetaMask: false,
});

const [web3Modal, ceramic, threeIdConnect] =
  typeof window === 'undefined'
    ? [null, null, null]
    : [
        new Web3Modal({
          network: 'mainnet',
          cacheProvider: true,
          providerOptions,
        }),
        new CeramicClient(CONFIG.ceramicURL),
        new ThreeIdConnect(CONFIG.ceramicNetwork),
      ];

export async function getExistingAuth(
  ethersProvider: providers.Web3Provider,
  connectedAddress: string,
): Promise<Maybe<string>> {
  const token = getTokenFromStore();
  if (!token) return null;

  try {
    await did.verifyToken(token, ethersProvider, connectedAddress);
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
  resetUrqlClient?: () => void;
}

type Web3State = {
  wallet: Maybe<Web3Modal>;
  provider: Maybe<providers.Web3Provider>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
};

export const Web3ContextProvider: React.FC<Web3ContextProviderOptions> = ({
  resetUrqlClient,
  children,
}) => {
  const [
    { wallet, provider, chainId, address, authToken },
    setWeb3State,
  ] = useState<Web3State>({
    wallet: null,
    provider: null,
    address: null,
    chainId: null,
    authToken: null,
  });
  const [connecting, setConnecting] = useState(!!web3Modal?.cachedProvider);

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
    ceramic?.close();
    clearWalletConnect();
    clearToken();
    clearJotaiState();
    setWeb3State({
      wallet: null,
      provider: null,
      address: null,
      chainId: null,
      authToken: null,
    });
    setConnecting(false);
    resetUrqlClient?.();
  }, [resetUrqlClient]);

  const updateWeb3State = useCallback(
    async (prov) => {
      const web3Provider = new providers.Web3Provider(prov);
      const addr = await web3Provider.getSigner().getAddress();

      let token = await getExistingAuth(web3Provider, addr);

      if (!token) {
        token = await authenticateWallet(web3Provider);
      }

      const { chainId: networkId } = prov;

      if (ceramic && threeIdConnect) {
        const authProvider = new EthereumAuthProvider(prov, addr);
        await threeIdConnect.connect(authProvider);
        ceramic.did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: ThreeIdResolver.getResolver(ceramic),
        });
      }

      setWeb3State({
        wallet: prov,
        provider: web3Provider,
        chainId: networkId,
        address: addr,
        authToken: token,
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
      console.error('`connect` Error', error); // eslint-disable-line no-console
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

  return (
    <Web3Context.Provider
      value={{
        provider,
        ceramic,
        connect,
        disconnect,
        connected,
        connecting,
        address,
        authToken,
        chainId,
        isMetaMask,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

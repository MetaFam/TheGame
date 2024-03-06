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
import { useW3upClient } from 'lib/hooks/useW3';
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
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
      [polygon.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATIC}`,
      ),
      [optimism.id]: http("https://op-pokt.nodies.app"),

    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: "MetaGame",

    // Optional App Info
    appDescription: "DAOs connection tissue",
    appUrl: "https://metagame.wtf", // your app's url
    appIcon: "https://metagame.wtf", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

const Provider = ({ children }: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

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
  updateWeb3State: (prov: ExternalProvider) => Promise<void>; 
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
  updateWeb3State: async () => undefined,
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
    [resetUrqlClient, w3storage],
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
        updateWeb3State,
      }}
    >
      <Provider>
        {children}
      </Provider>
    </Web3Context.Provider>
  );
};
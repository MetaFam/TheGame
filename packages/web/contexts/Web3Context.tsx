import { did, Maybe } from '@metafam/utils';
import { Client as W3SClient } from '@web3-storage/w3up-client';
import { ethers } from 'ethers';
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
import { PublicClient, WalletClient } from 'viem';
import { useAccount, useDisconnect } from 'wagmi';

import { useEthersProvider, useViemClients } from '#lib/hooks/useEthersProvider';
import { useW3upClient } from '#lib/hooks/useW3';
import { errorHandler } from '#utils/errorHandler';

export type ViemClients = {
  wallet: WalletClient;
  public: PublicClient;
  mainnet: PublicClient;
};

export type Web3ContextType = {
  provider: Maybe<ethers.BrowserProvider>;
  viemClients: Maybe<ViemClients>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  w3storage: Maybe<W3SClient>;
  updateWeb3State: (prov: ethers.BrowserProvider) => Promise<void>;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  viemClients: null,
  address: null,
  chainId: null,
  authToken: null,
  disconnect: () => undefined,
  connecting: false,
  connected: false,
  w3storage: null,
  updateWeb3State: async () => undefined,
});

export async function getExistingAuth(
  publicClient: PublicClient,
  connectedAddress: string,
): Promise<Maybe<string>> {
  const token = getTokenFromStore();
  if (!token) return null;

  try {
    await did.verifyToken({ token, publicClient, connectedAddress });
    return token;
  } catch (e) {
    errorHandler(e as Error);
    clearToken();
    return null;
  }
}

export async function authenticateWallet(client: WalletClient) {
  const token = await did.createToken(client);
  setTokenInStore(token);
  return token;
}

type Web3ContextProviderOptions = PropsWithChildren<{
  resetUrqlClient?: () => void;
}>;

type Web3State = {
  provider: Maybe<ethers.BrowserProvider>;
  viemClients: Maybe<ViemClients>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  w3storage: Maybe<W3SClient>;
};

export const Web3ContextProvider: React.FC<Web3ContextProviderOptions> = ({
  resetUrqlClient,
  children,
}) => {
  const [{ provider, chainId, address, authToken }, setWeb3State] =
    useState<Web3State>({
      provider: null,
      viemClients: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
  const [connecting, setConnecting] = useState(false);

  const viemClients = useViemClients();
  const wagmiProvider = useEthersProvider();
  const { chain, address: userAddress } = useAccount();
  const { disconnect: disconnectWAGMI } = useDisconnect();

  const w3storage = useW3upClient();

  const connected = useMemo(
    () => !!provider && !!address && !!chainId && !!authToken && !connecting,
    [provider, address, authToken, chainId, connecting],
  );

  const disconnect = useCallback(() => {
    disconnectWAGMI();
    clearWalletConnect();
    clearToken();
    clearDIDSessionCache();
    setWeb3State({
      provider: null,
      viemClients: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
    setConnecting(false);
    resetUrqlClient?.();
  }, [resetUrqlClient, disconnectWAGMI]);

  const updateWeb3State = useCallback(
    async () => {
      const network = chain?.id;
      if (!viemClients || !userAddress || !network) return;
      let token = await getExistingAuth(viemClients.public, userAddress);

      if (!token) {
        token = await authenticateWallet(viemClients.wallet);
      }

      const networkId = `0x${network.toString(16)}`;

      setWeb3State({
        provider: wagmiProvider ?? null,
        viemClients: viemClients ?? null,
        chainId: networkId,
        address: userAddress,
        authToken: token,
        w3storage,
      });
    },
    [chain?.id, userAddress, viemClients, w3storage, wagmiProvider],
  );

  useEffect(() => {
    updateWeb3State();
  }, [chain, userAddress, wagmiProvider, updateWeb3State]);

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected.');
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        viemClients: viemClients ?? null,
        disconnect,
        connected,
        connecting,
        address,
        authToken,
        chainId,
        w3storage,
        updateWeb3State,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

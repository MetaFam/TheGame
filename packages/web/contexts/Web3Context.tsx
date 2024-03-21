import { Web3Provider } from '@ethersproject/providers';
import { did, Maybe } from '@metafam/utils';
import { Client as W3SClient } from '@web3-storage/w3up-client';
import {
  clearDIDSessionCache,
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import { useEthersSigner } from 'lib/hooks/userEthersSigner';
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
import { useAccount, useDisconnect } from 'wagmi';

export type Web3ContextType = {
  provider: Maybe<Web3Provider>;
  address: Maybe<string>;
  chainId: Maybe<string>;
  authToken: Maybe<string>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  w3storage: Maybe<W3SClient>;
  updateWeb3State: (prov: Web3Provider) => Promise<void>;
};

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
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
  addr: string,
): Promise<string> {
  const token = await did.createToken(ethersProvider, addr);
  setTokenInStore(token);
  return token;
}

type Web3ContextProviderOptions = PropsWithChildren<{
  resetUrqlClient?: () => void;
}>;

type Web3State = {
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
  const [{ provider, chainId, address, authToken }, setWeb3State] =
    useState<Web3State>({
      provider: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
  const [connecting, setConnecting] = useState(false);

  const wagmiProvider = useEthersSigner();
  const { chain, address: userAddress } = useAccount();
  const { disconnect: disconnectWagmi } = useDisconnect();

  const w3storage = useW3upClient();

  const connected = useMemo(
    () => !!provider && !!address && !!chainId && !!authToken && !connecting,
    [provider, address, authToken, chainId, connecting],
  );

  const disconnect = useCallback(() => {
    disconnectWagmi();
    clearWalletConnect();
    clearToken();
    clearDIDSessionCache();
    setWeb3State({
      provider: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
    setConnecting(false);
    resetUrqlClient?.();
  }, [resetUrqlClient, disconnectWagmi]);

  const updateWeb3State = useCallback(
    async (web3Provider: Web3Provider) => {
      const network = chain?.id;
      if (!web3Provider || !userAddress || !network) return;
      let token = await getExistingAuth(web3Provider, userAddress);

      if (!token) {
        token = await authenticateWallet(web3Provider, userAddress);
      }

      const networkId = `0x${network.toString(16)}`;

      setWeb3State({
        provider: web3Provider,
        chainId: networkId,
        address: userAddress,
        authToken: token,
        w3storage,
      });
    },
    [w3storage, userAddress, chain?.id],
  );

  useEffect(() => {
    const update = async () => {
      if (!wagmiProvider) return;
      updateWeb3State(wagmiProvider);
    };
    update();
  }, [chain, userAddress, wagmiProvider, updateWeb3State]);

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected.');
  }
  return (
    <Web3Context.Provider
      value={{
        provider,
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

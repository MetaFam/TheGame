import { did, Maybe } from '@metafam/utils';
import { Client as W3SClient } from '@web3-storage/w3up-client';
import { ethers } from 'ethers';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PublicClient, WalletClient } from 'viem';
import { useAccount, useAccountEffect, useDisconnect } from 'wagmi';

import {
  clearDIDSessionCache,
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from '#lib/auth';
import { useViemClients } from '#lib/hooks/useEthersProvider';
import { useW3upClient } from '#lib/hooks/useW3';
import { errorHandler } from '#utils/errorHandler';

export type ViemClients = {
  wallet: WalletClient;
  public: PublicClient;
  mainnet: PublicClient;
};

export type Web3ContextType = {
  viemClients: Maybe<ViemClients>;
  address: Maybe<`0x${string}`>;
  chainId: Maybe<number>;
  authToken: Maybe<string>;
  disconnect: () => void;
  connecting: boolean;
  connected: boolean;
  w3storage: Maybe<W3SClient>;
};

export const Web3Context = createContext<Web3ContextType>({
  viemClients: null,
  address: null,
  chainId: null,
  authToken: null,
  disconnect: () => undefined,
  connecting: false,
  connected: false,
  w3storage: null,
});

export async function getExistingAuth(
  publicClient: PublicClient,
  connectedAddress: string,
): Promise<Maybe<string>> {
  const token = getTokenFromStore();
  if (!token) return null;

  try {
    await did.verifyToken({ token, publicClient });
    return token;
  } catch (e) {
    errorHandler(e as Error);
    clearToken();
    return null;
  }
}

export async function authenticateWallet(
  { client, signer }: { client: WalletClient, signer: `0x${string}` }
) {
  const token = await did.createToken({ client, account: signer });
  setTokenInStore(token);
  return token;
}

type Web3ContextProviderOptions = PropsWithChildren<{
  resetUrqlClient?: () => void;
}>;

type Web3State = {
  viemClients: Maybe<ViemClients>;
  address: Maybe<`0x${string}`>;
  chainId: Maybe<number>;
  authToken: Maybe<string>;
  w3storage: Maybe<W3SClient>;
};

export const Web3ContextProvider: React.FC<Web3ContextProviderOptions> = ({
  resetUrqlClient,
  children,
}) => {
  const [{ chainId, address, authToken }, setWeb3State] =
    useState<Web3State>({
      viemClients: null,
      address: null,
      chainId: null,
      authToken: getTokenFromStore(),
      w3storage: null,
    });
  const [connecting, setConnecting] = useState(false);
  const setAuthToken = (token: string) => setWeb3State((s) => ({ ...s, authToken: token }));

  const viemClients = useViemClients();
  const { chain, address: userAddress } = useAccount();
  const { disconnect: disconnectWAGMI } = useDisconnect();

  const w3storage = useW3upClient();

  const connected = useMemo(
    () => !!viemClients.wallet && !!address && !!chainId && !!authToken && !connecting,
    [viemClients.wallet, address, authToken, chainId, connecting],
  );

  const disconnect = useCallback(() => {
    disconnectWAGMI();
    clearWalletConnect();
    clearToken();
    clearDIDSessionCache();
    setWeb3State({
      viemClients: null,
      address: null,
      chainId: null,
      authToken: null,
      w3storage: null,
    });
    setConnecting(false);
    resetUrqlClient?.();
  }, [resetUrqlClient, disconnectWAGMI]);

  useAccountEffect({
    onDisconnect: disconnect,
    onConnect: async ({ address }) => {
      console.debug({ Connected: address, authToken });
      if(!authToken && viemClients?.wallet) {
        const token = await authenticateWallet({ client: viemClients.wallet, signer: address })
        setAuthToken(token);
      }
    },
  });


  const updateWeb3State = useCallback(
    async () => {
      try {
        if(!userAddress) {
          throw new Error('No user address set in authentication.')
        }
        if(!chain) {
          throw new Error('No network configured in authentication.')
        }

        let token = await getExistingAuth(viemClients.public, userAddress);

        // if (!token) {
        //   token = await authenticateWallet(
        //     { client: viemClients.wallet, signer: userAddress }
        //   );
        // }

        setWeb3State({
          viemClients: viemClients ?? null,
          chainId: chain.id,
          address: userAddress,
          authToken: token,
          w3storage,
        });
      } catch (err) {
        console.warn(`Error Authenticating: ${(err as Error).message}`);
      }
    },
    [chain?.id, userAddress, viemClients, w3storage],
  );

  useEffect(() => {
    updateWeb3State();
  }, [chain, userAddress, updateWeb3State]);

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected.');
  }

  return (
    <Web3Context.Provider
      value={{
        viemClients: viemClients ?? null,
        disconnect,
        connected,
        connecting,
        address,
        authToken,
        chainId,
        w3storage,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

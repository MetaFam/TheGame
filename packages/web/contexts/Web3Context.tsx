import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver';
import type { CeramicApi } from '@ceramicnetwork/common';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { did, Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DIDSession } from 'did-session';
import { DID } from 'dids';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import {
  clearToken,
  clearWalletConnect,
  getTokenFromStore,
  setTokenInStore,
} from 'lib/auth';
import { clearJotaiState } from 'lib/jotaiState';
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

export type Web3ContextType = {
  provider: Maybe<Web3Provider>;
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

const [web3Modal, ceramic] =
  typeof window === 'undefined'
    ? [null, null]
    : [
        new Web3Modal({
          network: 'mainnet',
          cacheProvider: true,
          providerOptions,
        }),
        new CeramicClient(CONFIG.ceramicURL) as CeramicApi,
      ];

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
};

const DID_METHOD = '3ID' as string; // 'PKH'

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
    async (prov: ExternalProvider) => {
      const web3Provider = new Web3Provider(prov);
      const network = (await web3Provider.getNetwork()).chainId;
      const addr = await web3Provider.getSigner().getAddress();

      let token = await getExistingAuth(web3Provider, addr);

      if (!token) {
        token = await authenticateWallet(web3Provider);
      }

      const networkId = `0x${network.toString(16)}`;

      if (ceramic) {
        switch (DID_METHOD) {
          case 'PKH': {
            const accountId = await getAccountId(prov, addr);
            const authMethod = await EthereumWebAuth.getAuthMethod(
              prov,
              accountId,
            );
            const session = await DIDSession.authorize(authMethod, {
              resources: ['ceramic://*'],
            });
            ceramic.did = session.did;
            break;
          }
          case '3ID': {
            const authProvider = new EthereumAuthProvider(prov, addr);
            const threeID = new ThreeIdConnect(CONFIG.ceramicNetwork);
            await threeID.connect(authProvider);
            ceramic.did = new DID({
              provider: threeID.getDidProvider(),
              resolver: {
                ...get3IDResolver(ceramic),
                ...getKeyResolver(),
              },
            });
            break;
          }
          default: {
            console.error(`Unknown DID_METHOD: ${DID_METHOD}`);
          }
        }
      }

      setWeb3State({
        wallet: prov as Web3Modal,
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

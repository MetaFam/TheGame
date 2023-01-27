import { ComposeClient } from '@composedb/client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { Web3Provider } from '@ethersproject/providers';
import { Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DIDSession } from 'did-session';
import { definition } from 'graphql/composeDB/autogen/definition';
import { cacheDIDSession, getCachedDIDSession } from 'lib/auth';
import { useWeb3 } from 'lib/hooks';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { errorHandler } from 'utils/errorHandler';

export type ComposeDBContextType = {
  composeDBClient: Maybe<ComposeClient>;
  connect: () => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
};

export const ComposeDBContext = createContext<ComposeDBContextType>({
  composeDBClient: null,
  connect: async () => undefined,
  disconnect: () => undefined,
  connecting: false,
});

const composeDBClient =
  typeof window === 'undefined'
    ? null
    : new ComposeClient({ ceramic: CONFIG.ceramicURL, definition });
export const ComposeDBContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { provider } = useWeb3();

  const [connecting, setConnecting] = useState(false);

  const disconnect = useCallback(async () => {
    if (composeDBClient === null) return;

    await composeDBClient.context.ceramic.close();
  }, []);

  const createSession = useCallback(async (prov: Web3Provider) => {
    const addr = await prov.getSigner().getAddress();

    // use did:pkh
    let session = await getCachedDIDSession();
    if (!session || (session.hasSession && session.isExpired)) {
      const accountId = await getAccountId(prov.provider, addr);
      const authMethod = await EthereumWebAuth.getAuthMethod(
        prov.provider,
        accountId,
      );
      session = await DIDSession.authorize(authMethod, {
        // todo restrict this to only our composite
        resources: ['ceramic://*'],
      });
      cacheDIDSession(session);
    }
    composeDBClient?.setDID(session.did);
  }, []);

  const connect = useCallback(async () => {
    if (provider == null) return;

    setConnecting(true);

    try {
      await createSession(provider);

      provider.on('accountsChanged', async () => {
        await disconnect();
      });
      provider.on('chainChanged', () => {
        createSession(provider);
      });
    } catch (error) {
      console.error('ComposeDB connect() Error', error); // eslint-disable-line no-console
      errorHandler(error as Error);
      await disconnect();
    } finally {
      setConnecting(false);
    }
  }, [createSession, disconnect, provider]);

  return (
    <ComposeDBContext.Provider
      value={{
        composeDBClient,
        connecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </ComposeDBContext.Provider>
  );
};

export const useComposeDB = (): ComposeDBContextType =>
  useContext(ComposeDBContext);

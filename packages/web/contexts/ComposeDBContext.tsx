import { ComposeClient } from '@composedb/client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { composeDBDefinition, Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DIDSession } from 'did-session';
import { BrowserProvider } from 'ethers';
import { cacheDIDSession, getCachedDIDSession } from 'lib/auth';
import { CeramicError } from 'lib/errors';
import { useWeb3 } from 'lib/hooks/useWeb3';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

export type ComposeDBContextType = {
  composeDBClient: Maybe<ComposeClient>;
  connect: () => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
  authenticated: boolean;
};

export const ComposeDBContext = createContext<ComposeDBContextType>({
  composeDBClient: null,
  connect: async () => undefined,
  disconnect: () => undefined,
  connecting: false,
  authenticated: false,
});

const composeDBClient = new ComposeClient({
  ceramic: CONFIG.ceramicURL,
  definition: composeDBDefinition,
});

export const ComposeDBContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { chainId, provider } = useWeb3();
  const [connecting, setConnecting] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const disconnect = useCallback(async () => {
    if (composeDBClient === null) return;

    await composeDBClient.context.ceramic.close();
    setAuthenticated(false);
  }, []);

  const createSession = useCallback(async (prov: BrowserProvider) => {
    const addr = await (await prov.getSigner()).getAddress();

    // use did:pkh
    let session = await getCachedDIDSession();
    if (!session || (session.hasSession && session.isExpired)) {
      const accountId = await getAccountId(prov.provider, addr.toLowerCase());
      const authMethod = await EthereumWebAuth.getAuthMethod(
        prov.provider,
        accountId,
      );
      session = await DIDSession.authorize(authMethod, {
        resources: composeDBClient.resources,
      });
      cacheDIDSession(session);
    }
    composeDBClient?.setDID(session.did);
  }, []);

  const connect = useCallback(async () => {
    if (provider == null || connecting) return;
    if (chainId !== '0xa') {
      throw new CeramicError('ComposeDB should be used on Optimism only');
    }

    setConnecting(true);

    try {
      await createSession(provider);

      provider.on('accountsChanged', async () => {
        await disconnect();
      });
      provider.on('chainChanged', () => {
        createSession(provider);
      });
      setAuthenticated(true);
    } catch (error) {
      console.error('ComposeDB connect() Error', error); // eslint-disable-line no-console
      errorHandler(error as Error);
      await disconnect();
    } finally {
      setConnecting(false);
    }
  }, [connecting, createSession, disconnect, provider, chainId]);

  return (
    <ComposeDBContext.Provider
      value={{
        composeDBClient,
        connecting,
        connect,
        disconnect,
        authenticated,
      }}
    >
      {children}
    </ComposeDBContext.Provider>
  );
};

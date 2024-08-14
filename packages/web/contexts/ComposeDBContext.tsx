import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from '@composedb/client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { composeDBDefinition, Maybe } from '@metafam/utils';
import { DIDSession } from 'did-session';
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { CONFIG } from '#config';
import { CeramicError } from '#lib/errors';
import { errorHandler } from '#utils/errorHandler';
import { useViemClients } from '#lib/hooks/useEthersProvider';

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

export const ComposeDBContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { address, chain } = useAccount()
  const { wallet } = useViemClients();
  const [connecting, setConnecting] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const composeDBClient = useMemo(() => (
    new ComposeClient({
      ceramic: new CeramicClient(CONFIG.ceramicURL),
      definition: composeDBDefinition,
    })
  ), [])
  
  const disconnect = useCallback(async () => {
    if (composeDBClient === null) return;

    await composeDBClient.context.ceramic.close();
    setAuthenticated(false);
  }, []);

  const createSession = useCallback(
    async () => {
      if (!address) throw new Error('No address when creating ComposeDB session.');
      
      const accountId = await getAccountId(wallet, address);
      const authMethod = await EthereumWebAuth.getAuthMethod(
        wallet, accountId,
      );
      const session = await DIDSession.get(accountId, authMethod, {
        resources: composeDBClient.resources,
      });
      composeDBClient.setDID(session.did); // sets DID on Ceramic instance
      console.debug({ 'Auth’d': session.did.id, CDB: composeDBClient.did?.id, Parent: session.did.parent })
    },
    [address, wallet, composeDBClient]
  );

  const connect = useCallback(async () => {
    if(connecting) return;
    if (chain?.id !== 10) {
      throw new CeramicError('ComposeDB should be used on Optimism only.');
    }

    setConnecting(true);

    try {
      await createSession();

      // provider.on('accountsChanged', async () => {
      //   await disconnect();
      // });
      // provider.on('chainChanged', () => {
      //   createSession(provider);
      // });
      setAuthenticated(true);
    } catch (error) {
      console.error('ComposeDB connect() Error', error); // eslint-disable-line no-console
      errorHandler(error as Error);
      await disconnect();
    } finally {
      setConnecting(false);
    }
  }, [createSession, disconnect]);

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

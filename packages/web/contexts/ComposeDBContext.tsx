import { ComposeClient } from '@composedb/client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { composeDBDefinition, Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DIDSession } from 'did-session';
import { ethers } from 'ethers';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import { cacheDIDSession, getCachedDIDSession } from '#lib/auth';
import { CeramicError } from '#lib/errors';
import { errorHandler } from '#utils/errorHandler';
import { useEthersProvider, useViemClients } from '#lib/hooks/useEthersProvider';

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
  const { address, chain } = useAccount()
  const clients = useViemClients();
  const [connecting, setConnecting] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const disconnect = useCallback(async () => {
    if (composeDBClient === null) return;

    await composeDBClient.context.ceramic.close();
    setAuthenticated(false);
  }, []);

  const createSession = useCallback(
    async () => {
      if (!address) throw new Error('No address when creating ComposeDB session.');
      
      const accountId = await getAccountId(clients.wallet, address.toLowerCase());
      const authMethod = await EthereumWebAuth.getAuthMethod(
        clients.wallet,
        accountId,
      );
      const session = await DIDSession.get(accountId, authMethod, {
        resources: composeDBClient.resources,
      });
      // composeDBClient.setDID(session.did);
      composeDBClient.context.ceramic.setDID(session.did);
      console.debug({ 'Auth’d': session.did.id, Parent: session.did.parent })
    },
    [address, clients.wallet, composeDBClient]
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
  }, [createSession, disconnect ]);

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

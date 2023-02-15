import { Player } from 'graphql/autogen/types';
import { buildPlayerProfileQuery } from 'graphql/composeDB/queries/profile';
import { ComposeDBProfileQueryResult } from 'graphql/types';
import { hydratePlayerProfile } from 'lib/hooks/ceramic/useGetPlayerProfileFromComposeDB';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { useComposeDB } from './ComposeDBContext';

export type PlayerHydrationContextType = {
  hydratedPlayer: Player;
  isHydrating: boolean;
  performHydration: (ceramicProfileNodeId: string) => void;
};

export const PlayerHydrationContext = createContext<PlayerHydrationContextType>(
  {
    isHydrating: false,
    performHydration: () => null,
    hydratedPlayer: {} as Player,
  },
);

type PlayerHydrationContextProviderOptions = PropsWithChildren<{
  player: Player;
}>;

export const PlayerHydrationContextProvider: React.FC<
  PlayerHydrationContextProviderOptions
> = ({ player, children }) => {
  const { composeDBClient } = useComposeDB();

  const [hydrating, setHydrating] = useState(false);
  const [hydratedPlayer, setHydratedPlayer] = useState(player);

  const performHydration = useCallback(
    async (ceramicProfileNodeId: string) => {
      if (composeDBClient && ceramicProfileNodeId) {
        setHydrating(true);

        const query = buildPlayerProfileQuery(ceramicProfileNodeId);
        const response = await composeDBClient.executeQuery(query);
        if (response.data != null) {
          const composeDBProfileData = (
            response.data as ComposeDBProfileQueryResult
          ).node;
          const newPlayer = hydratePlayerProfile(player, composeDBProfileData);
          setHydratedPlayer(newPlayer);
        }

        setHydrating(false);
      }
    },
    [composeDBClient, player],
  );

  return (
    <PlayerHydrationContext.Provider
      value={{
        isHydrating: hydrating,
        hydratedPlayer,
        performHydration,
      }}
    >
      {children}
    </PlayerHydrationContext.Provider>
  );
};

export const usePlayerHydrationContext = (): PlayerHydrationContextType =>
  useContext(PlayerHydrationContext);

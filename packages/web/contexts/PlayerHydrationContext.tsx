import { Player } from 'graphql/autogen/types';
import { buildPlayerProfileQuery } from 'graphql/composeDB/queries/profile';
import { getPlayer } from 'graphql/getPlayer';
import { ComposeDBProfileQueryResult } from 'graphql/types';
import { hydratePlayerProfile } from 'lib/hooks/ceramic/useGetPlayerProfileFromComposeDB';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useComposeDB } from './ComposeDBContext';

export type PlayerHydrationContextType = {
  hydratedPlayer: Player;
  isHydrating: boolean;
  hydrateFromComposeDB: (ceramicProfileNodeId: string) => Promise<void>;
  hydrateFromHasura: () => Promise<void>;
};

export const PlayerHydrationContext = createContext<PlayerHydrationContextType>(
  {
    hydratedPlayer: {} as Player,
    isHydrating: false,
    hydrateFromComposeDB: () => Promise.resolve(),
    hydrateFromHasura: () => Promise.resolve(),
  },
);

type PlayerHydrationContextProviderOptions = PropsWithChildren<{
  player: Player;
  isHydratedAlready?: boolean;
}>;

export const PlayerHydrationContextProvider: React.FC<
  PlayerHydrationContextProviderOptions
> = ({ player, isHydratedAlready = false, children }) => {
  const { composeDBClient } = useComposeDB();

  const [hydrating, setHydrating] = useState(false);
  const [hydratedPlayer, setHydratedPlayer] = useState(player);

  const hydrateFromComposeDB = useCallback(
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

  const hydrateFromHasura = useCallback(async () => {
    setHydrating(true);
    // getMe seems more appropriate here, but there were some issues with types
    const updatedPlayer = await getPlayer(player.ethereumAddress, true);

    if (updatedPlayer) {
      setHydratedPlayer({
        ...player,
        // only update hasura fields, not any profile fields since those come from ComposeDB
        skills: updatedPlayer.skills,
        roles: updatedPlayer.roles,
      });
    }
    setHydrating(false);
  }, [player]);

  useEffect(() => {
    if (!isHydratedAlready && player.ceramicProfileId) {
      hydrateFromComposeDB(player.ceramicProfileId);
    }
  }, [hydrateFromComposeDB, isHydratedAlready, player.ceramicProfileId]);

  return (
    <PlayerHydrationContext.Provider
      value={{
        isHydrating: hydrating,
        hydratedPlayer,
        hydrateFromComposeDB,
        hydrateFromHasura,
      }}
    >
      {children}
    </PlayerHydrationContext.Provider>
  );
};

export const usePlayerHydrationContext = (): PlayerHydrationContextType =>
  useContext(PlayerHydrationContext);

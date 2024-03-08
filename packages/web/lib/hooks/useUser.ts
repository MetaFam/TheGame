/* eslint-disable no-console */
import { Maybe } from '@metafam/utils';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { RequestPolicy } from 'urql';
import { getPlayer } from 'graphql/getPlayer';
import {
  hydratePlayerProfile,
  useGetPlayerProfileFromComposeDB,
} from './ceramic/useGetPlayerProfileFromComposeDB';
import { useAccount } from 'wagmi';

type UseUserOpts = {
  redirectTo?: string;
  redirectIfNotFound?: boolean;
  requestPolicy?: RequestPolicy;
};

export const useUser = ({
  redirectTo,
  redirectIfNotFound = false,
  requestPolicy = 'cache-first',
}: UseUserOpts = {}): {
  connecting: boolean;
  connected: boolean;
  user: Maybe<Player>;
  fetching: boolean;
  error?: Error;
} => {
  const { isConnected, isConnecting, address } = useAccount();
  const router = useRouter();
  const [player, setPlayer] = useState<Maybe<Player>>(null);

  useEffect(() => {
    if (!address) return;
    async function getPeople() {
      if (address) {
        const player = await getPlayer(address);
        return player
      }
    }
    getPeople().then(player => setPlayer(player!))
  }, [address]);

  const [hydratedPlayer, setHydratedPlayer] = useState<Player | null>(null);

  const hasuraUser = useMemo(
    () =>
      player && isConnected ? (player as Player) : null,
    [isConnected, player],
  );

  const {
    result,
    fetching: composeDBFetching,
    error: composeDBError,
  } = useGetPlayerProfileFromComposeDB(hasuraUser?.ceramicProfileId);
  console.log({ result, composeDBFetching, composeDBError });
  useEffect(() => {
    if (hasuraUser) {
      if (hasuraUser.ceramicProfileId == null || !!composeDBError) {
        setHydratedPlayer(hasuraUser);
      } else if (result) {
        setHydratedPlayer(hydratePlayerProfile(hasuraUser, result));
      }
    }
  }, [result, hasuraUser, composeDBError]);

  useEffect(() => {
    if (isConnecting) return;

    if (!hasuraUser && redirectIfNotFound && redirectTo) {
      router.push(redirectTo);
    }
  }, [
    router,
    hasuraUser,
    isConnecting,
    redirectIfNotFound,
    redirectTo,
  ]);

  if (composeDBError) console.error({ composeDBError });

  return {
    connecting: isConnecting,
    connected: isConnected,
    user: hydratedPlayer,
    fetching: false,
    error: undefined,
  };
};

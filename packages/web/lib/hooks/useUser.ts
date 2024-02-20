/* eslint-disable no-console */
import { Maybe } from '@metafam/utils';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { RequestPolicy } from 'urql';

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
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const [{ data, error, fetching }] = useGetMeQuery({
    pause: !isConnected,
    requestPolicy,
  });
  const [me] = data?.me ?? [];

  const [hydratedPlayer, setHydratedPlayer] = useState<Player | null>(null);

  const hasuraUser = useMemo(
    () =>
      !error && !fetching && me && isConnected ? (me.record as Player) : null,
    [error, me, isConnected, fetching],
  );

  const {
    result,
    fetching: composeDBFetching,
    error: composeDBError,
  } = useGetPlayerProfileFromComposeDB(hasuraUser?.ceramicProfileId);

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
    if (fetching || isConnecting) return;

    if (!hasuraUser && redirectIfNotFound && redirectTo) {
      router.push(redirectTo);
    }
  }, [
    router,
    hasuraUser,
    fetching,
    isConnecting,
    redirectIfNotFound,
    redirectTo,
  ]);

  if (error) console.error({ error });
  if (composeDBError) console.error({ composeDBError });

  return {
    connecting: isConnecting,
    connected: isConnected,
    user: hydratedPlayer,
    fetching: fetching || composeDBFetching,
    error,
  };
};

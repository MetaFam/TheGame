/* eslint-disable no-console */
import { Maybe } from '@metafam/utils';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks/useWeb3';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { RequestPolicy } from 'urql';

import {
  hydratePlayerProfile,
  useGetPlayerProfileFromComposeDB,
} from './ceramic/useGetPlayerProfileFromComposeDB';

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
  const { authToken, connecting, connected } = useWeb3();
  const router = useRouter();
  const [{ data, error, fetching }] = useGetMeQuery({
    pause: !connected,
    requestPolicy,
  });
  const [me] = data?.me ?? [];

  const [hydratedPlayer, setHydratedPlayer] = useState<Player | null>(null);

  const hasuraUser = useMemo(
    () =>
      !error && !fetching && me && connected ? (me.record as Player) : null,
    [error, me, connected, fetching],
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
    if (fetching || connecting) return;

    if (!hasuraUser && redirectIfNotFound && redirectTo) {
      router.push(redirectTo);
    }
  }, [
    router,
    hasuraUser,
    fetching,
    connecting,
    redirectIfNotFound,
    redirectTo,
  ]);

  if (error) console.error({ error });
  if (composeDBError) console.error({ composeDBError });

  return {
    connecting,
    connected,
    user: hydratedPlayer,
    fetching: fetching || composeDBFetching,
    error,
  };
};

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
    pause: connecting || !connected || !authToken,
    requestPolicy,
  });
  const [me] = data?.me ?? [];

  const [hydratedPlayer, setHydratedPlayer] = useState<Player | null>(null);

  const hasuraUser = useMemo(
    () =>
      !error && !fetching && authToken && me && connected
        ? (me.record as Player)
        : null,
    [error, authToken, me, connected, fetching],
  );

  const {
    result,
    fetching: composeDBFetching,
    error: composeDBError,
  } = useGetPlayerProfileFromComposeDB(hasuraUser?.ceramicProfileId);

  useEffect(() => {
    if (hasuraUser) {
      if (hasuraUser.ceramicProfileId == null || composeDBError) {
        setHydratedPlayer(hasuraUser);
      } else if (hasuraUser && result) {
        setHydratedPlayer(hydratePlayerProfile(hasuraUser, result));
      }
    }
  }, [result, hasuraUser, composeDBError]);

  if (error) {
    console.error('useUser error', error);
  }

  if (!authToken && connected) {
    // eslint-disable-next-line no-console
    console.warn('`authToken` unset when connected');
  }

  useEffect(() => {
    if (!redirectTo || fetching || connecting) return;

    // If redirectTo is set and redirectIfNotFound is set then
    // redirect if the user was not found.
    if (redirectTo && redirectIfNotFound && !hasuraUser) {
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

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected.');
  }

  return {
    connecting,
    connected,
    user: hydratedPlayer,
    fetching: fetching || composeDBFetching,
    error,
  };
};

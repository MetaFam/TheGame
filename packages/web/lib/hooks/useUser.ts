/* eslint-disable no-console */
import { Maybe } from '@metafam/utils';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks/useWeb3';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { CombinedError, RequestPolicy } from 'urql';

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

  console.debug({ 'useUser me': me });

  const user = useMemo(
    () =>
      !error && !fetching && authToken && me && connected
        ? (me.record as Player)
        : null,
    [error, authToken, me, connected, fetching],
  );
  console.debug({ 'useUser user': user });

  useEffect(() => {
    if (!redirectTo || fetching || connecting) return;

    // If redirectTo is set and redirectIfNotFound is set then
    // redirect if the user was not found.
    if (redirectTo && redirectIfNotFound && !user) {
      router.push(redirectTo);
    }
  }, [router, user, fetching, connecting, redirectIfNotFound, redirectTo]);
  console.debug('useUser post effect');

  if (!authToken && connected) {
    console.warn('`authToken` unset when connected');
  }
  console.debug('useUser returning');

  return {
    connecting,
    connected,
    user,
    fetching,
    error,
  };
};

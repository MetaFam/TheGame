import { Maybe } from '@metafam/utils';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
// eslint-disable-next-line import/no-cycle
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
  error?: CombinedError;
} => {
  const { authToken, connecting, connected } = useWeb3();
  const router = useRouter();
  const [{ data, error, fetching }] = useGetMeQuery({
    pause: connecting || !connected || !authToken,
    requestPolicy,
  });
  const [me] = data?.me ?? [];
  const user = useMemo(
    () => (!error && authToken && me ? (me.record as Player) : null),
    [error, authToken, me],
  );

  if (error) {
    // eslint-disable-next-line no-console
    console.error(`useUser Error: ${error.message}`);
  }

  useEffect(() => {
    if (!redirectTo || fetching || connecting) return;

    // If redirectTo is set and redirectIfNotFound is set then
    // redirect if the user was not found.
    if (redirectTo && redirectIfNotFound && !user) {
      router.push(redirectTo);
    }
  }, [router, user, fetching, connecting, redirectIfNotFound, redirectTo]);

  return {
    connecting,
    connected,
    user,
    fetching,
    error,
  };
};

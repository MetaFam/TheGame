import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import { Player, useGetMeQuery } from 'graphql/autogen/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MeType } from 'graphql/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { RequestPolicy } from 'urql';

export const useWeb3 = (): Web3ContextType => useContext(Web3Context);

type UseUserOpts = {
  redirectTo?: string;
  redirectIfNotFound?: boolean;
  forLoginDisplay?: boolean;
  requestPolicy?: RequestPolicy | undefined;
};

export const useUser = ({
  redirectTo,
  redirectIfNotFound = false,
  forLoginDisplay = false,
  requestPolicy = 'cache-first',
}: UseUserOpts = {}): {
  user: Maybe<MeType>;
  fetching: boolean;
} => {
  const { authToken, connecting } = useWeb3();
  const router = useRouter();

  const [{ data, error, fetching }] = useGetMeQuery({
    pause: connecting || !authToken,
    variables: { forLoginDisplay },
    requestPolicy,
  });
  const [me] = data?.me ?? [];
  const user = useMemo(
    () =>
      !error && authToken && me ? { ...me, player: me.player as Player } : null,
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

  return { user, fetching };
};

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

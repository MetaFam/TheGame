import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import {
  Player,
  useGetLoginBasicsQuery,
  useGetMeQuery,
} from 'graphql/autogen/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { LoginBasicsType } from 'graphql/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { CombinedError, RequestPolicy } from 'urql';

export const useWeb3 = (): Web3ContextType => useContext(Web3Context);

type UseUserOpts = {
  redirectTo?: string;
  redirectIfNotFound?: boolean;
  requestPolicy?: RequestPolicy | undefined;
};

export const useUser = ({
  redirectTo,
  redirectIfNotFound = false,
  requestPolicy = 'cache-first',
}: UseUserOpts = {}): {
  user: Maybe<Player>;
  fetching: boolean;
  error?: CombinedError;
} => {
  const { authToken, connecting } = useWeb3();
  const router = useRouter();

  const [{ data, error, fetching }] = useGetMeQuery({
    pause: connecting || !authToken,
    requestPolicy,
  });
  const [me] = data?.me ?? [];
  const user = useMemo(
    () => (!error && authToken && me ? (me.player as Player) : null),
    [error, authToken, me],
  );

  if (error) {
    // eslint-disable-next-line no-console
    console.error(`useUser Error: ${error.message}`);
  }

  useEffect(() => {
    if (fetching || connecting) return;

    // If redirectTo is set and redirectIfNotFound is set then
    // redirect if the user was not found.
    if (redirectTo && redirectIfNotFound && !user) {
      router.push(redirectTo);
    }
  }, [router, user, fetching, connecting, redirectIfNotFound, redirectTo]);

  return { user, fetching, error };
};

export const useLoginBasics = ({
  requestPolicy = 'cache-first',
}: UseUserOpts = {}): {
  user: Maybe<LoginBasicsType>;
  fetching: boolean;
  error?: CombinedError;
} => {
  const { authToken, connecting } = useWeb3();
  const [{ data, error, fetching }] = useGetLoginBasicsQuery({
    pause: connecting || !authToken,
    requestPolicy,
  });
  const [me] = data?.me ?? [];
  const user = useMemo(
    () => (!error && authToken ? me?.player ?? null : null),
    [error, authToken, me],
  );

  if (error) {
    // eslint-disable-next-line no-console
    console.error(`useLoginBasics Error: ${error.message}`);
  }

  return { user, fetching, error };
};

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const useMounted = (): boolean => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
};

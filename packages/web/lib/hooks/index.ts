import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import { useGetMeQuery } from 'graphql/autogen/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MeType } from 'graphql/types';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
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
  const user = error || !authToken || !me ? null : me;

  useEffect(() => {
    if (!redirectTo || fetching || connecting) return;

    if (
      // If redirectTo is set and redirectIfNotFound is set then
      // redirect if the user was not found.
      redirectTo &&
      redirectIfNotFound &&
      !user
    ) {
      router.push(redirectTo);
    }
  }, [router, user, fetching, connecting, redirectIfNotFound, redirectTo]);

  return { user, fetching };
};

export const useMounted = (): boolean => {
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import { useGetMeQuery } from 'graphql/autogen/types';
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
  user: MeType | null;
  fetching: boolean;
} => {
  const { authToken } = useWeb3();
  const router = useRouter();

  const [{ data, error, fetching }] = useGetMeQuery({
    pause: !authToken,
    variables: { forLoginDisplay },
    requestPolicy,
  });
  const me = data?.me[0];
  const user = error || !authToken || !me ? null : me;

  useEffect(() => {
    if (!redirectTo) return;

    if (
      // If redirectTo is set and redirectIfNotFound is set then redirect if the user was not found.
      redirectTo &&
      redirectIfNotFound &&
      !user
    ) {
      router.push(redirectTo);
    }
  }, [router, user, redirectIfNotFound, redirectTo]);

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

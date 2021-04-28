import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import { useGetMeQuery } from 'graphql/autogen/types';
import { MeType } from 'graphql/types';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

export const useWeb3 = (): Web3ContextType => useContext(Web3Context);

type UseUserOpts = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export const useUser = ({ redirectTo, redirectIfFound }: UseUserOpts = {}): {
  user: MeType | null;
  fetching: boolean;
} => {
  const { authToken } = useWeb3();
  const router = useRouter();

  const [{ data, error, fetching }] = useGetMeQuery({
    pause: !authToken,
  });
  const me = data?.me[0];
  const user = error || !authToken || !me ? null : me;

  useEffect(() => {
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      router.push(redirectTo);
    }
  }, [router, user, redirectIfFound, redirectTo]);

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

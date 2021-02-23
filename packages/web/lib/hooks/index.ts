import { Web3Context } from 'contexts/Web3Context';
import { useGetMeQuery } from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

export const useWeb3 = () => useContext(Web3Context);

type UseUserOpts = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export const useUser = ({ redirectTo, redirectIfFound }: UseUserOpts = {}) => {
  const { authToken } = useWeb3();
  const router = useRouter();

  const [{ data, error, fetching }] = useGetMeQuery({
    pause: !authToken,
  });

  const user = data?.me[0];

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      router.push(redirectTo);
    }
  }, [router, user, redirectIfFound, redirectTo]);

  return { user: error ? null : user, fetching };
};

export const useMounted = () => {
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

/* eslint-disable no-console */
import { Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { RequestPolicy } from 'urql';
import { useAccount } from 'wagmi';

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
  const debug = !!useRouter().query.debug;
  const { isConnected, isConnecting, address } = useAccount();
  const router = useRouter();
  const [player, setPlayer] = useState<Maybe<Player>>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (debug) console.debug({ getPerson: address });

    if (!address) return;
    const getPerson = async () => {
      if (!address) throw new Error('No address.');
      return getPlayer(address);
    };
    getPerson().then((person) => {
      // eslint-disable-next-line no-console
      if (debug) console.debug({ getPlayer: person });
      setPlayer(person);
    });
  }, [address, debug]);

  const [hydratedPlayer, setHydratedPlayer] = useState<Maybe<Player>>(null);

  const hasuraUser = useMemo(
    () => (player && isConnected ? (player as Player) : null),
    [isConnected, player],
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
    if (isConnecting) return;

    if (!hasuraUser && redirectIfNotFound && redirectTo) {
      router.push(redirectTo);
    }
  }, [router, hasuraUser, isConnecting, redirectIfNotFound, redirectTo]);

  if (composeDBError) console.error({ composeDBError });

  return {
    connecting: isConnecting,
    connected: isConnected,
    user: hydratedPlayer,
    fetching: false,
    error: undefined,
  };
};

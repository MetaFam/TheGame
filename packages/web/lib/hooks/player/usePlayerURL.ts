import { Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { useCallback } from 'react';
import useSWR from 'swr';
import { getENSForAddress } from 'utils/ensHelpers';

export const usePlayerURL = (player?: Maybe<Player | GuildPlayer>) => {
  const username = player?.profile?.username;

  const fetcher = useCallback(
    () => getENSForAddress(player?.ethereumAddress),
    [player?.ethereumAddress],
  );

  const { data: ens } = useSWR(
    username && username.includes('.') ? username : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return `/player/${username || ens || player?.ethereumAddress}`;
};

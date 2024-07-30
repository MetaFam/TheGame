import { Maybe } from '@metafam/utils';
import { useCallback } from 'react';
import useSWR from 'swr';

import { Player } from '#graphql/autogen/hasura-sdk';
import { GuildPlayer } from '#graphql/types';
import { getENSForAddress } from '#utils/ensHelpers';
import { formatAddress, formatIfAddress } from '#utils/playerHelpers';

export const usePlayerName = (player?: Maybe<Player | GuildPlayer>) => {
  const username = player?.profile?.username;
  const name = player?.profile?.name || formatIfAddress(username ?? undefined);

  const ethAddress = player?.ethereumAddress;

  const fetcher = useCallback(() => getENSForAddress(ethAddress), [ethAddress]);

  const { data: ens } = useSWR(
    username && username.includes('.') ? username : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return name || ens || formatAddress(player?.ethereumAddress);
};

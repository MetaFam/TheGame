import gql from 'fake-tag';

import {
  GetDaoMembershipsQuery,
  GetDaoMembershipsQueryVariables,
  GetPlayerGuildsQuery,
  GetPlayerGuildsQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client } from './client';

const daoMembershipsQuery = gql`
  query GetDaoMemberships($address: String) {
    getDaoHausMemberships(memberAddress: $address) {
      id
      moloch {
        id
        title
        version
        chain
      }
    }
  }
`;

const guildMembershipsQuery = gql`
  query GetPlayerGuilds($playerId: uuid!) {
    guild_player(where: { player_id: { _eq: $playerId } }) {
      guild_id
      Guild {
        logo
        moloch_address
        name
      }
    }
  }
`;

export const getGuildMemberships = async (playerId: string) => {
  const { data } = await client
    .query<GetPlayerGuildsQuery, GetPlayerGuildsQueryVariables>(
      guildMembershipsQuery,
      { playerId },
    )
    .toPromise();

  return data?.guild_player;
};

export const getDaoMemberships = async (address: string | null) => {
  if (!address) return null;
  const { data } = await client
    .query<GetDaoMembershipsQuery, GetDaoMembershipsQueryVariables>(
      daoMembershipsQuery,
      { address },
    )
    .toPromise();

  return data?.getDaoHausMemberships;
};

export type GuildMembership = {
  memberId: string;
  memberShares?: string;
  memberRank?: string;
  memberXp?: number;
  title?: string;
  daoShares?: string;
  chain?: string;
  address?: string;
};

export const getAllMemberships = async (player: PlayerFragmentFragment) => {
  const guildPlayers = await getGuildMemberships(player.id);

  const memberships: GuildMembership[] = [
    ...(guildPlayers || []).map((gp) => ({
      memberId: `${gp.guild_id}:${player.id}`,
      title: gp.Guild.name,
      memberRank: player.rank || '',
      memberXp: player.total_xp,
    })),
    ...(player.daohausMemberships || []).map((m) => ({
      memberId: m.id,
      title: m.moloch.title || undefined,
      memberShares: m.shares,
      daoShares: m.moloch.totalShares,
      chain: m.moloch.chain,
      address: m.molochAddress,
    })),
  ];

  return memberships;
};

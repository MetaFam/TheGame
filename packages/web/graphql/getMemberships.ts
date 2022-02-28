import {
  GetDaoMembershipsQuery,
  GetDaoMembershipsQueryVariables,
  GetPlayerGuildsQuery,
  GetPlayerGuildsQueryVariables,
  Player,
} from './autogen/types';
import { client } from './client';

const daoMembershipsQuery = /* GraphQL */ `
  query GetDaoMemberships($address: String) {
    getDaoHausMemberships(memberAddress: $address) {
      id
      moloch {
        id
        title
        version
        chain
        avatarURL
      }
    }
  }
`;

const guildMembershipsQuery = /* GraphQL */ `
  query GetPlayerGuilds($playerId: uuid!) {
    guild_player(where: { player_id: { _eq: $playerId } }) {
      guild_id
      Guild {
        id
        logo
        moloch_address
        name
        guildname
        membership_through_discord
      }
      discordRoles {
        id
        name
        position
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
  memberXP?: number;
  title?: string;
  daoShares?: string;
  chain?: string;
  address?: string;
  logoURL?: string;
  guildname?: string;
};

export const getAllMemberships = async (player: Player) => {
  const guildPlayers = await getGuildMemberships(player.id);

  const daohausMemberships = player.daohausMemberships?.filter(
    (m) =>
      !guildPlayers?.some(
        (gp) =>
          gp.Guild.moloch_address === m.molochAddress &&
          gp.Guild.membership_through_discord === true,
      ),
  );

  const memberships: Array<GuildMembership> = [
    ...(guildPlayers || []).map((gp) => ({
      memberId: `${gp.guild_id}:${player.id}`,
      title: gp.Guild.name,
      guildname: gp.Guild.guildname,
      memberRank: gp.discordRoles[0].name ?? undefined,
      memberXP: gp.Guild.guildname === 'metafam' ? player.totalXP : null,
      logoURL: gp.Guild.logo ?? undefined,
    })),
    ...(daohausMemberships || []).map((m) => ({
      memberId: m.id,
      title: m.moloch.title ?? undefined,
      memberShares: m.shares,
      daoShares: m.moloch.totalShares,
      chain: m.moloch.chain,
      logoURL: m.moloch.avatarURL ?? undefined,
      address: m.molochAddress,
    })),
  ];

  return memberships;
};

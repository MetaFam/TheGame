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
      molochAddress
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
    guild_player(where: { playerId: { _eq: $playerId } }) {
      visible
      guildId
      Guild {
        id
        logo
        name
        guildname
        membershipThroughDiscord
        daos {
          id
          contractAddress
        }
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
  const response = await client
    .query<GetPlayerGuildsQuery, GetPlayerGuildsQueryVariables>(
      guildMembershipsQuery,
      { playerId },
    )
    .toPromise();
  return response.data?.guild_player;
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
  id: string;
  memberShares?: string;
  memberRank?: string;
  memberXP?: number;
  title?: string;
  daoShares?: string;
  chain?: string;
  address?: string;
  logoURL?: string;
  guildname?: string;
  visible?: boolean;
  guildId?: string;
};

export const getAllMemberships = async (player: Player) => {
  const guildPlayers = await getGuildMemberships(player.id);

  const daoMemberships =
    player.daohausMemberships ??
    (await getDaoMemberships(player.ethereumAddress));

  // filter out any Daohaus DAOs that are also linked to an existing Guild whose
  // membership is determined by their Discord server
  const filteredMemberships = daoMemberships?.filter(
    (m) =>
      !guildPlayers?.some(
        (gp) =>
          gp.Guild.daos.some(
            (dao) => dao.contractAddress === m.molochAddress,
          ) && gp.Guild.membershipThroughDiscord === true,
      ),
  );

  const guild = (guildPlayers ?? []).map((gp) => ({
    id: `${gp.guildId}:${player.id}`,
    title: gp.Guild.name,
    guildname: gp.Guild.guildname,
    memberRank: gp.discordRoles[0]?.name ?? undefined,
    memberXP: gp.Guild.guildname === 'metafam' ? player.totalXP : null,
    logoURL: gp.Guild.logo ?? undefined,
    visible: gp.visible,
    guildId: gp.guildId,
  }));

  const daoHaus = (filteredMemberships || []).map((m) => ({
    id: m.id,
    title: m.moloch.title ?? undefined,
    memberShares: m.shares,
    daoShares: m.moloch.totalShares,
    chain: m.moloch.chain,
    logoURL: m.moloch.avatarURL ?? undefined,
    address: m.molochAddress,
  }));

  const all: Array<GuildMembership> = [...guild, ...daoHaus];

  return { all, guild, daoHaus };
};

import { gql } from 'graphql-request';

export const typeDefs = gql`
  scalar uuid

  type Query {
    getDaoHausMemberships(memberAddress: String): [Member!]!
    getBrightIdStatus(contextId: uuid): BrightIdStatus
    getTokenBalances(address: String): TokenBalances
    getTopPSeedHolders(limit: Int): [TokenBalances!]
    getGuildDiscordRoles(guildDiscordId: String): [DiscordRole!]!
    getDiscordServerMemberRoles(
      guildId: uuid!
      playerId: uuid!
    ): [DiscordRole!]!
    getGuildDiscordAnnouncements(guildDiscordId: String): [String!]
    getPSeedInfo: PSeedInfo
  }

  type BrightIdStatus {
    unique: Boolean!
    app: String!
    context: String!
    contextIds: [String!]!
  }

  type CollectiblesFavorites {
    address: String
    tokenId: String
  }

  type Moloch {
    id: ID!
    summoner: String!
    totalShares: String!
    totalLoot: String!
    chain: String!
    title: String
    version: String
    avatarURL: String
  }

  type Member {
    id: ID!
    createdAt: String!
    moloch: Moloch!
    molochAddress: String!
    memberAddress: String!
    delegateKey: String!
    shares: String!
    loot: String
    exists: Boolean!
    kicked: Boolean
  }

  type TokenBalances {
    id: ID!
    seedBalance: String!
    pSeedBalance: String!
  }

  type PSeedInfo {
    priceUsd: String
  }

  type DiscordRole {
    id: String!
    position: Int!
    name: String!
  }

  # e.g. https://data.daohaus.club/dao/0xb152b115c94275b54a3f0b08c1aa1d21f32a659a
  type DaoMetadata {
    contractAddress: String!
    network: String!
    name: String!
    description: String!
    avatarImg: String
  }
`;

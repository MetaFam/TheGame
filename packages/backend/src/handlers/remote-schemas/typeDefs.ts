import { gql } from 'graphql-request/dist';

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
    title: String
    version: String
    totalShares: String!
    totalLoot: String!
    chain: String!
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

  type DiscordRole {
    id: String!
    position: Int!
    name: String!
  }
`;

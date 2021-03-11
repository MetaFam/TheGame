import { gql } from 'graphql-request/dist';

export const typeDefs = gql`
  scalar uuid

  type Query {
    getBoxProfile(address: String): BoxProfile
    getDaoHausMemberships(memberAddress: String): [Member!]!
    getBrightIdStatus(contextId: uuid): BrightIdStatus
    getTokenBalances(address: String): UserToken
  }

  type BrightIdStatus {
    unique: Boolean!
    app: String!
    context: String!
    contextIds: [String!]!
  }

  type BoxProfile {
    ethereumAddress: String
    name: String
    description: String
    location: String
    job: String
    emoji: String
    imageUrl: String
    coverImageUrl: String
    website: String
    collectiblesFavorites: [CollectiblesFavorites!]
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

  type UserToken {
    id: ID!
    seedBalance: String!
    pSeedBalance: String!
  }
`;

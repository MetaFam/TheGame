import { gql } from 'graphql-request/dist';

export const typeDefs = gql`
  type Query {
    getBoxProfile(address: String): BoxProfile
    getDaoHausMemberships(memberAddress: String): [Member!]!
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
  }

  type Moloch {
    id: ID!
    summoner: String!
    title: String
    version: String
    totalShares: Int!
    totalLoot: Int!
  }

  type Member {
    id: ID!
    createdAt: String!
    moloch: Moloch!
    molochAddress: String!
    memberAddress: String!
    delegateKey: String!
    shares: Int!
    loot: Int
    exists: Boolean!
    kicked: Boolean
  }
`;

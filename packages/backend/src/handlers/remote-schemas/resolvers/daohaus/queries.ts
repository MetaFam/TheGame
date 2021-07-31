import { gql } from 'graphql-request/dist';

export const GetDaoHausMemberships = gql`
  query GetDaoHausMemberships($memberAddress: Bytes!) {
    members(
      where: { memberAddress: $memberAddress, didRagequit: false, exists: true }
    ) {
      id
      shares
      molochAddress
      createdAt
      memberAddress
      loot
      exists
      kicked
      moloch {
        id
        version
        summoner
        totalShares
        totalLoot
      }
      delegateKey
    }
  }
`;

export const GetDaoHausTitles = gql`
  query GetDaoHausTitles($ids: [ID!]) {
    daoMetas(where: { id_in: $ids }) {
      id
      title
    }
  }
`;

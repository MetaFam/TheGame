import { gql } from 'graphql-request';

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

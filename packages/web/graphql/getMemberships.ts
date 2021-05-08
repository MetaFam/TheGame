import gql from 'fake-tag';

import {
  GetMembershipsQuery,
  GetMembershipsQueryVariables,
} from './autogen/types';
import { client } from './client';

const membershipsQuery = gql`
  query GetMemberships($address: String!) {
    getDaoHausMemberships(memberAddress: $address) {
      id
      moloch {
        id
        title
        version
      }
    }
  }
`;

export const getMemberships = async (address: string | null) => {
  if (!address) return null;
  const { data } = await client
    .query<GetMembershipsQuery, GetMembershipsQueryVariables>(
      membershipsQuery,
      { address },
    )
    .toPromise();

  return data?.getDaoHausMemberships;
};

import gql from 'fake-tag';
import { GetPlayerRolesQuery } from 'graphql/autogen/types';

import { client } from '../../client';

export const GetPlayerTypes = gql`
  query GetPlayerRoles {
    PlayerRole {
      role
      label
      description
      basic
    }
  }
`;

export const getPlayerRoles = async () => {
  const { data, error } = await client
    .query<GetPlayerRolesQuery>(GetPlayerTypes)
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.PlayerRole;
};

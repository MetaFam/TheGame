import gql from 'fake-tag';

import { GetPlayerTypesQuery } from '../../autogen/types';
import { client } from '../../client';

export const GetPlayerTypes = gql`
  query GetPlayerTypes {
    player_type {
      description
      id
      title
      imageUrl
    }
  }
`;

export const getPlayerTypes = async () => {
  const { data, error } = await client
    .query<GetPlayerTypesQuery>(GetPlayerTypes)
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.player_type;
};

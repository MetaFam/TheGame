import gql from 'fake-tag';
import { Client } from 'urql';

import {
  GetPlayerFiltersDocument,
  GetPlayerFiltersQuery,
  GetPlayerFiltersQueryVariables,
  GetPlayersDocument,
  GetPlayersQuery,
  GetPlayersQueryVariables,
  GetPlayerUsernamesQuery,
  GetPlayerUsernamesQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client as defaultClient } from './client';
import { PlayerFragment, PlayerSkillFragment } from './fragments';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetPlayers(
    $offset: Int
    $limit: Int
    $skillIds: [uuid!]
    $playerTypeIds: [Int!]
    $availability: Int
    $timezones: [String!]
    $search: String
  ) {
    player(
      order_by: { total_xp: desc }
      offset: $offset
      limit: $limit
      where: {
        availability_hours: { _gte: $availability }
        timezone: { _in: $timezones }
        playerType: { id: { _in: $playerTypeIds } }
        Player_Skills: { Skill: { id: { _in: $skillIds } } }
        _or: [
          { username: { _ilike: $search } }
          { ethereum_address: { _ilike: $search } }
        ]
      }
    ) {
      ...PlayerFragment
    }
    player_aggregate(
      where: {
        availability_hours: { _gte: $availability }
        timezone: { _in: $timezones }
        playerType: { id: { _in: $playerTypeIds } }
        Player_Skills: { Skill: { id: { _in: $skillIds } } }
        _or: [
          { username: { _ilike: $search } }
          { ethereum_address: { _ilike: $search } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PlayerFragment}
`;

export const PLAYER_LIMIT = 9;

export const defaultQueryVariables: GetPlayersQueryVariables = {
  offset: 0,
  limit: PLAYER_LIMIT,
  availability: 0,
  skillIds: null,
  playerTypeIds: null,
  timezones: null,
  search: '%%',
};

export type PlayersResponse = {
  error: Error | undefined;
  count: number;
  players: PlayerFragmentFragment[];
};

export const getPlayersWithCount = async (
  queryVariables = defaultQueryVariables,
  client: Client = defaultClient,
): Promise<PlayersResponse> => {
  const { data, error } = await client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(
      GetPlayersDocument,
      queryVariables,
    )
    .toPromise();

  return {
    players: data?.player || [],
    count: data?.player_aggregate.aggregate?.count || 0,
    error,
  };
};

const playerUsernamesQuery = gql`
  query GetPlayerUsernames($limit: Int) {
    player(order_by: { total_xp: desc }, limit: $limit) {
      username
    }
  }
`;

export const getPlayerUsernames = async (limit = 150): Promise<string[]> => {
  const { data, error } = await defaultClient
    .query<GetPlayerUsernamesQuery, GetPlayerUsernamesQueryVariables>(
      playerUsernamesQuery,
      {
        limit,
      },
    )
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.player.map((p) => p.username);
};

export const getTopPlayerUsernames = getPlayerUsernames;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetPlayerFilters {
    skill_aggregate(distinct_on: category) {
      nodes {
        name: category
      }
    }
    skill(
      order_by: { Player_Skills_aggregate: { count: desc }, category: asc }
    ) {
      ...PlayerSkillFragment
    }
    player_type(distinct_on: id) {
      id
      title
    }
  }
  ${PlayerSkillFragment}
`;

export const getPlayerFilters = async (client: Client = defaultClient) => {
  const { data, error } = await client
    .query<GetPlayerFiltersQuery, GetPlayerFiltersQueryVariables>(
      GetPlayerFiltersDocument,
    )
    .toPromise();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }

  return data;
};

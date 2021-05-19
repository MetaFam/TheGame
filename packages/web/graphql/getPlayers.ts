import gql from 'fake-tag';
import { Client } from 'urql';

import {
  GetPlayersDocument,
  GetPlayersQuery,
  GetPlayersQueryVariables,
  GetPlayerUsernamesQuery,
  GetPlayerUsernamesQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client as defaultClient } from './client';
import { PlayerFragment } from './fragments';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetPlayers(
    $offset: Int
    $limit: Int
    $skillCategory: SkillCategory_enum
    $playerType: Int
    $availability: Int
    $timezone: String
    $search: String
  ) {
    player(
      order_by: { total_xp: desc }
      offset: $offset
      limit: $limit
      where: {
        Player_Skills: { Skill: { category: { _eq: $skillCategory } } }
        playerType: { id: { _eq: $playerType } }
        availability_hours: { _gte: $availability }
        timezone: { _eq: $timezone }
        _or: [
          { username: { _ilike: $search } }
          { ethereum_address: { _ilike: $search } }
        ]
      }
    ) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const defaultQueryVariables: GetPlayersQueryVariables = {
  offset: 0,
  limit: 50,
  skillCategory: undefined,
  playerType: undefined,
  availability: 0,
  timezone: undefined,
  search: '%%',
};

export type PlayersResponse = {
  error: Error | undefined;
  players: PlayerFragmentFragment[];
};

export const getPlayers = async (
  queryVariables = defaultQueryVariables,
  client: Client = defaultClient,
): Promise<PlayersResponse> => {
  const { data, error } = await client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(
      GetPlayersDocument,
      queryVariables,
    )
    .toPromise();

  return { players: data?.player || [], error };
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
    player_type(distinct_on: id) {
      id
      title
    }
  }
`;

export const getPlayersInParallel = async (
  variables: GetPlayersQueryVariables,
): Promise<PlayersResponse> => {
  const limit = 50;
  const total = variables?.limit as number;
  if (total <= limit) {
    return getPlayers(variables);
  }
  const len = Math.ceil(total / limit);
  const variablesArr: GetPlayersQueryVariables[] = new Array<boolean>(len)
    .fill(false)
    .map((_, i) => ({
      ...variables,
      offset: i * limit,
      limit: i < len - 1 ? limit : total - limit * (len - 1),
    }));

  const promises = variablesArr.map((vars) => getPlayers(vars));
  const playersRespArr = await Promise.all(promises);
  return playersRespArr.reduce(
    (totalRes, response) => ({
      error: totalRes.error || response.error,
      players: [...totalRes.players, ...response.players],
    }),
    { error: undefined, players: [] },
  );
};

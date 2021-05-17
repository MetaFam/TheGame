import gql from 'fake-tag';
import { Client } from 'urql';

import {
  GetPlayersQuery,
  GetPlayersQueryVariables,
  GetPlayerUsernamesQuery,
  GetPlayerUsernamesQueryVariables,
  PlayerTileFragmentFragment,
} from './autogen/types';
import { client as defaultClient } from './client';
import { PlayerTileFragment } from './fragments';

const playersQuery = gql`
  query GetPlayers(
    $limit: Int
    $skillCategory: SkillCategory_enum
    $playerType: Int
  ) {
    player(
      order_by: { total_xp: desc }
      limit: $limit
      where: {
        Player_Skills: { Skill: { category: { _eq: $skillCategory } } }
        playerType: { id: { _eq: $playerType } }
      }
    ) {
      ...PlayerTileFragment
    }
  }
  ${PlayerTileFragment}
`;

export const defaultQueryVariables: GetPlayersQueryVariables = {
  limit: 50,
  skillCategory: undefined,
  playerType: undefined,
};

export const getPlayers = async (
  queryVariables = defaultQueryVariables,
  client: Client = defaultClient,
): Promise<PlayerTileFragmentFragment[]> => {
  const { data, error } = await client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(
      playersQuery,
      queryVariables,
    )
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.player;
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

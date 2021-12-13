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
  Maybe,
  Order_By,
  Player_Bool_Exp,
  PlayerFragmentFragment,
} from './autogen/types';
import { client as defaultClient } from './client';
import { PlayerFragment, PlayerSkillFragment } from './fragments';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetPlayers(
    $orderBy: player_order_by!
    $offset: Int
    $limit: Int
    $where: player_bool_exp
    $forLoginDisplay: Boolean! = false
  ) {
    player(
      order_by: [$orderBy]
      offset: $offset
      limit: $limit
      where: $where
    ) {
      ...PlayerFragment
    }
    player_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
  ${PlayerFragment}
`;

export const PLAYER_LIMIT = 9;

export const defaultQueryVariables: PlayersQueryVariables = {
  offset: 0,
  limit: PLAYER_LIMIT,
  search: '%%',
  orderBy: {
    seasonXP: 'desc' as Order_By,
  },
};

export type PlayersQueryVariables = {
  search: string;
  offset: number;
  limit: number;
  orderBy: {
    seasonXP?: Maybe<Order_By>;
  };
  availability?: number;
  skillIds?: string[];
  playerTypeIds?: number[];
  timeZones?: string[];
};

export const transformToGraphQlVariables = (
  queryVariables: PlayersQueryVariables,
): GetPlayersQueryVariables => {
  const graphqlWhereClause: Player_Bool_Exp = {
    _or: [
      { username: { _ilike: queryVariables.search } },
      { ethereumAddress: { _ilike: queryVariables.search } },
    ],
  };

  if (queryVariables.availability != null) {
    graphqlWhereClause.availableHours = {
      _gte: queryVariables.availability,
    };
  }
  if (queryVariables.timeZones?.length) {
    graphqlWhereClause.timeZone = { _in: queryVariables.timeZones };
  }
  if (queryVariables.playerTypeIds?.length) {
    graphqlWhereClause.type = { id: { _in: queryVariables.playerTypeIds } };
  }
  if (queryVariables.skillIds?.length) {
    graphqlWhereClause.skills = {
      Skill: { id: { _in: queryVariables.skillIds } },
    };
  }

  return {
    orderBy: queryVariables.orderBy,
    offset: queryVariables.offset,
    limit: queryVariables.limit,
    where: graphqlWhereClause,
  };
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
      transformToGraphQlVariables(queryVariables),
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
    player(order_by: { totalXP: desc }, limit: $limit) {
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

  return data.player.map(({ username }) => username);
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
      value: id
      label: title
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
    console.error(error); // eslint-disable-line no-console
    throw error;
  }

  return data;
};

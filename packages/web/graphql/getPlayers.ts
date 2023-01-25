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
  Player,
  Player_Bool_Exp,
} from 'graphql/autogen/types';
import { client as defaultClient } from 'graphql/client';
import {
  PlayerDaoMembershipFragment,
  PlayerFragment,
  PlayerSkillFragment,
} from 'graphql/fragments';
import { Client } from 'urql';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetPlayers(
    $orderBy: player_order_by!
    $offset: Int
    $limit: Int
    $where: player_bool_exp
  ) {
    player(
      # players were appearing multiple times when orderBy was the
      # same for many entries; i.e. availability = 0
      order_by: [$orderBy, { ethereumAddress: desc }]
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
  skillIds?: Array<string>;
  explorerTypeTitles?: Array<string>;
  timeZones?: Array<string>;
};

export const transformToGraphQLVariables = (
  query: PlayersQueryVariables,
): GetPlayersQueryVariables => {
  const where: Player_Bool_Exp = {
    _or: [
      { profile: { username: { _ilike: query.search } } },
      { ethereumAddress: { _ilike: query.search } },
    ],
  };

  if (query.availability != null) {
    where.profile ??= {};
    where.profile.availableHours = {
      _gte: query.availability,
    };
  }
  if (query.timeZones?.length) {
    where.profile ??= {};
    where.profile.timeZone = { _in: query.timeZones };
  }
  if (query.explorerTypeTitles?.length) {
    where.profile ??= {};
    where.profile.explorerTypeTitle = { _in: query.explorerTypeTitles };
  }
  if (query.skillIds?.length) {
    where.skills = {
      Skill: { id: { _in: query.skillIds } },
    };
  }

  return {
    orderBy: query.orderBy,
    offset: query.offset,
    limit: query.limit,
    where,
  };
};

export type PlayersResponse = {
  error?: Error;
  count: number;
  players: Array<Player>;
};

export const getPlayersWithCount = async (
  queryVariables = defaultQueryVariables,
  client: Client = defaultClient,
): Promise<PlayersResponse> => {
  const { data, error } = await client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(
      GetPlayersDocument,
      transformToGraphQLVariables(queryVariables),
    )
    .toPromise();

  return {
    players: (data?.player as Array<Player>) ?? [],
    count: data?.player_aggregate.aggregate?.count ?? 0,
    error,
  };
};

const playerUsernamesQuery = /* GraphQL */ `
  query GetPlayerUsernames($limit: Int) {
    player(order_by: { totalXP: desc }, limit: $limit) {
      ethereumAddress
      profile {
        username
      }
    }
  }
`;

export const getPlayerUsernames = async (
  limit = 150,
): Promise<Array<{ address: string; username: Maybe<string> }>> => {
  const { data, error } = await defaultClient
    .query<GetPlayerUsernamesQuery, GetPlayerUsernamesQueryVariables>(
      playerUsernamesQuery,
      { limit },
    )
    .toPromise();

  if (error) throw error;

  return (data?.player ?? []).map(({ ethereumAddress: address, profile }) => ({
    address,
    username: profile?.username ?? null,
  }));
};

export const getTopPlayerUsernames = getPlayerUsernames;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
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
    ExplorerType(distinct_on: id) {
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
      {},
    )
    .toPromise();

  if (error) throw new Error(error.message);

  return data;
};

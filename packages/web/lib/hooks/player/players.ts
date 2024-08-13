import { Maybe } from '@metafam/utils';
import {
  Player,
  Player_Order_By,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
} from 'graphql/autogen/hasura-sdk';
import {
  defaultQueryVariables,
  PLAYER_LIMIT,
  PlayersQueryVariables,
  transformToGraphQLVariables,
} from 'graphql/getPlayers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CategoryOption, parseSkills } from '#utils/skillHelpers';

export type QueryVariableValue = Maybe<
  SortOption | string | number | Array<string>
>;
export type QueryVariableSetter = (
  key: string,
  value?: QueryVariableValue,
) => void;

export type OptionType = { value: string; label: string };

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: OptionType[];
  skillChoices: CategoryOption[];
}

interface PlayerFilter {
  players: Player[];
  total: number;
  fetching: boolean;
  fetchingMore: boolean;
  aggregates: PlayerAggregates;
  queryVariables: PlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  error?: Error;
  resetFilter: () => void;
  nextPage: () => void;
  moreAvailable: boolean;
}

const usePlayerAggregates = () => {
  const [{ data }] = useGetPlayerFiltersQuery();
  const skillChoices = useMemo(() => parseSkills(data?.skill || []), [data]);
  return {
    skillCategories: data?.skill_aggregate.nodes || [],
    playerTypes: (data?.ExplorerType || []).map(({ value, label }) => ({
      value: value.toString(),
      label,
    })),
    skillChoices,
  };
};

const useFilteredPlayers = (queryVariables: PlayersQueryVariables) => {
  const [variables, setVariables] = useState<PlayersQueryVariables>(
    defaultQueryVariables,
  );

  useEffect(() => {
    setVariables(queryVariables);
  }, [queryVariables]);

  const [{ fetching, data, error }] = useGetPlayersQuery({
    variables: transformToGraphQLVariables(variables),
  });

  const players = (data?.player as Player[]) || [];
  const total = data?.player_aggregate.aggregate?.count || 0;

  return { fetching, players, total, error };
};

export enum SortOption {
  SEASON_XP = 'SEASON_XP',
  TOTAL_XP = 'TOTAL_XP',
  AVAILABILITY = 'AVAILABILITY',
  USERNAME_A_TO_Z = 'USERNAME_A_TO_Z',
  USERNAME_Z_TO_A = 'USERNAME_Z_TO_A',
}

export const sortOptionsMap = {
  [SortOption.SEASON_XP]: {
    value: SortOption.SEASON_XP,
    label: 'Seasonal XP',
    output: {
      seasonXP: 'desc',
      totalXP: 'desc',
    },
  },
  [SortOption.TOTAL_XP]: {
    value: SortOption.TOTAL_XP,
    label: 'Total XP',
    output: {
      totalXP: 'desc',
    },
  },
  [SortOption.AVAILABILITY]: {
    value: SortOption.AVAILABILITY,
    label: 'Availability',
    output: {
      profile: { availableHours: 'desc' },
    },
  },
  [SortOption.USERNAME_A_TO_Z]: {
    value: SortOption.USERNAME_A_TO_Z,
    label: 'Username (A–Z)',
    output: {
      profile: { username: 'asc' },
    },
  },
  [SortOption.USERNAME_Z_TO_A]: {
    value: SortOption.USERNAME_Z_TO_A,
    label: 'Username (Z–A)',
    output: {
      profile: { username: 'desc' },
    },
  },
};

export const sortOptions = Object.values(sortOptionsMap) as Array<OptionType>;

const getOrderByValue = (option: SortOption): Player_Order_By =>
  (
    sortOptionsMap[option || SortOption.SEASON_XP] as {
      value: SortOption;
      label: string;
      output: Player_Order_By;
    }
  ).output;

export const usePlayerFilter = (
  defaultVariables: PlayersQueryVariables = defaultQueryVariables,
): PlayerFilter => {
  const [queryVariables, setQueryVariables] =
    useState<PlayersQueryVariables>(defaultVariables);
  const aggregates = usePlayerAggregates();
  const shouldAppend = useRef(false);

  const setQueryVariable: QueryVariableSetter = useCallback(
    (key: string, value?: QueryVariableValue) => {
      if (key === 'limit') {
        throw new Error('Cannot update limit');
      }
      shouldAppend.current = key === 'offset';
      if (key === 'orderBy') {
        setQueryVariables((oldQueryVariables) => ({
          ...oldQueryVariables,
          limit: PLAYER_LIMIT,
          offset: 0,
          [key]: getOrderByValue(value as SortOption),
        }));
      } else {
        setQueryVariables((oldQueryVariables) => ({
          ...oldQueryVariables,
          limit: PLAYER_LIMIT,
          offset: 0,
          [key]: value !== '' ? value : null,
        }));
      }
    },
    [],
  );

  const { fetchedPlayers, fetching, error, nextPage, total, moreAvailable } =
    usePaginatedPlayers(queryVariables, setQueryVariable);
  const [players, setPlayers] = useState<Player[]>(fetchedPlayers);

  const resetFilter = () => {
    shouldAppend.current = false;
    setQueryVariables(defaultQueryVariables);
  };

  useEffect(() => {
    if (!error && !fetching) {
      if (shouldAppend.current) {
        shouldAppend.current = false;
        setPlayers((p) => [...p, ...fetchedPlayers]);
      } else {
        setPlayers(fetchedPlayers);
      }
    }
  }, [fetchedPlayers, fetching, error]);

  return {
    players,
    fetching,
    fetchingMore: shouldAppend.current,
    error,
    aggregates,
    queryVariables,
    setQueryVariable,
    resetFilter,
    total,
    nextPage,
    moreAvailable,
  };
};

export const useFiltersUsed = (
  queryVariables: PlayersQueryVariables,
): boolean => {
  const sortFilterUsed = useMemo(
    () => !Object.keys(queryVariables.orderBy).includes('seasonXP'),
    [queryVariables.orderBy],
  );
  const playerTypesFilterUsed = useMemo(
    () => (queryVariables.explorerTypeTitles as string[])?.length > 0,
    [queryVariables.explorerTypeTitles],
  );
  const searchFilterUsed = useMemo(
    () => queryVariables.search !== '%%',
    [queryVariables.search],
  );
  const availabilityFilterUsed = useMemo(
    () => queryVariables.availability != null,
    [queryVariables.availability],
  );
  const skillIdsFilterUsed = useMemo(
    () => (queryVariables.skillIds as string[])?.length > 0,
    [queryVariables.skillIds],
  );
  const timezonesFilterUsed = useMemo(
    () => (queryVariables.timeZones as string[])?.length > 0,
    [queryVariables.timeZones],
  );

  const filtersUsed = useMemo(
    () =>
      sortFilterUsed ||
      playerTypesFilterUsed ||
      searchFilterUsed ||
      availabilityFilterUsed ||
      skillIdsFilterUsed ||
      timezonesFilterUsed,
    [
      sortFilterUsed,
      playerTypesFilterUsed,
      searchFilterUsed,
      availabilityFilterUsed,
      skillIdsFilterUsed,
      timezonesFilterUsed,
    ],
  );

  return filtersUsed;
};

const usePaginatedPlayers = (
  queryVariables: PlayersQueryVariables,
  setQueryVariable: QueryVariableSetter,
) => {
  const {
    fetching,
    players: fetchedPlayers,
    total,
    error,
  } = useFilteredPlayers(queryVariables);

  const itemsPerPage = PLAYER_LIMIT;
  const maxPage = Math.ceil(total / itemsPerPage);
  const currentOffset = useMemo(
    () => (queryVariables.offset as number) || 0,
    [queryVariables.offset],
  );
  const currentPage = useMemo(
    () => Math.ceil(currentOffset / itemsPerPage) + 1,
    [currentOffset, itemsPerPage],
  );

  const nextPage = useCallback(() => {
    if (currentPage < maxPage && !fetching) {
      setQueryVariable('offset', currentOffset + itemsPerPage);
    }
  }, [
    fetching,
    setQueryVariable,
    currentOffset,
    itemsPerPage,
    currentPage,
    maxPage,
  ]);

  return {
    nextPage,
    fetchedPlayers,
    total,
    fetching,
    error,
    moreAvailable: currentPage < maxPage,
  };
};

const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useAnimateProfileChanges = (
  depends: unknown,
  updateFN?: () => void,
): { [key: string]: string } => {
  const [animation, setAnimation] = useState('fadeOut');

  const previousValue = usePrevious(depends);

  useEffect(() => {
    if (JSON.stringify(previousValue) !== JSON.stringify(depends)) {
      setAnimation('fadeOut');
      setTimeout(() => {
        if (updateFN) updateFN();
        setAnimation('fadeIn');
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depends]);

  return { animation };
};

import {
  Player_Order_By,
  PlayerFragmentFragment,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
} from 'graphql/autogen/types';
import {
  defaultQueryVariables,
  PLAYER_LIMIT,
  PlayersQueryVariables,
  transformToGraphQlVariables,
} from 'graphql/getPlayers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CategoryOption, parseSkills } from 'utils/skillHelpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

export type OptionType = { value: string; label: string };

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: OptionType[];
  skillChoices: CategoryOption[];
}

interface PlayerFilter {
  players: PlayerFragmentFragment[];
  totalCount: number;
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
    playerTypes: (data?.player_type || []).map(({ value, label }) => ({
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
    variables: transformToGraphQlVariables(variables),
  });

  const players = data?.player || [];
  const totalCount = data?.player_aggregate.aggregate?.count || 0;

  return { fetching, players, totalCount, error };
};

export enum SortOption {
  SEASON_XP = 'SEASON_XP',
  TOTAL_XP = 'TOTAL_XP',
  AVAILABILITY = 'AVAILABILITY',
  USERNAME_A_TO_Z = 'USERNAME_A_TO_Z',
  USERNAME_Z_TO_A = 'USERNAME_Z_TO_A',
}

export const sortOptionsMap = {
  [SortOption.SEASON_XP.toString()]: {
    value: SortOption.SEASON_XP,
    label: 'Seasonal XP',
    output: {
      season_xp: 'desc',
    },
  },
  [SortOption.TOTAL_XP.toString()]: {
    value: SortOption.TOTAL_XP,
    label: 'Total XP',
    output: {
      total_xp: 'desc',
    },
  },
  [SortOption.AVAILABILITY.toString()]: {
    value: SortOption.AVAILABILITY,
    label: 'Availability',
    output: {
      availability_hours: 'desc',
    },
  },
  [SortOption.USERNAME_A_TO_Z.toString()]: {
    value: SortOption.USERNAME_A_TO_Z,
    label: 'Username (A-Z)',
    output: {
      username: 'asc',
    },
  },
  [SortOption.USERNAME_Z_TO_A.toString()]: {
    value: SortOption.USERNAME_Z_TO_A,
    label: 'Username (Z-A)',
    output: {
      username: 'desc',
    },
  },
};

export const sortOptions = Object.values(sortOptionsMap) as Array<OptionType>;

const getOrderByValue = (option: SortOption): Player_Order_By =>
  (sortOptionsMap[(option || SortOption.SEASON_XP).toString()] as {
    value: SortOption;
    label: string;
    output: Player_Order_By;
  }).output;

export const usePlayerFilter = (
  defaultVariables: PlayersQueryVariables = defaultQueryVariables,
): PlayerFilter => {
  const [queryVariables, setQueryVariables] = useState<PlayersQueryVariables>(
    defaultVariables,
  );

  const aggregates = usePlayerAggregates();

  const shouldAppend = useRef(false);
  const setQueryVariable: QueryVariableSetter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string, value: any) => {
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

  const resetFilter = () => {
    shouldAppend.current = false;
    setQueryVariables(defaultQueryVariables);
  };

  const {
    fetchedPlayers,
    fetching,
    error,
    nextPage,
    totalCount,
    moreAvailable,
  } = usePaginatedPlayers(queryVariables, setQueryVariable);

  const [players, setPlayers] = useState<PlayerFragmentFragment[]>(
    fetchedPlayers,
  );

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
    totalCount,
    nextPage,
    moreAvailable,
  };
};

export const useFiltersUsed = (
  queryVariables: PlayersQueryVariables,
): boolean => {
  const sortFilterUsed = useMemo(
    () => !Object.keys(queryVariables.orderBy).includes('season_xp'),
    [queryVariables.orderBy],
  );
  const playerTypesFilterUsed = useMemo(
    () => (queryVariables.playerTypeIds as number[])?.length > 0,
    [queryVariables.playerTypeIds],
  );
  const searchFilterUsed = useMemo(() => queryVariables.search !== '%%', [
    queryVariables.search,
  ]);
  const availabilityFilterUsed = useMemo(
    () => queryVariables.availability != null,
    [queryVariables.availability],
  );
  const skillIdsFilterUsed = useMemo(
    () => (queryVariables.skillIds as string[])?.length > 0,
    [queryVariables.skillIds],
  );
  const timezonesFilterUsed = useMemo(
    () => (queryVariables.timezones as string[])?.length > 0,
    [queryVariables.timezones],
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
    totalCount,
    error,
  } = useFilteredPlayers(queryVariables);

  const itemsPerPage = PLAYER_LIMIT;
  const maxPage = Math.ceil(totalCount / itemsPerPage);
  const currentOffset = useMemo(() => (queryVariables.offset as number) || 0, [
    queryVariables.offset,
  ]);
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
    totalCount,
    fetching,
    error,
    moreAvailable: currentPage < maxPage,
  };
};

export const useAnimation = (
  depends: unknown,
  updateFN: () => void,
): { [key: string]: string } => {
  const [animation, setAnimation] = useState('fadeIn');

  useEffect(() => {
    setAnimation('fadeOut');
    setTimeout(() => {
      updateFN();
      setAnimation('fadeIn');
    }, 400);
  }, [depends, updateFN]);

  return { animation };
};

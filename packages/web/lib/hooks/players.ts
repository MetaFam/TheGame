import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
} from 'graphql/autogen/types';
import { defaultQueryVariables, PLAYER_LIMIT } from 'graphql/getPlayers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CategoryOption, parseSkills } from 'utils/skillHelpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: { value: string; label: string }[];
  skillChoices: CategoryOption[];
}

interface PlayerFilter {
  players: PlayerFragmentFragment[];
  totalCount: number;
  fetching: boolean;
  fetchingMore: boolean;
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
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

const useFilteredPlayers = (queryVariables: GetPlayersQueryVariables) => {
  const [variables, setVariables] = useState<GetPlayersQueryVariables>(
    defaultQueryVariables,
  );

  useEffect(() => {
    setVariables(queryVariables);
  }, [queryVariables]);

  const [{ fetching, data, error }] = useGetPlayersQuery({
    variables,
  });

  const players = data?.player || [];
  const totalCount = data?.player_aggregate.aggregate?.count || 0;

  return { fetching, players, totalCount, error };
};

export const usePlayerFilter = (
  defaultVariables: GetPlayersQueryVariables = defaultQueryVariables,
): PlayerFilter => {
  const [
    queryVariables,
    setQueryVariables,
  ] = useState<GetPlayersQueryVariables>(defaultVariables);

  const aggregates = usePlayerAggregates();

  const shouldAppend = useRef(false);
  const setQueryVariable: QueryVariableSetter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string, value: any) => {
      if (key === 'limit') {
        throw new Error('Cannot update limit');
      }
      setQueryVariables((oldQueryVariables) => ({
        ...oldQueryVariables,
        limit: PLAYER_LIMIT,
        offset: 0,
        [key]: value !== '' ? value : null,
      }));
      shouldAppend.current = key === 'offset';
    },
    [],
  );

  const resetFilter = () => setQueryVariables(defaultQueryVariables);

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
    if (error || fetching) {
      if (error || !shouldAppend.current) {
        setPlayers([]);
      }
    } else if (shouldAppend.current) {
      setPlayers((p) => [...p, ...fetchedPlayers]);
      shouldAppend.current = false;
    } else {
      setPlayers(fetchedPlayers);
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
  queryVariables: GetPlayersQueryVariables,
): boolean => {
  const playerTypesFilterUsed = useMemo(
    () => (queryVariables.playerTypeIds as number[])?.length > 0,
    [queryVariables.playerTypeIds],
  );
  const searchFilterUsed = useMemo(() => queryVariables.search !== '%%', [
    queryVariables.search,
  ]);
  const availabilityFilterUsed = useMemo(
    () => (queryVariables.availability as number) > 0,
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
      playerTypesFilterUsed ||
      searchFilterUsed ||
      availabilityFilterUsed ||
      skillIdsFilterUsed ||
      timezonesFilterUsed,
    [
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
  queryVariables: GetPlayersQueryVariables,
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

import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
} from 'graphql/autogen/types';
import { defaultQueryVariables } from 'graphql/getPlayers';
import { useCallback, useMemo, useState } from 'react';
import { CategoryOption, parseSkills } from 'utils/skillHelpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: { id: number; title: string }[];
  skillChoices: CategoryOption[];
}

interface PlayerFilter {
  players: PlayerFragmentFragment[];
  fetching: boolean;
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  error?: Error;
  resetFilter: () => void;
}

const usePlayerAggregates = () => {
  const [{ data }] = useGetPlayerFiltersQuery();
  const skillChoices = useMemo(() => parseSkills(data?.skill || []), [data]);
  return {
    skillCategories: data?.skill_aggregate.nodes || [],
    playerTypes: data?.player_type || [],
    skillChoices,
  };
};

const useFilteredPlayers = (variables: GetPlayersQueryVariables) => {
  const [{ fetching, data, error }] = useGetPlayersQuery({
    variables,
  });
  const players = data?.player || [];
  return { fetching, players, error };
};

export const usePlayerFilter = (): PlayerFilter => {
  const [
    queryVariables,
    setQueryVariables,
  ] = useState<GetPlayersQueryVariables>(defaultQueryVariables);

  const aggregates = usePlayerAggregates();

  const setQueryVariable: QueryVariableSetter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string, value: any) => {
      setQueryVariables((oldQueryVariables) => ({
        ...oldQueryVariables,
        [key]: value !== '' ? value : null,
      }));
    },
    [],
  );

  const resetFilter = () => setQueryVariables(defaultQueryVariables);
  const {
    fetching: fetchingPlayers,
    players,
    error: errorPlayers,
  } = useFilteredPlayers(queryVariables);

  return {
    players,
    aggregates,
    fetching: fetchingPlayers,
    error: errorPlayers,
    queryVariables,
    setQueryVariable,
    resetFilter,
  };
};

export const useFiltersUsed = (
  queryVariables: GetPlayersQueryVariables,
): { filtersUsed: boolean } => {
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
  return {
    filtersUsed,
  };
};

import {
  GetPlayersQueryVariables,
  PlayerTileFragmentFragment,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
} from 'graphql/autogen/types';
import { defaultQueryVariables } from 'graphql/getPlayers';
import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: { id: number; title: string }[];
}

interface PlayerFilter {
  players: PlayerTileFragmentFragment[];
  fetching: boolean;
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  error?: Error;
}

const usePlayerAggregates = () => {
  const [{ data, error }] = useGetPlayerFiltersQuery();
  if (error) {
    console.log(error);
  }
  return {
    skillCategories: data?.skill_aggregate.nodes || [],
    playerTypes: data?.player_type || [],
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

  const { fetching, players, error } = useFilteredPlayers(queryVariables);

  return {
    players,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  };
};

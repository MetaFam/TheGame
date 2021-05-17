import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
  useGetPlayerFiltersQuery,
} from 'graphql/autogen/types';
import {
  defaultQueryVariables,
  getPlayersInParallel,
  PlayersResponse,
} from 'graphql/getPlayers';
import { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

export interface PlayerAggregates {
  skillCategories: { name: string }[];
  playerTypes: { id: number; title: string }[];
}

interface PlayerFilter {
  players: PlayerFragmentFragment[];
  fetching: boolean;
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  error?: Error;
}

const usePlayerAggregates = () => {
  const [{ data }] = useGetPlayerFiltersQuery();
  return {
    skillCategories: data?.skill_aggregate.nodes || [],
    playerTypes: data?.player_type || [],
  };
};

const useFilteredPlayers = (variables: GetPlayersQueryVariables) => {
  const [fetching, setFetching] = useState(true);
  const [{ players, error }, setResponse] = useState<PlayersResponse>({
    error: undefined,
    players: [],
  });

  useEffect(() => {
    const load = async () => {
      setFetching(true);
      const response = await getPlayersInParallel(variables);
      setResponse(response);
      setFetching(false);
    };
    load();
  }, [variables]);
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

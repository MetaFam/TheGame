import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
  useGetPlayerFiltersQuery,
  useGetPlayersQuery,
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

const usePlayersSingle = (
  run: boolean,
  variables: GetPlayersQueryVariables,
) => {
  const [{ fetching, data, error }] = useGetPlayersQuery({
    variables,
    pause: !run,
  });
  const players = data?.player || [];
  return { fetching, players, error };
};

const usePlayersParallel = (
  run: boolean,
  variables: GetPlayersQueryVariables,
) => {
  const [fetching, setFetching] = useState(true);
  const [{ players, error }, setResponse] = useState<PlayersResponse>({
    error: undefined,
    players: [],
  });

  useEffect(() => {
    const load = async () => {
      if (run) {
        setFetching(true);
        const response = await getPlayersInParallel(variables);
        setResponse(response);
        setFetching(false);
      }
    };
    load();
  }, [run, variables]);

  return { fetching, players, error };
};

const useFilteredPlayers = (variables: GetPlayersQueryVariables) => {
  const runParallel = (variables.limit as number) > 50; // if limit is 150 then hasura is unable to handle in one query
  const playersParallel = usePlayersParallel(runParallel, variables);
  const playersSingle = usePlayersSingle(!runParallel, variables);
  return runParallel ? playersParallel : playersSingle;
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

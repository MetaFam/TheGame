import {
  GetQuestsQueryVariables,
  QuestFragment,
  useGetQuestGuildsQuery,
  useGetQuestsQuery,
} from 'graphql/autogen/hasura-sdk';
import { useCallback, useState } from 'react';

import { defaultQueryVariables } from '../../graphql/getQuests';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryVariableSetter = (key: string, value: any) => void;

interface QuestFilter {
  quests: QuestFragment[] | null;
  fetching: boolean;
  queryVariables: GetQuestsQueryVariables;
  setQueryVariable: QueryVariableSetter;
  aggregates: QuestAggregates;
  error?: Error;
}

export interface QuestAggregates {
  guilds: { id: string; name: string }[];
}

export const useQuestFilter = (): QuestFilter => {
  const [queryVariables, setQueryVariables] = useState<GetQuestsQueryVariables>(
    defaultQueryVariables,
  );
  const [resQuests] = useGetQuestsQuery({
    variables: queryVariables,
  });
  const [resGuilds] = useGetQuestGuildsQuery();
  const { fetching, data, error } = resQuests;

  const quests = data?.quest || null;

  const guilds =
    resGuilds?.data?.quest_aggregate.nodes.map((q) => ({
      id: q.guildId,
      name: q.guild.name,
    })) || [];

  const aggregates = {
    guilds,
  };

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

  return {
    quests,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  };
};

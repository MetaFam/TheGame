import {
  GetQuestsQueryVariables,
  QuestFragmentFragment,
  useGetQuestGuildsQuery,
  useGetQuestsQuery,
} from 'graphql/autogen/types';
import { useState } from 'react';

import { defaultQueryVariables } from '../../graphql/getQuests';

interface QuestFilter {
  quests: QuestFragmentFragment[] | null;
  fetching: boolean;
  queryVariables: GetQuestsQueryVariables;
  setQueryVariable: (_: string, __: any) => void;
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
      id: q.guild_id,
      name: q.guild.name,
    })) || [];

  const aggregates = {
    guilds,
  };

  function setQueryVariable(key: string, value: any) {
    setQueryVariables({
      ...queryVariables,
      [key]: value !== '' ? value : null,
    });
  }
  return {
    quests,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  };
};

import { useState } from 'react'
import { QuestFragmentFragment, GetQuestsQueryVariables, useGetQuestsQuery } from 'graphql/autogen/types';
import { defaultQueryVariables } from '../../graphql/getQuests';

interface QuestFilter {
  quests: QuestFragmentFragment[] | null;
  fetching: boolean;
  queryVariables: GetQuestsQueryVariables;
  setQueryVariable: (_: string, __: any) => void;
  aggregates: Record<string, any>;
  error?: Error;
}

export const useQuestFilter = (): QuestFilter => {
  const [queryVariables, setQueryVariables] = useState<GetQuestsQueryVariables>(defaultQueryVariables);
  const [res] = useGetQuestsQuery({
    variables: queryVariables,
  });
  const { fetching, data, error } = res;

  const quests = data?.quest || null;
  const guilds = data?.quest_aggregate.nodes.map(q => ({
    id: q.guild_id,
    name: q.guild.name,
  }));

  const aggregates = {
    guilds,
  };

  function setQueryVariable(key: string, value: any) {
    setQueryVariables({
      ...queryVariables,
      [key]: value !== '' ? value : null,
    })
  }
  return { quests, aggregates, fetching, error, queryVariables, setQueryVariable };
}

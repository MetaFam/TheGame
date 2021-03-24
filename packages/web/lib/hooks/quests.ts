import { useState } from 'react'
import { QuestFragmentFragment, GetQuestsQueryVariables, useGetQuestsQuery } from 'graphql/autogen/types';
import { defaultQueryVariables } from '../../graphql/getQuests';

interface QuestFilter {
  quests: QuestFragmentFragment[] | null;
  fetching: boolean;
  queryVariables: GetQuestsQueryVariables;
  setQueryVariable: (_: string, __: any) => void;
}

export const useQuestFilter = (): QuestFilter => {
  const [queryVariables, setQueryVariables] = useState<GetQuestsQueryVariables>(defaultQueryVariables);
  const [res] = useGetQuestsQuery({
    variables: queryVariables,
  });
  const { fetching, data } = res;

  const quests = data?.quest || null;

  function setQueryVariable(key: string, value: any) {
    setQueryVariables({
      ...queryVariables,
      [key]: value,
    })
  }
  return { quests, fetching, queryVariables, setQueryVariable };
}

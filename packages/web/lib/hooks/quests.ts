import { useState } from 'react'
import { QuestFragmentFragment, GetQuestsQueryVariables, useGetQuestsQuery } from 'graphql/autogen/types';
import { defaultQueryVariables } from '../../graphql/getQuests';

interface QuestFilter {
  quests: QuestFragmentFragment[] | null;
  queryVariables: GetQuestsQueryVariables;
}
export const useQuestFilter = (): QuestFilter => {
  const [queryVariables] = useState<GetQuestsQueryVariables>(defaultQueryVariables);
  const [res] = useGetQuestsQuery({
    variables: queryVariables,
  });

  const quests = res.data?.quest || null;

  return { quests, queryVariables };
}

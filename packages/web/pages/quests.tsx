import { LoadingState, Wrap, WrapItem } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { QuestFilter } from 'components/Quest/QuestFilter';
import { QuestList } from 'components/Quest/QuestList';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { getSsrClient } from '../graphql/client';
import { useQuestFilter } from '../lib/hooks/quests';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const [ssrClient, ssrCache] = getSsrClient();
  await getQuests(
    undefined,
    ssrClient,
  );

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  };
};

const QuestsPage: React.FC<Props> = () => {

  const { quests, queryVariables } = useQuestFilter();

  return (
    <PageContainer>
      <Wrap>
        <WrapItem>
          <QuestFilter queryVariables={queryVariables} />
        </WrapItem>
        <WrapItem>
          {quests ?
            <QuestList quests={quests} />
            :
            <LoadingState />
          }
        </WrapItem>
      </Wrap>
    </PageContainer>
  );
}

export default QuestsPage;

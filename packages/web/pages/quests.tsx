import { Wrap, WrapItem } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { QuestFilter } from 'components/Quest/QuestFilter';
import { QuestList } from 'components/Quest/QuestList';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const quests = await getQuests();
  return {
    props: {
      quests,
    },
    revalidate: 1,
  };
};

const QuestsPage: React.FC<Props> = ({ quests }) => (
  <PageContainer>
    <Wrap>
      <WrapItem>
        <QuestFilter />
      </WrapItem>
      <WrapItem>
        <QuestList quests={quests} />
      </WrapItem>
    </Wrap>
  </PageContainer>
);

export default QuestsPage;

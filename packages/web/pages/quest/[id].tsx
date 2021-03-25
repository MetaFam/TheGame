import {
  LoadingState,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import {  useGetQuestWithCompletionsQuery } from 'graphql/autogen/types';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuestIds } from 'graphql/getQuests';
import {
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../components/Container';
import { QuestDetails } from '../../components/Quest/QuestDetails';
import { QuestCompletions } from '../../components/Quest/QuestCompletions';
import { getSsrClient } from '../../graphql/client';

type Props = {
  quest_id: string;
}

const QuestPage: React.FC<Props> = ({ quest_id }) => {
  const router = useRouter();

  const [res] = useGetQuestWithCompletionsQuery({
    variables: {
      id: quest_id,
    },
  });
  const quest = res.data?.quest_by_pk;

  if (router.isFallback || !quest) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <VStack
        spacing={6}
        align="center"
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <MetaLink href="/quests">Back to quest explorer</MetaLink>

        <QuestDetails
          quest={quest}
        />
        <QuestCompletions
          quest={quest}
        />
      </VStack>
    </PageContainer>
  );
};

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const questIds = await getQuestIds(50);

  return {
    paths: questIds.map(id => ({
      params: { id },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const [ssrClient, ssrCache] = getSsrClient();

  const id = context.params?.id;
  const quest = await getQuestWithCompletions(id, ssrClient);
  if (!quest) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      quest_id: id,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  };
};


export default QuestPage;

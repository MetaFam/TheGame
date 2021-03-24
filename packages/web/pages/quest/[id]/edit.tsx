import { Box, Flex, LoadingState, Heading, Stack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { getQuest } from 'graphql/getQuest';
import { getQuests } from 'graphql/getQuests';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../../components/Container';
import { getSsrClient } from '../../../graphql/client';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EditQuestPage: React.FC<Props> = ({ quest }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!quest) {
    return <Error statusCode={404} />;
  }

  return (
    <PageContainer>
      <Stack
        spacing={6}
        align="center"
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Flex flex={1} d="column">
          <MetaLink
            as={`/quest/${quest.id}`}
            href="/quest/[id]"
          >
            Back to Quest
          </MetaLink>
          <Heading>Edit Quest</Heading>
          <Box mb="6">{quest.title}</Box>
          <Box mb="6">{quest.description}</Box>
        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default EditQuestPage;

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const quests = await getQuests();

  return {
    paths: quests.map(({ id }) => ({
      params: { id },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const [ssrClient] = getSsrClient();
  const id = context.params?.id;
  const quest = await getQuest(id, ssrClient);

  return {
    props: {
      quest: quest === undefined ? null : quest,
    },
    revalidate: 1,
  };
};

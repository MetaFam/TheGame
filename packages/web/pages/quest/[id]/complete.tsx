import { Flex, Heading, LoadingState, Stack, useToast } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import {
  CreateQuestCompletionInput,
  useCreateQuestCompletionMutation,
} from 'graphql/autogen/types';
import { getQuest } from 'graphql/getQuest';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../../components/Container';
import { CompletionForm } from '../../../components/Quest/CompletionForm';
import { getSsrClient } from '../../../graphql/client';
import { useUser } from '../../../lib/hooks';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubmitQuestCompletionPage: React.FC<Props> = ({ quest }) => {
  useUser({ redirectTo: '/quests' });
  const toast = useToast();
  const router = useRouter();
  const [
    createQuestCompletionState,
    createQuestCompletion,
  ] = useCreateQuestCompletionMutation();

  if (router.isFallback) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  if (!quest) {
    return <Error statusCode={404} />;
  }

  const onSubmit = (data: CreateQuestCompletionInput) => {
    createQuestCompletion({
      input: {
        ...data,
        quest_id: quest.id,
      },
    }).then((response) => {
      const createQuestCompletionResponse =
        response.data?.createQuestCompletion;
      if (createQuestCompletionResponse?.success) {
        router.push(`/quest/${quest.id}`);
        toast({
          title: 'Submitted quest completion',
          description: 'Now, wait until it gets accepted 😉',
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error while submitting completion,',
          description:
            response.error?.message ||
            createQuestCompletionResponse?.error ||
            'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  };

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
          <MetaLink as={`/quest/${quest.id}`} href="/quest/[id]">
            Back to Quest
          </MetaLink>
          <Heading>Claim quest</Heading>

          <CompletionForm
            onSubmit={onSubmit}
            quest={quest}
            success={
              !!createQuestCompletionState.data?.createQuestCompletion
                ?.quest_completion_id
            }
            fetching={createQuestCompletionState.fetching}
          />
        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default SubmitQuestCompletionPage;

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: [],
  fallback: true,
});

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

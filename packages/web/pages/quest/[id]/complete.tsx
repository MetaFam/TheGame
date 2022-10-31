import { Flex, Heading, LoadingState, Stack, useToast } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { CompletionForm } from 'components/Quest/CompletionForm';
import {
  CreateQuestCompletionInput,
  useCreateQuestCompletionMutation,
} from 'graphql/autogen/types';
import { getSsrClient } from 'graphql/client';
import { getQuest } from 'graphql/getQuest';
import { useUser } from 'lib/hooks';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubmitQuestCompletionPage: React.FC<Props> = ({ quest }) => {
  useUser({ redirectTo: '/quests', redirectIfNotFound: true });
  const toast = useToast();
  const router = useRouter();
  const [createQuestCompletionState, createQuestCompletion] =
    useCreateQuestCompletionMutation();

  if (router.isFallback) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  if (!quest) {
    return <Page404 />;
  }

  const onSubmit = (data: CreateQuestCompletionInput) => {
    createQuestCompletion({
      input: {
        ...data,
        questId: quest.id,
      },
    }).then((response) => {
      const createQuestCompletionResponse =
        response.data?.createQuestCompletion;
      if (createQuestCompletionResponse?.success) {
        router.push(`/quest/${quest.id}`);
        toast({
          title: 'Submitted Quest Completion',
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
        <Flex flex={1} direction="column">
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
  fallback: 'blocking',
});

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const [ssrClient] = getSsrClient();
  const id = context.params?.id;
  const quest = await getQuest(id, ssrClient);

  return {
    props: {
      quest: quest ?? null,
      hideTopMenu: !quest,
    },
    revalidate: 1,
  };
};

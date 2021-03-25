import { Box, Flex, LoadingState, Heading, Stack, Text, Input, MetaButton, VStack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { getQuest } from 'graphql/getQuest';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateQuestCompletionInput, useCreateQuestCompletionMutation } from 'graphql/autogen/types';

import { PageContainer } from '../../../components/Container';
import { getSsrClient } from '../../../graphql/client';
import { UriRegexp } from '../../../lib/utils';

const validations = {
  submission_text: {
    required: true,
  },
  submission_link: {
    pattern: UriRegexp,
  },
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// TODO redirect if user not logged in
const SubmitQuestCompletionPage: React.FC<Props> = ({ quest }) => {
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm<CreateQuestCompletionInput>();
  const [createQuestCompletionState, createQuestCompletion] = useCreateQuestCompletionMutation();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!quest) {
    return <Error statusCode={404} />;
  }

  const onSubmit = handleSubmit((data) => {
    createQuestCompletion({
      input: {
        ...data,
        quest_id: quest.id,
      },
    }).then(response => {
      const createQuestCompletionResponse = response.data?.createQuestCompletion
      if(createQuestCompletionResponse && !createQuestCompletionResponse.error) {
        router.push(`/quest/${quest.id}`);
      }
    });
  });

  const createQuestCompletionSuccess = !!createQuestCompletionState.data?.createQuestCompletion?.quest_completion_id;
  const createQuestCompletionError = createQuestCompletionState.error?.message || createQuestCompletionState.data?.createQuestCompletion?.error;

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
          <Heading>Submit quest completion</Heading>
          <VStack>

            <Text>Description</Text>
            <Input
              background="dark"
              placeholder="What did you do ?"
              isRequired
              name="submission_text"
              ref={register(validations.submission_text)}
              isInvalid={!!errors.submission_text}
            />

            <Text>Link</Text>
            <Input
              background="dark"
              placeholder="External link"
              name="submission_link"
              ref={register(validations.submission_link)}
              isInvalid={!!errors.submission_link}
            />

            <MetaButton
              mt={10}
              isLoading={createQuestCompletionState.fetching}
              loadingText="Submitting..."
              onClick={onSubmit}
              isDisabled={createQuestCompletionSuccess}
            >
              Submit
            </MetaButton>

            {createQuestCompletionError &&
            <Box>
              <Text>Error while submitting completion</Text>
              <Text>{createQuestCompletionError}</Text>
            </Box>}
          </VStack>

        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default SubmitQuestCompletionPage;

type QueryParams = { id: string };

// TODO remove ?
export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  return {
    paths: [],
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

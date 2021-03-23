import { Box, Text, HStack, VStack, Flex, LoadingState, Heading, Stack, MetaButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuests } from 'graphql/getQuests';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useState, useRef } from 'react';
import { QuestCompletionStatus_Enum, QuestCompletionStatus_ActionEnum, useUpdateQuestCompletionMutation } from 'graphql/autogen/types';

import { PageContainer } from '../../components/Container';
import { useUser } from '../../lib/hooks';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

interface AlertSubmission {
  status: QuestCompletionStatus_ActionEnum;
  quest_completion_id: string;
}

const QuestPage: React.FC<Props> = ({ quest }) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { user } = useUser();
  const router = useRouter();
  const [alertSubmission, setAlertSubmission] = useState<AlertSubmission | null>(null);
  const [updateQuestCompletionStatus, updateQuestCompletion] = useUpdateQuestCompletionMutation();

  function onCloseAlert() {
    setAlertSubmission(null)
  }
  function onConfirmAlert(_alertSubmission: AlertSubmission) {
    updateQuestCompletion({
      quest_completion_id: _alertSubmission.quest_completion_id,
      status: _alertSubmission.status,
    }).then(() => {
      setAlertSubmission(null)
    })
  }

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!quest) {
    return <Error statusCode={404} />;
  }
  const isMyQuest = user?.ethereum_address === quest.player.ethereum_address;

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
          <MetaLink href="/quests">Back to quest explorer</MetaLink>
          <Heading>Quest details</Heading>
          <Box mb="6">{quest.title}</Box>
          <Box mb="6">{quest.description}</Box>

          <HStack>
            {isMyQuest &&
            <MetaLink
              as={`/quest/${quest.id}/edit`}
              href="/quest/[id]/edit"
              key={quest.id}
            >
              <MetaButton>
                Edit Quest
              </MetaButton>
            </MetaLink>
            }
            {quest.external_link &&
            <MetaLink
              href={quest.external_link}
              isExternal
            >
              <MetaButton
                variant="outline"
              >
                Open link
              </MetaButton>
            </MetaLink>
            }
          </HStack>
        </Flex>
        <Heading>Completions</Heading>
        <VStack>
          {quest.quest_completions.map(quest_completion => (
            <VStack key={quest_completion.id}>
              <Text>{quest_completion.player.ethereum_address}</Text>
              <Text>{quest_completion.submitted_at}</Text>
              <Text>{quest_completion.submission_text}</Text>
              <Text>{quest_completion.status}</Text>
              <HStack>
                {isMyQuest && quest_completion.status === QuestCompletionStatus_Enum.Pending &&
                <>
                  <MetaButton
                    variant="solid"
                    onClick={() =>
                      setAlertSubmission({
                        status: QuestCompletionStatus_ActionEnum.Accepted,
                        quest_completion_id: quest_completion.id,
                      })
                    }
                  >
                    Accept submission
                  </MetaButton>
                  <MetaButton
                    variant="outline"
                    onClick={() =>
                      setAlertSubmission({
                        status: QuestCompletionStatus_ActionEnum.Rejected,
                        quest_completion_id: quest_completion.id,
                      })
                    }
                  >
                    Reject submission
                  </MetaButton>

                </>
                }
                {quest_completion.submission_link &&
                <MetaLink
                  href={quest_completion.submission_link}
                  isExternal
                >
                  <MetaButton
                    variant="outline"
                  >
                    Open link
                  </MetaButton>
                </MetaLink>
                }
              </HStack>
            </VStack>
          ))}
        </VStack>
      </Stack>

      <AlertDialog
        isOpen={!!alertSubmission}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertSubmission?.status === QuestCompletionStatus_ActionEnum.Accepted &&
              'Are you sure you want to accept this submission ?'
              }
              {alertSubmission?.status === QuestCompletionStatus_ActionEnum.Rejected &&
              'Are you sure you want to reject this submission ?'
              }
            </AlertDialogHeader>

            <AlertDialogFooter>
              <MetaButton
                ref={cancelRef}
                onClick={onCloseAlert}
                isDisabled={updateQuestCompletionStatus.fetching}
              >
                Nope
              </MetaButton>
              <MetaButton
                colorScheme="red"
                onClick={() => onConfirmAlert(alertSubmission!)}
                isLoading={updateQuestCompletionStatus.fetching}
                loadingText="Updating..."
                ml={3}
              >
                Yep
              </MetaButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </PageContainer>
  );
};

export default QuestPage;

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
  const id = context.params?.id;
  const quest = await getQuestWithCompletions(id);

  return {
    props: {
      quest: quest === undefined ? null : quest,
    },
    revalidate: 1,
  };
};

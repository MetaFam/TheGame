import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex, Heading, HStack, LoadingState, MetaButton, MetaTag,
  Text, VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { GetQuestWithCompletionsQuery, QuestCompletionStatus_ActionEnum, QuestCompletionStatus_Enum, QuestRepetition_Enum, QuestStatus_Enum, useGetQuestWithCompletionsQuery, useUpdateQuestCompletionMutation } from 'graphql/autogen/types';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuestIds } from 'graphql/getQuests';
import { MeType, SkillColors } from 'graphql/types';
import {
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { PageContainer } from '../../components/Container';
import { ConfirmModal } from '../../components/ConfirmModal';
import { getSsrClient } from '../../graphql/client';
import { useUser } from '../../lib/hooks';

type Props = {
  quest_id: string;
}

interface AlertSubmission {
  status: QuestCompletionStatus_ActionEnum;
  quest_completion_id: string;
}

function checkSubmittable(data: GetQuestWithCompletionsQuery | null | undefined, user: MeType | null | undefined): boolean {
  const quest = data?.quest_by_pk;

  if(!user || !quest) return false;

  if (quest.status !== QuestStatus_Enum.Open) {
    return false;
  }
  // Personal or unique, check if not already done by player
  if (
    quest.repetition === QuestRepetition_Enum.Unique ||
    quest.repetition === QuestRepetition_Enum.Personal
  ) {
    return !quest.quest_completions.some(qc => qc.player.id === user.id);
  }
  if (quest.repetition === QuestRepetition_Enum.Recurring && quest.cooldown) {
    // TODO
  }

  return true;
}

const QuestPage: React.FC<Props> = ({ quest_id }) => {
  const { user } = useUser();
  const router = useRouter();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [alertSubmission, setAlertSubmission] = useState<AlertSubmission | null>(null);
  const [updateQuestCompletionStatus, updateQuestCompletion] = useUpdateQuestCompletionMutation();

  const [res, reexecuteQuery] = useGetQuestWithCompletionsQuery({
    variables: {
      id: quest_id,
    },
  });
  const quest = res.data?.quest_by_pk;
  const canSubmit = useMemo<boolean>(() => checkSubmittable(res.data, user), [res.data, user]);

  if (router.isFallback || !quest) {
    return <LoadingState />;
  }
  const isMyQuest = user?.id === quest.player.id;

  function onCloseAlert() {
    setAlertSubmission(null)
    setUpdateError(null)
  }
  function onConfirmAlert() {
    if(!alertSubmission) return;

    updateQuestCompletion({
      quest_completion_id: alertSubmission.quest_completion_id,
      status: alertSubmission.status,
    }).then(response => {
      if(!response.data?.updateQuestCompletion?.error) {
        setUpdateError(null)
        setAlertSubmission(null)
        reexecuteQuery({ requestPolicy: 'network-only' });
      } else {
        setUpdateError(response.data?.updateQuestCompletion?.error)
      }
    })
  }

  return (
    <PageContainer>
      <VStack
        spacing={6}
        align="center"
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Flex flex={1} d="column">
          <MetaLink href="/quests">Back to quest explorer</MetaLink>
          <Heading>Quest details</Heading>
          <Text>{quest.title}</Text>
          <Text>{quest.status}</Text>
          <Text>{quest.repetition}</Text>
          <Text>{quest.description}</Text>

          <HStack>
            {quest.quest_skills.map(qs => (
              <MetaTag
                size="md"
                fontWeight="normal"
                backgroundColor={SkillColors[qs.skill.category]}
              >
                {qs.skill.name}
              </MetaTag>
            ))}
          </HStack>
          <HStack>
            {isMyQuest &&
            <MetaLink
              as={`/quest/${quest.id}/edit`}
              href="/quest/[id]/edit"
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
            {canSubmit &&
            <MetaLink
              as={`/quest/${quest.id}/complete`}
              href="/quest/[id]/complete"
            >
              <MetaButton
                variant="outline"
              >
                Submit
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
      </VStack>

      <ConfirmModal
        isOpen={!!alertSubmission}
        onNope={onCloseAlert}
        onYep={onConfirmAlert}
        loading={updateQuestCompletionStatus.fetching}
        loadingText="Updating..."
        header={
          <>
            {alertSubmission?.status === QuestCompletionStatus_ActionEnum.Accepted &&
            'Are you sure you want to accept this submission ?'
            }
            {alertSubmission?.status === QuestCompletionStatus_ActionEnum.Rejected &&
            'Are you sure you want to reject this submission ?'
            }
          </>
        }
        body={updateError && (
          <Text color="red">{updateError}</Text>
        )}
      />
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

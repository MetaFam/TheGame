import {
  Heading, HStack, MetaButton,
  Text, useToast, VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { QuestCompletionStatus_ActionEnum, QuestCompletionStatus_Enum, QuestRepetition_Enum, QuestStatus_Enum, QuestWithCompletionFragmentFragment, useUpdateQuestCompletionMutation } from 'graphql/autogen/types';
import { MeType } from 'graphql/types';
import React, { useCallback, useMemo, useState } from 'react';

import { useUser } from '../../lib/hooks';
import { ConfirmModal } from '../ConfirmModal';

interface AlertSubmission {
  status: QuestCompletionStatus_ActionEnum;
  quest_completion_id: string;
}

// TODO factorize this with backend
function checkSubmittable(quest: QuestWithCompletionFragmentFragment, user: MeType | null | undefined): boolean {
  if(!user) return false;

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


type Props = {
  quest: QuestWithCompletionFragmentFragment;
}

export const QuestCompletions: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const toast = useToast();
  const [alertSubmission, setAlertSubmission] = useState<AlertSubmission | null>(null);
  const [updateQuestCompletionStatus, updateQuestCompletion] = useUpdateQuestCompletionMutation();
  const canSubmit = useMemo<boolean>(() => checkSubmittable(quest, user), [quest, user]);
  const isMyQuest = user?.id === quest.player.id;

  const onConfirmAlert = useCallback(() => {
    if(!alertSubmission) return;

    updateQuestCompletion({
      quest_completion_id: alertSubmission.quest_completion_id,
      status: alertSubmission.status,
    }).then(response => {
      if(response.data?.updateQuestCompletion?.success) {
        toast({
          title: 'Quest completion updated',
          description: `The completion is now ${alertSubmission.status}`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
        setAlertSubmission(null)
      } else {
        toast({
          title: 'Error while updating completion',
          description: response.error?.message || response.data?.updateQuestCompletion?.error || 'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    })
  }, [alertSubmission, updateQuestCompletion, toast]);

  return (
    <>
      <VStack
        spacing={6}
        align="center"
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Heading>Completions</Heading>

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
        onNope={() => setAlertSubmission(null)}
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
      />
    </>
  );
};


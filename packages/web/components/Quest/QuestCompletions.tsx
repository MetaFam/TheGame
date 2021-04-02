import {
  Avatar,
  Box,
  ConfirmModal,
  HStack,
  MetaButton,
  Text,
  useToast,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import {
  Player,
  Quest,
  QuestCompletionStatus_ActionEnum,
  QuestCompletionStatus_Enum,
  QuestWithCompletionFragmentFragment,
  useUpdateQuestCompletionMutation,
} from 'graphql/autogen/types';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useUser } from '../../lib/hooks';
import { getPlayerName } from '../../utils/playerHelpers';
import { CompletionStatusTag } from './QuestTags';

interface AlertSubmission {
  status: QuestCompletionStatus_ActionEnum;
  quest_completion_id: string;
}

type Props = {
  quest: QuestWithCompletionFragmentFragment;
};

export const QuestCompletions: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const toast = useToast();
  const [
    alertSubmission,
    setAlertSubmission,
  ] = useState<AlertSubmission | null>(null);
  const [
    updateQuestCompletionStatus,
    updateQuestCompletion,
  ] = useUpdateQuestCompletionMutation();
  const isMyQuest = user?.id === (quest as Quest).player.id;

  const onConfirmAlert = useCallback(() => {
    if (!alertSubmission) return;

    updateQuestCompletion({
      quest_completion_id: alertSubmission.quest_completion_id,
      status: alertSubmission.status,
    }).then((response) => {
      if (response.data?.updateQuestCompletion?.success) {
        toast({
          title: 'Quest completion updated',
          description: `The completion is now ${alertSubmission.status}`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
        setAlertSubmission(null);
      } else {
        toast({
          title: 'Error while updating completion',
          description:
            response.error?.message ||
            response.data?.updateQuestCompletion?.error ||
            'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  }, [alertSubmission, updateQuestCompletion, toast]);

  return (
    <Box>
      <VStack spacing={4}>
        {quest.quest_completions.length === 0 && (
          <Text>There are no proposal for this quest yet.</Text>
        )}
        {quest.quest_completions.map((questCompletion) => (
          <Box key={questCompletion.id} w="100%">
            <HStack px={4} py={4}>
              <Avatar name={getPlayerName(questCompletion.player as Player)} />
              <CompletionStatusTag status={questCompletion.status} />
              <Text>
                <i>
                  by{' '}
                  <MetaLink
                    as={`/player/${questCompletion.player.username}`}
                    href="/player/[username]"
                  >
                    {getPlayerName(questCompletion.player as Player)}
                  </MetaLink>
                </i>
              </Text>
              <Text>{moment(questCompletion.submitted_at).fromNow()}</Text>
            </HStack>

            <Box bg="whiteAlpha.200" px={8} py={4} rounded="lg">
              <Text textStyle="caption" mb={2}>
                Message
              </Text>
              <Text>{questCompletion.submission_text}</Text>

              {questCompletion.submission_link && (
                <MetaLink href={questCompletion.submission_link} isExternal>
                  <MetaButton
                    variant="link"
                    colorScheme="cyan"
                    leftIcon={<FaExternalLinkAlt />}
                    size="md"
                    mt={4}
                  >
                    Open link
                  </MetaButton>
                </MetaLink>
              )}
            </Box>

            {isMyQuest &&
              questCompletion.status === QuestCompletionStatus_Enum.Pending && (
                <HStack mt={4}>
                  <MetaButton
                    variant="solid"
                    size="md"
                    onClick={() =>
                      setAlertSubmission({
                        status: QuestCompletionStatus_ActionEnum.Accepted,
                        quest_completion_id: questCompletion.id,
                      })
                    }
                  >
                    Accept submission
                  </MetaButton>

                  <MetaButton
                    variant="outline"
                    colorScheme="pink"
                    size="md"
                    onClick={() =>
                      setAlertSubmission({
                        status: QuestCompletionStatus_ActionEnum.Rejected,
                        quest_completion_id: questCompletion.id,
                      })
                    }
                  >
                    Reject submission
                  </MetaButton>
                </HStack>
              )}
          </Box>
        ))}
      </VStack>

      <ConfirmModal
        isOpen={!!alertSubmission}
        onNope={() => setAlertSubmission(null)}
        onYep={onConfirmAlert}
        loading={updateQuestCompletionStatus.fetching}
        loadingText="Updating..."
        header={
          <>
            {alertSubmission?.status ===
              QuestCompletionStatus_ActionEnum.Accepted &&
              'Are you sure you want to accept this submission ?'}
            {alertSubmission?.status ===
              QuestCompletionStatus_ActionEnum.Rejected &&
              'Are you sure you want to reject this submission ?'}
          </>
        }
      />
    </Box>
  );
};

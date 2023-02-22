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
import { CompletionStatusTag } from 'components/Quest/QuestTags';
import {
  Quest,
  QuestCompletionStatus_ActionEnum,
  QuestCompletionStatus_Enum,
  QuestWithCompletionFragment,
  useUpdateQuestCompletionMutation,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

interface AlertSubmission {
  status: QuestCompletionStatus_ActionEnum;
  questCompletionId: string;
}

type Props = {
  quest: QuestWithCompletionFragment;
};

type MapType = {
  [id: string]: string | undefined;
};

export const QuestCompletions: React.FC<Props> = ({ quest }) => {
  const [urls, setURLs] = useState<MapType>({});
  const [names, setNames] = useState<MapType>({});
  const { user } = useUser();
  const toast = useToast();
  const [alertSubmission, setAlertSubmission] =
    useState<AlertSubmission | null>(null);
  const [{ fetching }, updateQuestCompletion] =
    useUpdateQuestCompletionMutation();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const { Accepted, Rejected } = QuestCompletionStatus_ActionEnum;

  const onConfirmAlert = useCallback(() => {
    if (!alertSubmission) return;

    updateQuestCompletion({ ...alertSubmission }).then(({ data, error }) => {
      if (data?.updateQuestCompletion?.success) {
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
            error?.message ||
            data?.updateQuestCompletion?.error ||
            'Unknown Error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  }, [alertSubmission, updateQuestCompletion, toast]);

  useEffect(() => {
    if (!quest.quest_completions) return;
    const extractURLs = async () => {
      quest.quest_completions.forEach(async ({ player }) => {
        const url = await getPlayerURL(player);
        const name = await getPlayerName(player);
        setNames({ ...names, [player.ethereumAddress]: name });
        setURLs({ ...urls, [player.ethereumAddress]: url });
      });
    };
    extractURLs();
  }, [quest.quest_completions]); // eslint-disable-line react-hooks/exhaustive-deps

  const getURL = (address: string) => {
    const result = urls[address] ? urls[address] : address;
    return !result?.includes('.') ? `player/${result}` : result;
  };

  const getName = (address: string) =>
    names[address] ? names[address] : address;

  return (
    <Box>
      <VStack spacing={4}>
        {quest.quest_completions.length === 0 && (
          <Text>There are no proposal for this quest yet.</Text>
        )}
        {quest.quest_completions.map(
          ({
            id,
            status,
            player,
            submittedAt,
            submissionText,
            submissionLink,
          }) => (
            <Box key={id} w="100%">
              <HStack px={4} py={4}>
                <Avatar name={getName(player.ethereumAddress)} />
                <CompletionStatusTag {...{ status }} />
                <Text>
                  <i>
                    by{' '}
                    <MetaLink
                      as={getURL(player.ethereumAddress)}
                      href="/player/[username]"
                    >
                      {getName(player.ethereumAddress)}
                    </MetaLink>
                  </i>
                </Text>
                <Text>{moment(submittedAt).fromNow()}</Text>
              </HStack>

              <Box bg="whiteAlpha.200" px={8} py={4} rounded="lg">
                <Text textStyle="caption" mb={2}>
                  Message
                </Text>
                <Text>{submissionText}</Text>

                {submissionLink && (
                  <Box mt={2}>
                    <MetaLink href={submissionLink} isExternal>
                      Open Link
                      <FaExternalLinkAlt
                        fontSize="0.875rem"
                        style={{
                          display: 'inline-block',
                          marginLeft: '0.5rem',
                        }}
                      />
                    </MetaLink>
                  </Box>
                )}
              </Box>

              {isMyQuest && status === QuestCompletionStatus_Enum.Pending && (
                <HStack mt={4}>
                  <MetaButton
                    variant="solid"
                    size="md"
                    onClick={() =>
                      setAlertSubmission({
                        status: Accepted,
                        questCompletionId: id,
                      })
                    }
                  >
                    Accept Submission
                  </MetaButton>

                  <MetaButton
                    variant="outline"
                    colorScheme="pink"
                    size="md"
                    onClick={() =>
                      setAlertSubmission({
                        status: Rejected,
                        questCompletionId: id,
                      })
                    }
                  >
                    Reject Submission
                  </MetaButton>
                </HStack>
              )}
            </Box>
          ),
        )}
      </VStack>

      <ConfirmModal
        isOpen={!!alertSubmission}
        onNope={() => setAlertSubmission(null)}
        onYep={onConfirmAlert}
        loading={fetching}
        loadingText="Updating…"
        header={
          <>
            {alertSubmission?.status === Accepted &&
              'Are you sure you want to accept this submission?'}
            {alertSubmission?.status === Rejected &&
              'Are you sure you want to reject this submission?'}
          </>
        }
      />
    </Box>
  );
};

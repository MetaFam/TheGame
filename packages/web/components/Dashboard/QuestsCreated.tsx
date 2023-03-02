import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  LoadingState,
  Switch,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import {
  Player,
  QuestCompletionStatus_Enum,
  useGetQuestsWithCompletionsQuery,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';

import { QuestCompletionItem } from './QuestCompletionItem';

export const DashboardQuestsCreated: React.FC = () => {
  const { user } = useUser();
  const [pendingOnly, setPendingOnly] = useState(true);

  const [createdQuestsResponse] = useGetQuestsWithCompletionsQuery({
    variables: {
      createdByPlayerId: user?.id,
      completionStatus: pendingOnly
        ? QuestCompletionStatus_Enum.Pending
        : undefined,
    },
  });
  const { fetching, data, error } = createdQuestsResponse;
  const createdQuests = data?.quest || null;

  return (
    <Flex direction="column" p={6} w="100%">
      <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
        Posted Quest Submissions
      </Text>
      <Box mt={4} w="100%" overflowY="hidden">
        {fetching && <LoadingState />}
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {createdQuests != null && createdQuests.length > 0 && (
          <Box h="100%" overflowY="auto">
            <FormControl display="flex" alignItems="center">
              <FormLabel
                htmlFor="pendingOnly"
                mb={0}
                fontSize="md"
                style={{ cursor: 'pointer' }}
              >
                Pending submissions only
              </FormLabel>
              <Switch
                id="pendingOnly"
                isChecked={pendingOnly}
                onChange={() => setPendingOnly(!pendingOnly)}
              />
            </FormControl>
            {createdQuests.map((quest) => (
              <Box mt={2}>
                <MetaLink href={`/quest/${quest.id}`}>{quest.title}</MetaLink>
                {quest.quest_completions?.length > 0 && (
                  <UnorderedList>
                    {quest.quest_completions.map((questCompletion) => (
                      <QuestCompletionItem
                        submittedAt={questCompletion.submittedAt}
                        player={questCompletion.player as Player}
                      />
                    ))}
                  </UnorderedList>
                )}
              </Box>
            ))}
          </Box>
        )}
        {createdQuests?.length === 0 && <Box>You have no active quests.</Box>}
      </Box>
    </Flex>
  );
};

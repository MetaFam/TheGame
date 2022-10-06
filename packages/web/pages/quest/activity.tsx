import { Box, Heading, HStack, LoadingState, Text } from '@metafam/ds';
import { ConnectedPage } from 'components/ConnectedPage';
import { PageContainer } from 'components/Container';
import {
  Player,
  useGetQuestsWithCompletionsQuery,
} from 'graphql/autogen/types';
import React from 'react';
import { getPlayerName } from 'utils/playerHelpers';

const ConnectedDashboardPage: React.FC<Props> = () => (
  <ConnectedPage page={QuestActivityPage} pageLabel="Quest activity" />
);

export default ConnectedDashboardPage;

type Props = { player: Player };

export const QuestActivityPage: React.FC<Props> = ({ player }) => {
  const [createdQuestsResponse] = useGetQuestsWithCompletionsQuery({
    variables: {
      createdByPlayerId: player.id,
    },
  });
  const { fetching, data, error } = createdQuestsResponse;
  const createdQuests = data?.quest || null;

  return (
    <PageContainer>
      <Box w="100%" maxW="80rem">
        <HStack justify="space-between" w="100%">
          <Heading>Quest Activity</Heading>
        </HStack>
      </Box>

      <Box mt={8} w="100%">
        {fetching && <LoadingState />}
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {createdQuests != null && createdQuests.length > 0 && (
          <Box>
            <HStack spacing={8}>
              <h4>Quest</h4>
              <h4>Proposal by</h4>
              <h4>Proposedon</h4>
            </HStack>
            {createdQuests.map((quest) =>
              quest.quest_completions?.length > 0 ? (
                quest.quest_completions.map((questCompletion) => (
                  <HStack spacing={8}>
                    <Box>{quest.title}</Box>
                    <Box>{getPlayerName(questCompletion.player as Player)}</Box>
                    <Box>{questCompletion.submittedAt}</Box>
                  </HStack>
                ))
              ) : (
                <HStack spacing={8}>
                  <Box>{quest.title}</Box>
                </HStack>
              ),
            )}
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

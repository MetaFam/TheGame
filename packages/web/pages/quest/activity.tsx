import {
  Box,
  Heading,
  HStack,
  LoadingState,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@metafam/ds';
import { ConnectedPage } from 'components/ConnectedPage';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import {
  Player,
  useGetQuestsWithCompletionsQuery,
} from 'graphql/autogen/types';
import moment from 'moment';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
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
      <Box w="100%">
        <Box mb={4}>
          <MetaLink href="/quests">
            <FaArrowLeft
              fontSize="0.875rem"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            />
            Back to quest explorer
          </MetaLink>
        </Box>
        <HStack justify="space-between" w="100%">
          <Heading size="xl">Quest Activity</Heading>
        </HStack>
      </Box>

      <Box mt={8} w="100%">
        {fetching && <LoadingState />}
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {createdQuests != null && createdQuests.length > 0 && (
          <>
            <Heading size="sm">Your Quests</Heading>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Quest</Th>
                    <Th>Submitted by</Th>
                    <Th>Submitted on</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {createdQuests.map((quest) =>
                    quest.quest_completions?.length > 0 ? (
                      quest.quest_completions.map((questCompletion) => (
                        <Tr>
                          <Td>
                            <MetaLink href={`/quest/${quest.id}`}>
                              {quest.title}
                            </MetaLink>
                          </Td>
                          <Td>
                            {getPlayerName(questCompletion.player as Player)}
                          </Td>
                          <Td>
                            {moment(questCompletion.submittedAt).format(
                              'MMM D h:mma',
                            )}
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3}>{quest.title}</Td>
                      </Tr>
                    ),
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
        {createdQuests?.length === 0 && <Box>You have no active quests.</Box>}
      </Box>
    </PageContainer>
  );
};

import {
  Box,
  Center,
  Flex,
  ListItem,
  LoadingState,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  Text,
  UnorderedList,
} from '@metafam/ds';
import React, { useMemo, useState } from 'react';

import { MetaLink } from '#components/Link';
import { CompletionStatusTag } from '#components/Quest/QuestTags';
import {
  QuestCompletionStatus_Enum,
  useGetCompletedQuestsByPlayerQuery,
} from '#graphql/autogen/hasura-sdk';
import { useUser } from '#lib/hooks';

type StatusOption = { value: string; label: string };

export const DashboardQuestsCompleted: React.FC = () => {
  const { user } = useUser();

  const [completedQuestsResponse] = useGetCompletedQuestsByPlayerQuery({
    variables: {
      completedByPlayerId: user?.id,
    },
  });
  const { fetching, data, error } = completedQuestsResponse;
  const allQuests = data?.quest_completion || null;

  const statusOptions: StatusOption[] = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Pending',
      value: QuestCompletionStatus_Enum.Pending,
    },
    {
      label: 'Accepted',
      value: QuestCompletionStatus_Enum.Accepted,
    },
    {
      label: 'Rejected',
      value: QuestCompletionStatus_Enum.Rejected,
    },
  ];

  const [statusSelection, setStatusSelection] = useState(statusOptions[0]);

  const quests = useMemo(() => {
    if (allQuests == null) {
      return [];
    }
    if (statusSelection.value.length === 0) {
      return allQuests;
    }
    return allQuests.filter((quest) => quest.status === statusSelection.value);
  }, [allQuests, statusSelection]);

  return (
    <Flex direction="column" p={6} w="100%">
      <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
        Submitted Quests
      </Text>
      <Box mt={2}>
        {fetching && <LoadingState />}
        {error && <Text>{`Error: ${error.message}`}</Text>}
        <MetaFilterSelectSearch
          title={`Status: ${statusSelection.label}`}
          styles={metaFilterSelectStyles}
          hasValue={false}
          value={statusSelection}
          onChange={(value) => {
            const values = value as StatusOption[];
            const [selected] = values.slice(-1);
            if (selected) {
              setStatusSelection(selected);
            }
          }}
          options={statusOptions}
          disableEmpty
        />
        <Box mt={2}>
          {quests.length > 0 ? (
            <UnorderedList>
              {quests.slice(0, 10).map((quest) => (
                <ListItem key={quest.id}>
                  <Flex mb={2}>
                    <Center mr={2}>
                      <MetaLink href={`/quest/${quest.questId}`}>
                        <Text fontSize="l">{quest.completed?.title}</Text>
                      </MetaLink>
                    </Center>
                    <CompletionStatusTag status={quest.status} />
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Text fontStyle="italic" mb="1rem">
              No {statusSelection.label.toLocaleLowerCase()} quests found for
              you.
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

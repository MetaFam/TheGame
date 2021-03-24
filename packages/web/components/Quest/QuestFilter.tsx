import {
  Heading,
  Box, MetaButton,
  Select,
  VStack,
  Text,
} from '@metafam/ds';
import React from 'react';
import { GetQuestsQueryVariables, QuestStatus_Enum } from 'graphql/autogen/types';

type Props = {
  queryVariables: GetQuestsQueryVariables
  setQueryVariable: (_string, __any) => void;
};

export const QuestFilter: React.FC<Props> = ({ queryVariables, setQueryVariable }) => {

  return (
    <Box>
      <Heading>
        Filters
      </Heading>
      <MetaButton
        as="a"
        href="/quest/create"
        fontFamily="mono"
      >
        New Quest
      </MetaButton>
      <VStack>
        <Select
          value={queryVariables.limit as number}
          onChange={(e) => setQueryVariable('limit', Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
        <Select
          value={queryVariables.status as string}
          onChange={(e) => setQueryVariable('status', e.target.value)}
        >
          <option value={QuestStatus_Enum.Open}>Open</option>
          <option value={QuestStatus_Enum.Closed}>Closed</option>
        </Select>
      </VStack>
    </Box>
  );
}

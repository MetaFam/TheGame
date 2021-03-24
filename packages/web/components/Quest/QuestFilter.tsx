import {
  Heading,
  Box, MetaButton,
  HStack,
} from '@metafam/ds';
import React from 'react';
import { GetQuestsQueryVariables, QuestStatus_Enum } from 'graphql/autogen/types';

type Props = {
  queryVariables: GetQuestsQueryVariables
};

export const QuestFilter: React.FC<Props> = ({ queryVariables }) => (
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
    <HStack>
    </HStack>
  </Box>
);

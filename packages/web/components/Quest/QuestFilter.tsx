import {
  Heading,
  Box, MetaButton,
} from '@metafam/ds';
import React from 'react';

type Props = {
};

export const QuestFilter: React.FC<Props> = ({}) => (
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
  </Box>
);

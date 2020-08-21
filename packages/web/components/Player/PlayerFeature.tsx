import { Box, Text } from '@metafam/ds';
import React from 'react';

type Props = { title: string; value?: string | null | undefined };

export const PlayerFeature: React.FC<Props> = ({ title, value, children }) => (
  <Box>
    <Text
      fontFamily="body"
      fontSize="sm"
      fontWeight="bold"
      color="blueLight"
      textTransform="uppercase"
      mb="0.5rem"
    >
      {title}
    </Text>
    <Text fontFamily="body" fontSize="md" fontWeight="bold">
      {value || children}
    </Text>
  </Box>
);

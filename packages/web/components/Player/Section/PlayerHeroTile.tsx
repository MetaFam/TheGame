import { Box, HStack, Text } from '@metafam/ds';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const PlayerHeroTile: React.FC<Props> = ({ children, title }) => (
  <Box>
    <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
      {title}
    </Text>
    <HStack alignItems="baseline">{children}</HStack>
  </Box>
);

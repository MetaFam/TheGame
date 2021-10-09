import { Box, HStack, Text } from '@metafam/ds';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const PlayerHeroTile: React.FC<Props> = ({ children, title }) => (
  <Box width="full">
    <Text fontSize="md" color="blueLight" mb={1}>
      {title}
    </Text>
    <HStack alignItems="baseline" fontSize="lg">
      {children}
    </HStack>
  </Box>
);

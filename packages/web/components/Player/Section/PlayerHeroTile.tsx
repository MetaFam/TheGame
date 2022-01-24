import { Box, BoxProps, HStack, Text } from '@metafam/ds';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const PlayerHeroTile: React.FC<Props & BoxProps> = ({
  children,
  title,
  ...props
}) => (
  <Box width="full" {...props}>
    <Text fontSize="md" color="blueLight" mb={1} whiteSpace="nowrap">
      {title}
    </Text>
    <HStack alignItems="baseline" fontSize="lg">
      {children}
    </HStack>
  </Box>
);

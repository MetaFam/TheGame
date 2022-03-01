import { Box, Heading } from '@metafam/ds';
import React from 'react';

export type MetaBoxProps = {
  title: string;
  children: React.ReactNode;
  editing?: boolean;
};

export const GridItem: React.FC<MetaBoxProps> = ({
  children,
  title,
  editing = false,
}) => (
  <Box
    borderRadius="lg"
    boxShadow="md"
    bg="blackAlpha.300"
    padding={6}
    pos="relative"
    overflow="hidden"
    w="100%"
    sx={{
      p: {
        fontSize: 'md',
        pb: 2,
        mr: 'auto',
      },
      ul: {
        fontSize: 'sm',
        pb: 2,
        pl: 6,
      },
      h2: {
        fontFamily: 'exo2',
        fontSize: 'lg',
        fontWeight: '700',
        textAlign: 'left',
        textTransform: 'uppercase',
      },
    }}
  >
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      overflowX="hidden"
      pointerEvents={editing ? 'none' : 'initial'}
    >
      <Heading size="md">{title}</Heading>
      {children}
    </Box>
    {editing && (
      <Box w="100%" h="100%" bg="purpleTag50" pos="absolute" top={0} left={0} />
    )}
  </Box>
);

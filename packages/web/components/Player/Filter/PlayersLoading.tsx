import { Flex, SimpleGrid } from '@metafam/ds';
import { PlayerTileSkeleton } from 'components/Player/PlayerTileSkeleton';
import React from 'react';

export const PlayersLoading: React.FC = () => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="8"
    autoRows="minmax(35rem, auto)"
    w="100%"
    maxW="79rem"
  >
    <Flex w="100%" align="center" justify="center">
      <PlayerTileSkeleton />
    </Flex>
    <Flex
      w="100%"
      align="center"
      justify="center"
      display={{ base: 'none', md: 'flex' }}
    >
      <PlayerTileSkeleton />
    </Flex>
    <Flex
      w="100%"
      align="center"
      justify="center"
      display={{ base: 'none', lg: 'flex' }}
    >
      <PlayerTileSkeleton />
    </Flex>
  </SimpleGrid>
);

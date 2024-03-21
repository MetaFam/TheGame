import { Flex, SimpleGrid } from '@metafam/ds';
import { PlayerTileSkeleton } from 'components/Player/Filter/PlayerTileSkeleton';

export const PlayersLoading: React.FC = () => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="8"
    autoRows="minmax(35rem, auto)"
    w="100%"
    maxW="7xl"
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

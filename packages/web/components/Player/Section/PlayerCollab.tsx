import { Box, Divider, HStack, SimpleGrid, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaClock } from 'react-icons/fa';

import { PlayerTimeZone } from '../PlayerTimeZone';

type Props = { player: PlayerFragmentFragment };
export const PlayerCollab: React.FC<Props> = ({ player }) => (
  <SimpleGrid
    columns={2}
    gap={0}
    divider={
      <Divider height="3rem" color="whiteAlpha.400" orientation="vertical" />
    }
  >
    <PlayerTimeZone player={player} />
    <Box borderLeft="1px solid" borderLeftColor="rgba(255,255,255,0.6)" pl={4}>
      <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
        Availability
      </Text>
      <HStack alignItems="baseline">
        <Box width="1rem">
          <FaClock color="blueLight" width="1rem" />
        </Box>
        <Text fontSize={{ base: 'md', sm: 'lg' }} fontFamily="mono" mb="1">
          {`${player.availability_hours || '0'} h/week`}
        </Text>
      </HStack>
    </Box>
  </SimpleGrid>
);

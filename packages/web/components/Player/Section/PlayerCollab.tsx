import { Box, Divider, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaClock } from 'react-icons/fa';

import { PlayerTimeZone } from '../PlayerTimeZone';

type Props = { player: PlayerFragmentFragment };
export const PlayerCollab: React.FC<Props> = ({ player }) => (
  <HStack
    spacing={6}
    divider={
      <Divider height="3rem" color="whiteAlpha.400" orientation="vertical" />
    }
  >
    <PlayerTimeZone player={player} />
    <Box>
      <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
        Availability
      </Text>
      <HStack alignItems="baseline">
        <FaClock color="blueLight" />
        <Text fontSize="lg" fontFamily="mono" mb="1">
          {player.availability_hours || '0'}h/week
        </Text>
      </HStack>
    </Box>
  </HStack>
);

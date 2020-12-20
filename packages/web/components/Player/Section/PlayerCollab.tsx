import { Box, Divider, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';

type Props = { player: PlayerFragmentFragment };
export const PlayerCollab: React.FC<Props> = ({ player }) => {
  return (
    <HStack
      spacing={6}
      divider={
        <Divider height="3rem" color="purpleTag" orientation="vertical" />
      }
    >
      <Box>
        <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
          Location
        </Text>
        <HStack alignItems="baseline">
          <FaGlobe color="blueLight" />
          <Text fontSize="lg" fontFamily="mono" mb="1">
            {player.box_profile?.location || '-'}
          </Text>
        </HStack>
      </Box>
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
};

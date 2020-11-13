import { Box, Flex, HStack, MetaButton, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';

import { PlayerBox } from './PlayerBoxe';

// TODO Fake data, role not found and location instead of timezone
type Props = { player: PlayerFragmentFragment };
export const PlayerCollab: React.FC<Props> = ({ player }) => {
  return (
    <PlayerBox>
      <Flex align="center" direction="row">
        <Box>
          <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
            role
          </Text>
          <Text fontSize="xl" mb="1">
            Community Lead
          </Text>
        </Box>
        <Box
          height="3rem"
          borderRight="1px"
          borderColor="purpleBoxLight"
          mr={4}
          ml={4}
        />
        <Box ml={1}>
          <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
            timezone
          </Text>
          <HStack alignItems="baseline">
            <FaGlobe color="#A5B9F6" />
            <Text fontSize="xl" mb="1">
              {player.box_profile?.location || '-'}
            </Text>
          </HStack>
        </Box>
        <Box
          height="3rem"
          borderRight="1px"
          borderColor="purpleBoxLight"
          mr={4}
          ml={4}
        />
        <Box>
          <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
            Availability
          </Text>
          <HStack alignItems="baseline">
            <FaClock color="#A5B9F6" />
            <Text fontSize="xl" mb="1">
              {player.availability_hours || '0'}h/week
            </Text>
          </HStack>
        </Box>
        <Box ml="auto">
          <MetaButton size="lg" px={8} onClick={() => {}} mr={4}>
            collab
          </MetaButton>
          <MetaButton size="lg" px={8} onClick={() => {}} disabled>
            trust
          </MetaButton>
        </Box>
      </Flex>
    </PlayerBox>
  );
};

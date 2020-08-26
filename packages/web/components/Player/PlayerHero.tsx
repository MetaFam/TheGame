import { Avatar, Box, Container, Flex, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import BackgroundImage from 'public/images/login-background.jpg';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

import { PlayerContacts } from './PlayerContacts';

type Props = { player: PlayerFragmentFragment };

export const PlayerHero: React.FC<Props> = ({ player }) => {
  return (
    <Box
      bgImage={`url(${BackgroundImage})`}
      h={{ base: '48', md: '3xs' }}
      mb="6"
    >
      <Container maxW="xl">
        <Flex pos="relative" top={{ base: '20', md: '10' }} align="center">
          <Avatar
            w={{ base: '32', md: '56' }}
            h={{ base: '32', md: '56' }}
            src={getPlayerImage(player)}
            name={getPlayerName(player)}
          />
          <Box pl="8">
            <Text fontSize="xl" fontFamily="heading" mb="1">
              {getPlayerName(player)}
            </Text>
            <HStack mt="2">
              <PlayerContacts player={player} />
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

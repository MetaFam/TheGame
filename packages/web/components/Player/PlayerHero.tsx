import { Avatar, Box, Container, Flex, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import BackgroundImage from 'public/images/login-background.jpg';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

type Props = { player: PlayerFragmentFragment };

export const PlayerHero: React.FC<Props> = ({ player }) => {
  return (
    <Box bgImage={`url(${BackgroundImage})`} h="3xs" mb="6">
      <Container maxW="xl">
        <Flex pos="relative" top="10" align="center">
          <Avatar
            w="56"
            h="56"
            src={getPlayerImage(player)}
            name={getPlayerName(player)}
          />

          <Box pl="8">
            <Text fontSize="xl" fontFamily="heading" mb="1">
              {getPlayerName(player)}
            </Text>
            <Text fontSize="md" textTransform="uppercase">
              Personality type
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

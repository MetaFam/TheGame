import { Avatar, Box, Flex, Text } from '@metafam/ds';
import { MaxWidthContainer } from 'components/Container';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import BackgroundImage from 'public/images/login-background.jpg';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

type Props = { player: PlayerFragmentFragment };

export const PlayerHero: React.FC<Props> = ({ player }) => {
  return (
    <Box bgImage={`url(${BackgroundImage})`} h="14.5rem" mb="1.5rem">
      <MaxWidthContainer>
        <Flex pos="relative" top="4.5rem" align="center">
          <Avatar
            size="3xl"
            w="12.5rem"
            h="12.5rem"
            src={getPlayerImage(player)}
            name={getPlayerName(player)}
          />

          <Box pl="2.5rem" mt="-2rem">
            <Text fontSize="xl" fontFamily="heading" mb="0.25rem">
              {getPlayerName(player)}
            </Text>
            <Text fontSize="md" textTransform="uppercase">
              Personality type
            </Text>
          </Box>
        </Flex>
      </MaxWidthContainer>
    </Box>
  );
};

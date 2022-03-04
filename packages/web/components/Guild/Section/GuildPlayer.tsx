import { Box, Heading, HStack, Link, Text } from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { GuildPlayer } from 'graphql/types';
import React from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

type GuildPlayerProps = {
  player: GuildPlayer;
};

export const GuildPlayerComponent: React.FC<GuildPlayerProps> = ({
  player,
}) => (
  <Link
    role="group"
    _hover={{ textDecoration: 'none' }}
    href={getPlayerURL(player)}
  >
    <HStack alignItems="center" mb={6}>
      <PlayerAvatar size="lg" mr={6} {...{ player }} />
      <Box>
        <Heading
          _groupHover={{ textDecoration: 'underline' }}
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="xs"
          color="white"
          mb="1"
        >
          {getPlayerName(player)}
        </Heading>
        <HStack alignItems="center">
          <Text fontSize="xs">{(player as GuildPlayer).role}</Text>
        </HStack>
      </Box>
    </HStack>
  </Link>
);

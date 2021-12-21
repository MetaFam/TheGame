import { Box, Heading, HStack, Link, Text } from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import React from 'react';
import { getNameOf } from 'utils/playerHelpers';

type GuildPlayerProps = {
  player: Player;
};

export const GuildPlayerComponent: React.FC<GuildPlayerProps> = ({
  player,
}) => (
  <Link
    role="group"
    _hover={{ textDecoration: 'none' }}
    href={`/player/${player.profile?.username}`}
  >
    <HStack alignItems="center" mb={6}>
      <PlayerAvatar w={16} h={16} mr={6} {...{ player }} />
      <Box>
        <Heading
          _groupHover={{ textDecoration: 'underline' }}
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="xs"
          color="white"
          mb="1"
        >
          {getNameOf(player)}
        </Heading>
        <HStack alignItems="center">
          <Text fontSize="xs">{(player as GuildPlayer).role}</Text>
        </HStack>
      </Box>
    </HStack>
  </Link>
);

import { Box, Heading, HStack, Link, Text } from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import React from 'react';
import { getPlayerName } from 'utils/playerHelpers';

type GuildPlayerProps = {
  player: PlayerFragmentFragment;
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
          {getPlayerName(player)}
        </Heading>
        <HStack alignItems="center">
          <Text fontSize="xs">{(player as GuildPlayer).role}</Text>
        </HStack>
      </Box>
    </HStack>
  </Link>
);

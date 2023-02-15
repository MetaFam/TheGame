import { Box, Heading, HStack, Link, Text } from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { GuildPlayer } from 'graphql/types';
import React, { useEffect, useState } from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

type GuildPlayerProps = {
  player: GuildPlayer;
};

export const GuildPlayerComponent: React.FC<GuildPlayerProps> = ({
  player,
}) => {
  const [linkURL, setLinkURL] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    const getPlayer = async () => {
      const playername = await getPlayerName(player);
      const url = await getPlayerURL(player);
      setName(playername);
      setLinkURL(url);
    };
    getPlayer();
  }, [player]);

  return (
    <Link role="group" _hover={{ textDecoration: 'none' }} href={linkURL}>
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
            {name}
          </Heading>
          <HStack alignItems="center">
            <Text fontSize="xs">{(player as GuildPlayer).role}</Text>
          </HStack>
        </Box>
      </HStack>
    </Link>
  );
};

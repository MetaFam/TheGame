import { Box } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import {
  formatAddress,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

type Props = {
  position: number;
  player: Player;
  showSeasonalXP: any;
};

export const LeaderboardLink: React.FC<Props> = ({
  player,
  showSeasonalXP,
  position,
}) => {
  const [linkURL, setLinkURL] = useState<string>(
    `/player/${player?.ethereumAddress}`,
  );
  const [playerName, setPlayerName] = useState<string>(
    formatAddress(player?.ethereumAddress),
  );

  useEffect(() => {
    const getPlayer = async () => {
      setPlayerName(await getPlayerName(player));
      setLinkURL((await getPlayerURL(player)) || '');
    };
    getPlayer();
  }, [player]);

  return (
    <MetaLink
      key={`player-chip-${player.id}`}
      as={linkURL}
      href="/player/[username]"
      w="100%"
      color="white"
      _hover={{}}
    >
      <Box
        display="flex"
        width="100%"
        maxW="100%"
        px={3}
        py={2}
        fontSize={['sm', 'md']}
        flexFlow="row nowrap"
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor="blackAlpha.500"
        borderRadius="md"
        overflow="hidden"
        _hover={{
          boxShadow: 'md',
          backgroundColor: 'blackAlpha.600',
        }}
      >
        <Box flex={0} mr={1.5}>
          {position}
        </Box>
        <PlayerAvatar
          bg="cyan.200"
          border={0}
          mr={1}
          size="sm"
          player={player}
          sx={{
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '1px solid white',
              borderColor: player.rank
                ? player.rank.toLocaleLowerCase()
                : 'red.400',
            },
          }}
        />
        <Box overflowX="hidden" whiteSpace="pre" textOverflow="ellipsis" mr={2}>
          {playerName}
        </Box>
        <Box textAlign="right" flex={1}>
          {Math.floor(
            showSeasonalXP ? player.seasonXP : player.totalXP,
          ).toLocaleString()}
        </Box>
      </Box>
    </MetaLink>
  );
};

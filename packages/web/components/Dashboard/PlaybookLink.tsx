import { Box } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
import React from 'react';

type Props = {
  name: string;
  completed: boolean;
};

export const PlaybookLink: React.FC<Props> = ({ name, completed }) => (
  <MetaLink
    key={`player-chip-${name}`}
    as={''}
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
      {/* <PlayerAvatar
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
        /> */}
      <Box overflowX="hidden" whiteSpace="pre" textOverflow="ellipsis" mr={2}>
        {name}
      </Box>
      {/* <Box textAlign="right" flex={1}>
          {Math.floor(
            showSeasonalXP ? player.seasonXP : player.totalXP,
          ).toLocaleString()}
        </Box> */}
    </Box>
  </MetaLink>
);

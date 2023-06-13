import { Box, Link, Text } from '@metafam/ds';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { SquareImage } from 'components/SquareImage';
import { GuildFragment, Player } from 'graphql/autogen/types';
import React from 'react';
import { formatAddress, formatIfAddress } from 'utils/playerHelpers';

export const UserGrid: React.FC<{
  players?: Player[];
  guilds?: GuildFragment[];
  link?: string;
}> = ({ players, guilds, link }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
  >
    {players?.length
      ? players?.map((player, i) => (
          <Box
            key={`user-${i}`}
            sx={{
              width: '20%',
              marginRight: '5%',
              marginBottom: '10px',
            }}
          >
            <PlayerProfilePicture
              {...{ player }}
              size="xxs"
              sx={{ borderRadius: '50px' }}
            />
            <Text sx={{ fontSize: 'xss' }}>
              {player.profile?.name || formatAddress(player.ethereumAddress)}
            </Text>
          </Box>
        ))
      : ''}

    {guilds?.map((guild, i) => (
      <Box
        key={`user-${i}`}
        sx={{
          width: '20%',
          marginRight: '5%',
          marginBottom: '10px',
        }}
      >
        <SquareImage
          size="xxs"
          sx={{ borderRadius: '50px' }}
          src={guild.logo || ''}
        />
        <Text sx={{ fontSize: 'xss' }}>{guild.guildname}</Text>
      </Box>
    ))}
    <Box
      sx={{
        width: '20%',
        marginRight: '5%',
        marginBottom: '10px',
        borderRadius: '50px',
      }}
    >
      <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
        View All
      </Link>
    </Box>
  </Box>
);

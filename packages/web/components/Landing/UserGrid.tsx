import { Box, Link, Text } from '@metafam/ds';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { SquareImage } from 'components/SquareImage';
import { GuildFragment, Player } from 'graphql/autogen/types';
import React from 'react';
import { formatAddress } from 'utils/playerHelpers';

type Elder = {
  name: string;
  img: string;
  link: string;
};

export const UserGrid: React.FC<{
  players?: Player[];
  guilds?: GuildFragment[];
  elders?: Elder[];
  link?: string;
}> = ({ players, guilds, elders, link }) => (
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
        key={`guild-user-${i}`}
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

    {elders?.map((elder, i) => (
      <Link
        role="group"
        _hover={{ textDecoration: 'none' }}
        href={elder.link}
        sx={{
          width: '20%',
          marginRight: '5%',
          marginBottom: '10px',
        }}
      >
        <Box key={`elder-user-${i}`}>
          <SquareImage
            size="xxs"
            sx={{ borderRadius: '50px' }}
            src={elder.img || ''}
          />
          <Text sx={{ fontSize: 'xss' }}>{elder.name}</Text>
        </Box>
      </Link>
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

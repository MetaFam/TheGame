import { Box, Link, Text } from '@metafam/ds';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { SquareImage } from 'components/SquareImage';
import { GuildFragment, Player } from 'graphql/autogen/types';
import React from 'react';
import { formatAddress } from 'utils/playerHelpers';

// this will work with production DB
const whoWeAreGuilds = [
  'cr8rdao',
  'metacartelventures',
  'daohaus',
  'metafactory',
  'bloomnetwork',
  'raidguild',
  'Giveth',
];

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

    {guilds
      ?.filter((guild) => whoWeAreGuilds.includes(guild.guildname))
      ?.map((guild, i) => (
        <Link
          role="group"
          _hover={{ textDecoration: 'none' }}
          href={`guild/${guild.guildname}`}
          sx={{
            width: '20%',
            marginRight: '5%',
            marginBottom: '10px',
          }}
        >
          <Box key={`guild-user-${i}`}>
            <SquareImage
              size="xxs"
              sx={{ borderRadius: '50px' }}
              src={guild.logo || ''}
            />
            <Text sx={{ fontSize: 'xss' }}>{guild.guildname}</Text>
          </Box>
        </Link>
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

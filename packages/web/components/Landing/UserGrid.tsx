import { Box, Link, Text } from '@metafam/ds';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { RoundImage } from 'components/RoundImage';
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
          <Link
            key={`user-${i}`}
            role="group"
            _hover={{ textDecoration: 'none' }}
            href={`player/${
              player.profile?.username || player.ethereumAddress
            }`}
            sx={{
              width: '20%',
              marginRight: '5%',
              marginBottom: '10px',
            }}
          >
            <PlayerProfilePicture
              {...{ player }}
              round={true}
              size="xxs"
              sx={{ borderRadius: '50%' }}
            />
            <Text sx={{ fontSize: 'xs' }}>
              {player.profile?.name || formatAddress(player.ethereumAddress)}
            </Text>
          </Link>
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
            <RoundImage size="xxs" src={guild.logo || ''} />
            <Text sx={{ fontSize: 'xs' }}>{guild.guildname}</Text>
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
          <RoundImage size="xxs" src={elder.img || ''} />
          <Text sx={{ fontSize: 'xs' }}>{elder.name}</Text>
        </Box>
      </Link>
    ))}
    <Box
      sx={{
        width: '20%',
        marginRight: '5%',
        marginBottom: '10px',
        borderRadius: '50%',
      }}
    >
      <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
        <Text
          sx={{
            border: '2px solid whiteAlpha.400',
            borderRadius: '50%',
            color: '#E839B7',
            display: 'flex',
          }}
          size="sm"
        >
          see all
        </Text>
      </Link>
    </Box>
  </Box>
);

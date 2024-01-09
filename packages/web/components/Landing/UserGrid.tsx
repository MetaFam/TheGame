import { Box, Link, Text } from '@metafam/ds';
import { PlayerProfilePictureRound } from 'components/Player/PlayerProfilePictureRound';
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
    mt="15px"
  >
    {players?.length
      ? players?.map((player, i) => (
          <Link
            key={`user-${i}`}
            role="group"
            _hover={{
              textDecoration: 'none',
              color: '#E839B7',
              fontWeight: 'semibold',
            }}
            href={`player/${
              player.profile?.username || player.ethereumAddress
            }`}
            sx={{
              width: '20%',
              marginRight: '5%',
              marginBottom: '10px',
              textAlign: 'center',
            }}
        
          >
            <PlayerProfilePictureRound {...{ player }} size="xxs" />
            <Text sx={{ fontSize: 'xs' }} noOfLines={1}>
              {player.profile?.name || formatAddress(player.ethereumAddress)}
            </Text>
          </Link>
        ))
      : ''}

    {guilds
      ?.filter((guild) => whoWeAreGuilds.includes(guild.guildname))
      ?.map((guild, i) => (
        <Link
          key={`guild-${i}`}
          role="group"
          _hover={{
            textDecoration: 'none',
            color: '#E839B7',
            fontWeight: 'semibold',
          }}
          href={`guild/${guild.guildname}`}
          sx={{
            width: '20%',
            marginRight: '5%',
            marginBottom: '10px',
          }}
        >
          <Box key={`guild-user-${i}`} textAlign="center" width="2.8em">
            <RoundImage size="xxs" src={guild.logo || ''} />
            <Text sx={{ fontSize: 'xs' }} noOfLines={1}>
              {guild.guildname}
            </Text>
          </Box>
        </Link>
      ))}

    {elders?.map((elder, i) => (
      <Link
        key={`elder-${i}`}
        role="group"
        _hover={{
          textDecoration: 'none',
          color: '#E839B7',
          fontWeight: 'semibold',
        }}
        href={elder.link}
        sx={{
          width: '20%',
          marginRight: '5%',
          marginBottom: '10px',
        }}
      >
        <Box key={`elder-user-${i}`} textAlign="center" width="2.8em">
          <RoundImage size="xxs" src={elder.img || ''} />
          <Text sx={{ fontSize: 'xs' }} noOfLines={1}>
            {elder.name}
          </Text>
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
      <Link
        role="group"
        borderRadius="50%"
        _hover={{ textDecoration: 'none' }}
        href={link}
      >
        <Box
          height="2.8em"
          width="2.8em"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="2px"
          borderRadius="50%"
          borderColor="whiteAlpha.400"
          _hover={{ bgGradient: 'linear(to-r, #7900FD, #FC01FC)' }}
        >
          <Box
            height="full"
            width="full"
            as="button"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            px="8px"
            borderRadius="50%"
            fontSize={{ base: "7px", lg: "14px"}}
            fontWeight="semibold"
            borderColor="whiteAlpha.400"
            color="#E839B7"
            bg="#1B0D2A"
          >
            more
          </Box>
        </Box>
      </Link>
    </Box>
  </Box>
);

import {
  Avatar,
  Box,
  Heading,
  MetaButton,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guild: GuildFragmentFragment;
};

export const GuildTile: React.FC<Props> = ({ guild }) => (
  <MetaTile>
    <MetaTileHeader>
      <MetaLink
        as={`/guild/${guild.guildname}`}
        href="/guild/[guildname]"
        key={guild.id}
      >
        <VStack>
          {guild.logo ? (
            <Avatar size="xl" src={guild.logo} name={guild.name} />
          ) : null}

          <Heading size="sm" color="white">
            {guild.name}
          </Heading>
        </VStack>
      </MetaLink>
      {guild.type ? (
        <Box align="center" mt={0}>
          <MetaTag size="md">{guild.type} GUILD</MetaTag>
        </Box>
      ) : null}
      {guild.position ? (
        <Box align="center" mt={0}>
          <MetaTag size="md">{guild.position} GUILD</MetaTag>
        </Box>
      ) : null}
      {guild.description ? (
        <VStack spacing={2} align="stretch">
          <Text textStyle="caption">ABOUT</Text>
          <Text fontSize="sm">{guild.description}</Text>
        </VStack>
      ) : null}
    </MetaTileHeader>
    <MetaTileBody>
      {guild.join_button_url ? (
        <MetaButton
          as="a"
          href={guild.join_button_url}
          target="_blank"
          fontFamily="mono"
        >
          Join
        </MetaButton>
      ) : null}
    </MetaTileBody>
  </MetaTile>
);

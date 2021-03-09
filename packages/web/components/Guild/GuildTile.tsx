import {
  Avatar,
  Box,
  Heading,
  HStack,
  MetaButton,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { GuildLinks } from 'components/Guild/GuildLinks';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guild: GuildFragmentFragment;
};

export const GuildTile: React.FC<Props> = ({ guild }) => (
  <MetaTile key={guild.id}>
    <MetaTileHeader>
      <VStack>
        {guild.logo ? (
          <Avatar size="xl" src={guild.logo} name={guild.name} />
        ) : null}

        <Heading size="sm" color="white">
          {guild.name}
        </Heading>
      </VStack>
      {guild.type ? (
        <Box align="center">
          <MetaTag size="md">{guild.type} GUILD</MetaTag>
        </Box>
      ) : null}
      {guild.description ? (
        <VStack spacing={2} align="stretch">
          <Text fontFamily="mono" fontSize="sm" color="blueLight">
            ABOUT
          </Text>
          <Text fontSize="sm">{guild.description}</Text>
        </VStack>
      ) : null}
    </MetaTileHeader>
    <MetaTileBody>
      <VStack spacing={2} align="stretch">
        <Text fontFamily="mono" fontSize="sm" color="blueLight">
          LINKS
        </Text>
        <HStack mt="2">
          <GuildLinks guild={guild} />
        </HStack>
      </VStack>
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

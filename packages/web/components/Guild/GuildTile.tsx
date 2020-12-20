import {
  Avatar,
  Flex,
  Heading,
  HStack,
  MetaButton,
  MetaTag,
  Text,
  VStack,
  Wrap,
} from '@metafam/ds';
import { GuildLinks } from 'components/Guild/GuildLinks';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guild: GuildFragmentFragment;
};

export const GuildTile: React.FC<Props> = ({ guild }) => (
  <Flex
    direction="column"
    key={guild.id}
    bg="whiteAlpha.200"
    style={{ backdropFilter: 'blur(7px)' }}
    rounded="lg"
    p="6"
    maxW="30rem"
    w="100%"
    align="stretch"
    position="relative"
    overflow="hidden"
    justify="space-between"
  >
    <VStack w="100%" spacing="6" align="stretch" mb={6} position="relative">
      <VStack>
        {guild.logo ? (
          <Avatar size="xl" src={guild.logo} name={guild.name} />
        ) : null}

        <Heading size="sm" color="white">
          {guild.name}
        </Heading>
      </VStack>
      <Wrap w="100%" justify="center">
        {guild.type ? <MetaTag size="md">{guild.type} GUILD</MetaTag> : null}
      </Wrap>
      {guild.description ? (
        <VStack spacing={2} align="stretch">
          <Text fontFamily="mono" fontSize="sm" color="blueLight">
            ABOUT
          </Text>
          <Text fontSize="sm">{guild.description}</Text>
        </VStack>
      ) : null}
    </VStack>
    <VStack w="100%" spacing="6" align="stretch">
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
    </VStack>
  </Flex>
);

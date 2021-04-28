import { Avatar, Box, MetaButton, Text, VStack } from '@metafam/ds';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../ProfileSection';
import { GuildLinks } from './GuildLinks';

type Props = { guild: GuildFragmentFragment };

export const GuildHero: React.FC<Props> = ({ guild }) => (
  <ProfileSection>
    <VStack spacing={8}>
      {guild.logo ? (
        <Avatar
          w={{ base: '32', md: '56' }}
          h={{ base: '32', md: '56' }}
          src={guild.logo}
          name={guild.name}
        />
      ) : null}
      <Box textAlign="center">
        <Text fontSize="xl" fontFamily="heading" mb="1">
          {guild.name}
        </Text>
        <Text fontFamily="mono" fontSize="md" color="blueLight">
          {`${guild.type} GUILD`}
        </Text>
      </Box>
      <Box>
        <Text>{guild.description}</Text>
      </Box>
      {guild.join_button_url ? (
        <MetaButton as="a" href={guild.join_button_url} target="_blank">
          Join
        </MetaButton>
      ) : null}
      <GuildLinks guild={guild} />
    </VStack>
  </ProfileSection>
);

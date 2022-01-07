import { Avatar, Box, MetaButton, Text, VStack } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

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
        <Text fontSize="md" color="blueLight">
          {`${guild.type} GUILD`}
        </Text>
        <Text fontSize="md">{`${guild.position} GUILD`}</Text>
      </Box>
      <Box>
        <Text>{guild.description}</Text>
      </Box>
      {guild.join_button_url ? (
        <MetaButton as="a" href={guild.join_button_url} target="_blank">
          Join
        </MetaButton>
      ) : null}
    </VStack>
  </ProfileSection>
);

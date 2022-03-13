import {
  Avatar,
  Box,
  EditIcon,
  IconButton,
  Link,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guild: GuildFragment;
  canEdit: boolean;
};

export const GuildHero: React.FC<Props> = ({ guild, canEdit }) => (
  <ProfileSection>
    {canEdit && (
      <Box pos="absolute" right={3} top={3}>
        <Link
          _hover={{ textDecoration: 'none' }}
          href={`/guild/${guild.guildname}/edit`}
        >
          <IconButton
            _focus={{ boxShadow: 'none' }}
            variant="outline"
            borderWidth={2}
            aria-label="Edit Profile Info"
            size="lg"
            borderColor="pinkShadeOne"
            bg="rgba(17, 17, 17, 0.9)"
            color="pinkShadeOne"
            _hover={{ color: 'white', borderColor: 'white' }}
            icon={<EditIcon />}
            isRound
            _active={{
              transform: 'scale(0.8)',
              backgroundColor: 'transparent',
            }}
          />
        </Link>
      </Box>
    )}
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
      {guild.joinButtonUrl ? (
        <MetaButton as="a" href={guild.joinButtonUrl} target="_blank">
          Join
        </MetaButton>
      ) : null}
    </VStack>
  </ProfileSection>
);

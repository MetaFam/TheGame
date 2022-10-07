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
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  GuildFragment,
  useGetAdministeredGuildsQuery,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useMemo } from 'react';
import { BoxTypes } from 'utils/boxTypes';
import { optimizedImage } from 'utils/imageHelpers';

type Props = {
  guild: GuildFragment;
  editing: boolean;
};

export const GuildHero: React.FC<Props> = ({ guild, editing }) => {
  const { user } = useUser();
  const [
    { data: administeredGuildsData, fetching: loadingAdministeredGuilds },
  ] = useGetAdministeredGuildsQuery({
    variables: { id: user?.id },
  });
  const administeredGuilds = administeredGuildsData?.guild_metadata;

  const canAdministerGuild = useMemo(
    () =>
      !!user &&
      !loadingAdministeredGuilds &&
      !!administeredGuilds &&
      administeredGuilds.some(
        (guildMetadata) => guildMetadata.guildId === guild?.id,
      ),
    [user, loadingAdministeredGuilds, administeredGuilds, guild],
  );

  return (
    <ProfileSection editing={editing} type={BoxTypes.GUILD_HERO}>
      {canAdministerGuild && !editing && (
        <Box pos="absolute" right={2} top={2}>
          <Link
            _hover={{ textDecoration: 'none' }}
            href={`/guild/${guild.guildname}/edit`}
          >
            <IconButton
              aria-label="Edit Profile Info"
              size="lg"
              background="transparent"
              color="pinkShadeOne"
              icon={<EditIcon />}
              _hover={{ color: 'white' }}
              _focus={{ boxShadow: 'none' }}
              _active={{ transform: 'scale(0.8)' }}
              isRound
            />
          </Link>
        </Box>
      )}
      <VStack spacing={8}>
        {guild.logo ? (
          <Avatar
            w={{ base: '32', md: '56' }}
            h={{ base: '32', md: '56' }}
            src={optimizedImage('logoURL', guild.logo)}
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
};

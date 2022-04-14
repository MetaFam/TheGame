import { Box, LoadingState, Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { useGetGuildAnnouncementsQuery } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guildId: string;
};

export const GuildAnnouncements: React.FC<Props> = ({ guildId }) => {
  const [getGuildAnnouncementsResponse] = useGetGuildAnnouncementsQuery({
    variables: { guildId },
  });

  const announcements =
    getGuildAnnouncementsResponse.data?.guild[0].discordAnnouncements;

  return (
    <ProfileSection title="Announcements">
      {getGuildAnnouncementsResponse.fetching && <LoadingState />}
      {getGuildAnnouncementsResponse.error && (
        <Text>Could not fetch announcements. 😥</Text>
      )}
      {announcements?.length === 0 && <Text>No announcements.</Text>}
      {announcements?.map((item, index) => (
        <Box
          key={index}
          mb={4}
          p={6}
          backgroundColor="blackAlpha.300"
          borderRadius="md"
        >
          <Text key={index} dangerouslySetInnerHTML={{ __html: item }} mb={5} />
        </Box>
      ))}
    </ProfileSection>
  );
};

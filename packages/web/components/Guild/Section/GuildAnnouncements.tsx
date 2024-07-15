import {
  Box,
  LoadingState,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import React, { useState } from 'react';

import { ProfileSection } from '#components/Section/ProfileSection';
import {
  GuildFragment,
  useGetGuildAnnouncementsQuery,
} from '#graphql/autogen/hasura-sdk';
import { BoxTypes } from '#utils/boxTypes';

type Props = {
  guild: GuildFragment;
  editing: boolean;
};

export const GuildAnnouncements: React.FC<Props> = ({
  guild: { id: guildId },
  editing,
}) => {
  const [{ fetching, data, error }] = useGetGuildAnnouncementsQuery({
    variables: { guildId },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const announcements = data?.guild[0].discordAnnouncements;

  return (
    <ProfileSection
      title="Announcements"
      type={BoxTypes.GUILD_ANNOUNCEMENTS}
      editing={editing}
    >
      {fetching && <LoadingState />}
      {error && !fetching && (
        <Text mb={4}>Could not fetch announcements. 😥</Text>
      )}
      {!fetching && !error && (
        <>
          {!announcements?.length ? (
            <Text mb={4}>No announcements.</Text>
          ) : (
            <VStack w="100%" align="stretch" spacing={4}>
              {announcements?.slice(0, 2).map((item, index) => (
                <GuildAnnouncement key={index} announcementHtml={item} />
              ))}
            </VStack>
          )}
          {announcements != null && announcements.length > 2 && (
            <Text
              as="span"
              fontSize="xs"
              color="cyanText"
              cursor="pointer"
              onClick={onOpen}
              mb={4}
            >
              View all ({announcements.length})
            </Text>
          )}
          <GuildAnnouncementsModal
            announcements={announcements}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      )}
    </ProfileSection>
  );
};

type GuildAnnouncementModalProps = {
  announcements: string[] | null | undefined;
  isOpen: boolean;
  onClose: () => void;
};

const GuildAnnouncementsModal: React.FC<GuildAnnouncementModalProps> = ({
  announcements,
  isOpen,
  onClose,
}) => {
  const css = {
    ul: {
      marginLeft: 4,
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Announcements</ModalHeader>
          <ModalCloseButton />

          <ModalBody px={2}>
            <VStack w="100%" align="stretch" spacing={4}>
              {announcements?.map((item, index) => (
                <Box
                  key={index}
                  p={6}
                  backgroundColor="whiteAlpha.200"
                  sx={{ backdropFilter: 'blur(7px)' }}
                  borderRadius="md"
                  color="white"
                >
                  <Text
                    sx={css}
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

const MAX_ANNOUNCEMENT_LENGTH = 240;

type GuildAnnouncementProps = {
  announcementHtml: string;
};

const GuildAnnouncement: React.FC<GuildAnnouncementProps> = ({
  announcementHtml,
}) => {
  const [expanded, setExpanded] = useState(false);

  const doTruncate = (announcementHtml.length ?? 0) > MAX_ANNOUNCEMENT_LENGTH;
  const displayAnnouncement = doTruncate
    ? `${announcementHtml.substring(0, MAX_ANNOUNCEMENT_LENGTH - 9)}…`
    : announcementHtml;

  return (
    <Box p={6} backgroundColor="blackAlpha.300" borderRadius="md">
      <Text
        dangerouslySetInnerHTML={{
          __html: expanded ? announcementHtml : displayAnnouncement,
        }}
      />
      {doTruncate && (
        <Text
          as="span"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'View less -' : 'View more +'}
        </Text>
      )}
    </Box>
  );
};

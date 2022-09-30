import {
  Box,
  Flex,
  HStack,
  LoadingState,
  Modal,
  ModalCloseButton,
  ModalContent,
  modalContentStyles,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { useGetGuildAnnouncementsQuery } from 'graphql/autogen/types';
import React, { useState } from 'react';

type Props = {
  guildId: string;
};

export const GuildAnnouncements: React.FC<Props> = ({ guildId }) => {
  const [getGuildAnnouncementsResponse] = useGetGuildAnnouncementsQuery({
    variables: { guildId },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const announcements =
    getGuildAnnouncementsResponse.data?.guild[0].discordAnnouncements;

  return (
    <ProfileSection title="Announcements">
      {getGuildAnnouncementsResponse.fetching && <LoadingState />}
      {getGuildAnnouncementsResponse.error && (
        <Text>Could not fetch announcements. 😥</Text>
      )}
      {announcements?.length === 0 && <Text>No announcements.</Text>}
      {announcements?.slice(0, 2).map((item, index) => (
        <GuildAnnouncement key={index} announcementHtml={item} />
      ))}
      {announcements != null && announcements.length > 2 && (
        <Text
          as="span"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={onOpen}
        >
          View all ({announcements.length})
        </Text>
      )}
      <GuildAnnouncementsModal
        announcements={announcements}
        isOpen={isOpen}
        onClose={onClose}
      />
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay>
        <ModalContent maxW="6xl" bg="none">
          <Box bg="purple80" borderTopRadius="lg" p={4} w="100%">
            <HStack>
              <Text
                fontSize="md"
                fontWeight="bold"
                color="blueLight"
                as="div"
                mr="auto"
              >
                Announcements
              </Text>
              <ModalCloseButton color="blueLight" />
            </HStack>
          </Box>

          <Flex p={2} css={modalContentStyles}>
            {/* TODO extract this into design-system */}
            <Box
              overflowY="scroll"
              overflowX="hidden"
              maxH="80vh"
              borderBottomRadius="lg"
              w="100%"
              color="white"
              p={4}
              css={{
                scrollbarColor: 'rgba(70,20,100,0.8) rgba(255,255,255,0)',
                '::-webkit-scrollbar': {
                  width: '8px',
                  background: 'none',
                },
                '::-webkit-scrollbar-thumb': {
                  background: 'rgba(70,20,100,0.8)',
                  borderRadius: '999px',
                },
              }}
            >
              {announcements?.map((item, index) => (
                <Box
                  key={index}
                  mb={4}
                  p={6}
                  backgroundColor="whiteAlpha.200"
                  borderRadius="md"
                >
                  <Text
                    sx={css}
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                    mb={5}
                  />
                </Box>
              ))}
            </Box>
          </Flex>
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
    <Box mb={4} p={6} backgroundColor="blackAlpha.300" borderRadius="md">
      <Text
        dangerouslySetInnerHTML={{
          __html: expanded ? announcementHtml : displayAnnouncement,
        }}
        mb={5}
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

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
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { getGuildPlayers } from 'graphql/queries/guild';
import { GuildPlayer } from 'graphql/types';
import React, { useEffect, useState } from 'react';

import { GuildPlayerComponent } from './GuildPlayer';

type Props = {
  guildId: string;
  guildname: string;
};

export const GuildPlayers: React.FC<Props> = ({ guildId, guildname }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [guildPlayers, setGuildPlayers] = useState<GuildPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuildPlayers(guildId, guildname === 'metafam').then((players) => {
      setLoading(false);
      setGuildPlayers(players);
    });
  }, [guildId, guildname]);

  const GuildMembers = () =>
    guildPlayers == null || guildPlayers.length === 0 ? (
      <p>No known players yet.</p>
    ) : (
      <>
        {guildPlayers.slice(0, 4).map((player) => (
          <GuildPlayerComponent key={player.ethereumAddress} {...{ player }} />
        ))}

        {guildPlayers.length > 4 && (
          <Text
            as="span"
            fontSize="xs"
            color="cyanText"
            cursor="pointer"
            onClick={onOpen}
          >
            View all ({guildPlayers.length})
          </Text>
        )}

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          scrollBehavior="inside"
        >
          <ModalOverlay>
            <ModalContent maxW="6xl" bg="none">
              <Box bg="purple80" borderTopRadius="lg" p={4} w="100%">
                <HStack>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    color="blueLight"
                    as="div"
                    mr="auto"
                  >
                    Players
                  </Text>
                  <ModalCloseButton color="blueLight" />
                </HStack>
              </Box>

              <Flex p={2} css={modalContentStyles}>
                <Box
                  overflowY="scroll"
                  overflowX="hidden"
                  maxH="80vh"
                  borderBottomRadius="lg"
                  w="100%"
                  color="white"
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
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={6}
                    padding={6}
                    boxShadow="md"
                  >
                    {guildPlayers.map((player) => (
                      <GuildPlayerComponent
                        key={player.ethereumAddress}
                        {...{ player }}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </Flex>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </>
    );

  return (
    <ProfileSection title="Players">
      {loading ? <LoadingState /> : <GuildMembers />}
    </ProfileSection>
  );
};

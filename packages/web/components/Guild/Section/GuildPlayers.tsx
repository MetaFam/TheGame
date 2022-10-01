import {
  LoadingState,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Players</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
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
              </ModalBody>
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

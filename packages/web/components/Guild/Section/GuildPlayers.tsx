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
import React, { useEffect, useState } from 'react';

import { ProfileSection } from '#components/Section/ProfileSection';
import { GuildFragment } from '#graphql/autogen/hasura-sdk';
import { getGuildPlayers } from '#graphql/queries/guild';
import { GuildPlayer } from '#graphql/types';
import { BoxTypes } from '#utils/boxTypes';

import { GuildPlayerComponent } from './GuildPlayer';

type Props = {
  guild: GuildFragment;
  editing: boolean;
};

export const GuildPlayers: React.FC<Props> = ({
  guild: { id: guildId, guildname },
  editing,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [guildPlayers, setGuildPlayers] = useState<GuildPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuildPlayers(guildId, guildname === 'metafam').then((players) => {
      setLoading(false);
      setGuildPlayers(players ?? []);
    });
  }, [guildId, guildname]);

  const GuildMembers = () =>
    guildPlayers == null || guildPlayers.length === 0 ? (
      <Text mb={4}>No known players yet.</Text>
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
            mb={4}
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
    <ProfileSection
      title="Players"
      type={BoxTypes.GUILD_PLAYERS}
      editing={editing}
    >
      {loading ? <LoadingState /> : <GuildMembers />}
    </ProfileSection>
  );
};

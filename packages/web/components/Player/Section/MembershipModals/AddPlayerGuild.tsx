import {
  AddIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@metafam/ds';
import { UnverifiedGuildForm } from 'components/Guild/UnverifiedGuildForm';
import { GuildSearchBar } from 'components/GuildSearchBar';
import { Player, useAddUnverifiedGuildMutation } from 'graphql/autogen/types';
import React from 'react';

export const AddPlayerGuild: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  hydratePlayer: () => void;
}> = ({ isOpen, onClose, player, hydratePlayer }) => {
  const [addUnverifiedGuildView, setAddUnverifiedGuildView] =
    React.useState(false);
  const [, addUnverifiedGuild] = useAddUnverifiedGuildMutation();

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add Guild Membership
          <Text
            fontStyle="italic"
            color="gray.400"
            textAlign="center"
            fontSize="md"
            mt={3}
            mb={10}
          >
            {addUnverifiedGuildView ? 'Create new Guild' : 'Search for a Guild'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={[0, 6]}>
          {addUnverifiedGuildView ? (
            <UnverifiedGuildForm
              onSubmit={addUnverifiedGuild}
              {...{ player, hydratePlayer }}
            />
          ) : (
            <GuildSearchBar player={player} />
          )}

          {!addUnverifiedGuildView && (
            <Button
              variant="outline"
              w={{ base: '50%', lg: '20%' }}
              mt={6}
              ml={{ base: '20%', lg: '40%' }}
              leftIcon={<AddIcon />}
              onClick={() => setAddUnverifiedGuildView(true)}
            >
              Add New Guild
            </Button>
          )}
        </ModalBody>
        <ModalFooter mt={6} justifyContent="center">
          <Button
            variant="ghost"
            onClick={onClose}
            color="landing450"
            _hover={{ bg: '#FFFFFF11' }}
            _active={{ bg: '#FF000011' }}
          >
            Go Back to Profile
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

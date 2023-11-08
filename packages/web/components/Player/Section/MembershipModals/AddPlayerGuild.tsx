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
}> = ({ isOpen, onClose, player }) => {
  const [addUnverifiedGuildView, setAddUnverifiedGuildView] =
    React.useState(false);

  const [, addUnverifiedGuild] = useAddUnverifiedGuildMutation();

  return (
    <Modal {...{ isOpen, onClose }} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <>
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
              {addUnverifiedGuildView
                ? 'Create new guild'
                : 'Search for a Guild'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={[0, 6]}>
            {addUnverifiedGuildView ? (
              <UnverifiedGuildForm onSubmit={addUnverifiedGuild} />
            ) : (
              <GuildSearchBar player={player} />
            )}
          </ModalBody>

          {!addUnverifiedGuildView && (
            <Button
              variant="outline"
              w="20%"
              ml="40%"
              leftIcon={<AddIcon />}
              onClick={() => setAddUnverifiedGuildView(true)}
            >
              Add New Guild
            </Button>
          )}
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
        </>
      </ModalContent>
    </Modal>
  );
};

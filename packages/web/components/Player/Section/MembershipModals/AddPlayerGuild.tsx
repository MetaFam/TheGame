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
import {
  AddUnverifiedGuildMutation,
  Player,
  useAddUnverifiedGuildMutation,
} from 'graphql/autogen/types';
import React, { useState } from 'react';
import { CombinedError } from 'urql';

export type NewUnverifiedGuild = {
  error?: CombinedError;
  data?: AddUnverifiedGuildMutation;
};

export const AddPlayerGuild: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  hydratePlayer: () => void;
}> = ({ isOpen, onClose, player, hydratePlayer }) => {
  const [showGuildForm, setShowGuildForm] = useState(false);
  const [, addUnverifiedGuild] = useAddUnverifiedGuildMutation();

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {showGuildForm ? 'Create New Guild' : 'Search for a Guild'}
          <Text
            fontStyle="italic"
            color="gray.400"
            textAlign="center"
            fontSize="md"
            mt={3}
            mb={10}
          >
            Add Guild Membership
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={[0, 6]}>
          {showGuildForm ? (
            <UnverifiedGuildForm
              onSubmit={async (...args) => {
                const ret = await addUnverifiedGuild(...args);
                if (!ret.error) onClose();
                return ret;
              }}
              {...{ player, hydratePlayer }}
            />
          ) : (
            <GuildSearchBar {...{ player }} />
          )}

          {!showGuildForm && (
            <Button
              variant="outline"
              w={{ base: '50%', lg: '20%' }}
              mt={6}
              ml={{ base: '20%', lg: '40%' }}
              leftIcon={<AddIcon />}
              onClick={() => setShowGuildForm(true)}
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

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
import { GuildSearchBar } from 'components/GuildSearchBar';
import { Player } from 'graphql/autogen/types';
import React from 'react';

export const AddPlayerGuild: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  player: Player;
}> = ({ isOpen, onClose, player }) => (
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
          Search for a Guild
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody p={[0, 6]}>
        <GuildSearchBar player={player} />
      </ModalBody>
      <Button variant="outline" w="20%" ml="40%" leftIcon={<AddIcon />}>
        Add New Guild
      </Button>
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

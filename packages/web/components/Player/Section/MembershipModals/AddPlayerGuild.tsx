import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { GuildSearchBar } from 'components/GuildSearchBar';
import React from 'react';

export const AddPlayerGuild: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => (
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
          Search For Guild
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody p={[0, 6]}>
        <GuildSearchBar />
      </ModalBody>
      <Button w="50%" ml="25%">
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

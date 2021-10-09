import {
  Box,
  Button,
  EditIcon,
  HStack,
  IconButton,
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
import React from 'react';
import { FaTimes } from 'react-icons/fa';

export type ProfileSectionProps = {
  title?: string;
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  canEdit?: boolean;
  displayEditButton?: boolean;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  title,
  onRemoveClick,
  canEdit,
  displayEditButton,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minW="72">
      {title ? (
        <Box bg="purpleProfileSection" borderTopRadius="lg" pt={5} pb={5}>
          <HStack height={5} pr={4} pl={8}>
            <Text fontSize="md" color="blueLight" as="div" mr="auto">
              {title.toUpperCase()}
            </Text>
            {displayEditButton ? (
              <IconButton
                aria-label="Edit Profile Info"
                size="lg"
                background="transparent"
                color="#A426A4"
                icon={<EditIcon />}
                _hover={{ color: 'white' }}
                onClick={onOpen}
                isRound
              />
            ) : null}
            {canEdit ? (
              <FaTimes
                color="blueLight"
                opacity="0.4"
                cursor="pointer"
                onClick={onRemoveClick}
              />
            ) : null}
          </HStack>
        </Box>
      ) : null}
      <Box
        bg="blueProfileSection"
        borderBottomRadius="lg"
        borderTopRadius={!title ? 'lg' : 0}
        p={8}
        boxShadow="md"
        css={{ backdropFilter: 'blur(8px)' }}
      >
        {children}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>LOL</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

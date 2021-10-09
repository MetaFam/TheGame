import {
  Box,
  EditIcon,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BOX_TYPE } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  displayEditButton?: boolean;
  canEdit?: boolean;
  boxType?: string;
  title?: string;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  onRemoveClick,
  displayEditButton,
  canEdit,
  boxType,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minW="72">
      {title ? (
        <Box bg="purpleProfileSection" borderTopRadius="lg" pt={5} pb={5}>
          <HStack height={5} pr={4} pl={8}>
            <Text
              fontSize="md"
              color="blueLight"
              as="div"
              mr="auto"
              fontWeight={600}
            >
              {title.toUpperCase()}
            </Text>
            {displayEditButton ? (
              <IconButton
                aria-label="Edit Profile Info"
                size="lg"
                background="transparent"
                color="pinkShadeOne"
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
      {canEdit && boxType && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            maxW="80%"
            backgroundImage={`url(${BackgroundImage})`}
            p={6}
          >
            <ModalHeader
              color="white"
              fontSize="4xl"
              alignSelf="center"
              fontWeight="normal"
            >
              {title}
            </ModalHeader>
            <ModalCloseButton color="pinkShadeOne" size="xl" m={4} />
            <ModalBody>{getBox(boxType, onClose)}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

const getBox = (boxType: string, onClose: () => void): React.ReactNode => {
  switch (boxType) {
    case BOX_TYPE.PLAYER_TYPE:
      return <SetupPlayerType isEdit onClose={onClose} />;
    default:
      return <SetupPlayerType isEdit onClose={onClose} />;
  }
};

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
import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupSkills } from 'components/Setup/SetupSkills';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxType } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  boxType?: BoxType;
  title?: string;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  onRemoveClick,
  isOwnProfile,
  canEdit,
  boxType,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minW="72" pos="relative" w="100%" h="100%">
      {title && (
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
            {(
              isOwnProfile &&
              !canEdit &&
              boxType &&
              isBoxDataEditable(boxType)
            ) && (
              <IconButton
                aria-label="Edit Profile Info"
                size="lg"
                background="transparent"
                color="pinkShadeOne"
                icon={<EditIcon />}
                _hover={{ color: 'white' }}
                onClick={onOpen}
                _focus={{
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
                _active={{
                  transform: 'scale(0.8)',
                  backgroundColor: 'transparent',
                }}
                isRound
              />
            )}
          </HStack>
        </Box>
      )}
      <Box
        bg="blueProfileSection"
        borderBottomRadius="lg"
        borderTopRadius={!title ? 'lg' : 0}
        p={boxType === BoxType.EMBEDDED_URL ? 0 : 8}
        boxShadow="md"
        css={{ backdropFilter: 'blur(8px)' }}
        w="100%"
        h="100%"
        pos="relative"
        pointerEvents={canEdit ? 'none' : 'initial'}
      >
        {children}
        {canEdit && (
          <Box
            w="100%"
            h="100%"
            bg="purpleTag50"
            pos="absolute"
            top="0"
            left="0"
          />
        )}
      </Box>
      {canEdit && boxType && boxType !== BoxType.PLAYER_HERO ? (
        <IconButton
          aria-label="Edit Profile Info"
          size="lg"
          pos="absolute"
          top="0"
          right="0"
          background="transparent"
          color="pinkShadeOne"
          icon={<FaTimes />}
          _hover={{ color: 'white' }}
          onClick={onRemoveClick}
          _focus={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
          }}
          _active={{
            transform: 'scale(0.8)',
            backgroundColor: 'transparent',
          }}
          isRound
        />
      ) : null}
      {boxType && (
        <Modal {...{ isOpen, onClose }}>
          <ModalOverlay />
          <ModalContent
            maxW="80%"
            backgroundImage={`url(${BackgroundImage})`}
            bgSize="cover"
            bgAttachment="fixed"
            p={[4, 8, 12]}
          >
            <ModalHeader
              color="white"
              fontSize="4xl"
              alignSelf="center"
              fontWeight="normal"
            >
              {title}
            </ModalHeader>
            <ModalCloseButton
              color="pinkShadeOne"
              size="xl"
              p={4}
              _focus={{ boxShadow: 'none' }}
            />
            <ModalBody>
              <EditSectionBox {...{ boxType, onClose }} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

const isBoxDataEditable = (boxType: BoxType) => (
  [
    BoxType.PLAYER_TYPE,
    BoxType.PLAYER_COLOR_DISPOSITION,
    BoxType.PLAYER_SKILLS,
  ].includes(boxType)
);

const EditSectionBox = ({
  boxType,
  onClose,
}: {
  boxType: string;
  onClose: () => void;
}) => {
  switch (boxType) {
    case BOX_TYPE.PLAYER.TYPE: {
      return <SetupPlayerType isEdit {...{ onClose }} />;
    }
    case BOX_TYPE.PLAYER.COLOR_DISPOSITION: {
      return <SetupPersonalityType isEdit {...{ onClose }} />;
    }
    case BOX_TYPE.PLAYER.SKILLS: {
      return <SetupSkills isEdit {...{ onClose }} />;
    }
    default:
  }
  return <></>;
};

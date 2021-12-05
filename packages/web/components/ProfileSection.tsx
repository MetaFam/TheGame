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
import { BOX_TYPE } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  onRemoveClick?: () => void;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  boxType?: string;
  title?: string;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
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
    <Box minW="72" pos="relative">
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
            {isOwnProfile ? (
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
      {boxType && (
        <Modal isOpen={isOpen} onClose={onClose}>
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
              _focus={{
                boxShadow: 'none',
              }}
            />
            <ModalBody>{getEditSectionBox(boxType, onClose)}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

const getEditSectionBox = (
  boxType: string,
  onClose: () => void,
): React.ReactNode => {
  switch (boxType) {
    case BOX_TYPE.PLAYER.TYPE:
      return <SetupPlayerType isEdit onClose={onClose} />;
    case BOX_TYPE.PLAYER.COLOR_DISPOSITION:
      return <SetupPersonalityType isEdit onClose={onClose} />;
    case BOX_TYPE.PLAYER.SKILLS:
      return <SetupSkills isEdit onClose={onClose} />;
    default:
      return <></>;
  }
};

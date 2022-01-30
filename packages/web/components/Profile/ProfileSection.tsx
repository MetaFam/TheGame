import {
  Box,
  Button,
  EditIcon,
  Flex,
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
import { BoxType } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  boxType?: BoxType;
  title?: string;
  withoutBG?: boolean;
  customModalText?: string;
  customModalTitle?: string;
  customModal?: React.ReactNode;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  children,
  isOwnProfile,
  canEdit,
  boxType,
  title,
  withoutBG = false,
  customModalText,
  customModal,
  customModalTitle,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      minW="min(var(--chakra-sizes-72), calc(100vw - 3rem))"
      pos="relative"
      w="100%"
      h="auto"
      direction="column"
    >
      {title && (
        <Box bg="purpleProfileSection" borderTopRadius="lg" pt={5} pb={5}>
          <HStack h={5} pr={4} pl={8}>
            <Text
              fontSize="md"
              color="blueLight"
              as="div"
              mr="auto"
              fontWeight={600}
              casing="uppercase"
            >
              {title}
            </Text>
            {!customModal &&
              isOwnProfile &&
              !canEdit &&
              boxType &&
              isBoxDataEditable(boxType) && (
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
            {customModal && customModalText && (
              <Button
                color="pinkShadeOne"
                background="transparent"
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
              >
                {customModalText}
              </Button>
            )}
          </HStack>
        </Box>
      )}
      <Box
        bg={withoutBG ? 'none' : 'blueProfileSection'}
        borderBottomRadius="lg"
        borderTopRadius={!title ? 'lg' : 0}
        p={boxType === BoxType.EMBEDDED_URL ? 0 : 8}
        boxShadow="md"
        css={{ backdropFilter: 'blur(8px)' }}
        w="100%"
        pos="relative"
        pointerEvents={canEdit ? 'none' : 'initial'}
      >
        {children}
      </Box>
      {boxType && (
        <Modal {...{ isOpen, onClose }}>
          <ModalOverlay />
          <ModalContent
            maxW="80%"
            maxH="80%"
            backgroundImage={`url(${BackgroundImage})`}
            bgSize="cover"
            overflow="hidden"
            bgAttachment="fixed"
            p={[4, 8, 12]}
          >
            <ModalHeader
              color="white"
              fontSize="4xl"
              alignSelf="center"
              fontWeight="normal"
            >
              {customModalTitle || title}
            </ModalHeader>
            <ModalCloseButton
              color="pinkShadeOne"
              size="xl"
              p={4}
              _focus={{ boxShadow: 'none' }}
            />
            <ModalBody overflowY="scroll">
              {!customModal && !customModalText && (
                <EditSectionBox {...{ boxType, onClose }} />
              )}
              {customModalText && customModal}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

const isBoxDataEditable = (boxType: BoxType) =>
  [
    BoxType.PLAYER_TYPE,
    BoxType.PLAYER_COLOR_DISPOSITION,
    BoxType.PLAYER_SKILLS,
  ].includes(boxType);

const EditSectionBox = ({
  boxType,
  onClose,
}: {
  boxType: string;
  onClose: () => void;
}) => {
  switch (boxType) {
    case BoxType.PLAYER_TYPE: {
      return <SetupPlayerType isEdit {...{ onClose }} />;
    }
    case BoxType.PLAYER_COLOR_DISPOSITION: {
      return <SetupPersonalityType isEdit {...{ onClose }} />;
    }
    case BoxType.PLAYER_SKILLS: {
      return <SetupSkills isEdit {...{ onClose }} />;
    }
    default:
  }
  return <></>;
};

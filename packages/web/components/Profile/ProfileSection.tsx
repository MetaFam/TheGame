import {
  Box,
  Button,
  EditIcon,
  Flex,
  FlexProps,
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
import { Maybe } from '@metafam/utils';
import BackgroundImage from 'assets/main-background.jpg';
import { SetupColorDisposition } from 'components/Setup/SetupColorDisposition';
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
  modalText?: string;
  modalTitle?: string;
  modal?: React.ReactNode;
  subheader?: string;
};

export const ProfileSection: React.FC<FlexProps & ProfileSectionProps> = ({
  children,
  isOwnProfile,
  canEdit,
  boxType,
  title,
  withoutBG = false,
  modalText,
  modal,
  modalTitle,
  subheader,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      minW="min(var(--chakra-sizes-72), calc(100vw - 3rem))"
      pos="relative"
      w="100%"
      h="auto"
      direction="column"
      {...props}
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
            {!modal && isOwnProfile && !canEdit && isBoxDataEditable(boxType) && (
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
            {modal && modalText && (
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
                {modalText}
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
            bgAttachment="fixed"
            p={[4, 8, 12]}
          >
            <ModalHeader
              color="white"
              fontSize="4xl"
              alignSelf="center"
              fontWeight="normal"
              textAlign="center"
            >
              {modalTitle || title}

              {subheader && (
                <Text
                  fontStyle="italic"
                  color="gray.400"
                  textAlign="center"
                  fontSize="md"
                  mt={3}
                  mb={10}
                >
                  {subheader}
                </Text>
              )}
            </ModalHeader>
            <ModalCloseButton
              color="pinkShadeOne"
              size="xl"
              p={4}
              _focus={{ boxShadow: 'none' }}
            />
            <ModalBody overflowY="scroll">
              {!modal && !modalText && (
                <EditSectionBox {...{ boxType, onClose }} />
              )}
              {modalText && modal}
            </ModalBody>
            {/* we should figure out how to unify modal footers (edit sections have their own,
              look into EditSectionBox components - they have footers with 'save' and 'cancel' buttons) */}
            {modalText && modal && (
              <ModalFooter mt={6} justifyContent="center">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  color="magenta"
                  _hover={{ bg: '#FFFFFF11' }}
                  _active={{ bg: '#FF000011' }}
                >
                  Go Back to Profile
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

const isBoxDataEditable = (boxType?: Maybe<BoxType>) =>
  !!boxType &&
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
      return <SetupPlayerType {...{ onClose }} />;
    }
    case BoxType.PLAYER_COLOR_DISPOSITION: {
      return <SetupColorDisposition {...{ onClose }} />;
    }
    case BoxType.PLAYER_SKILLS: {
      return <SetupSkills {...{ onClose }} />;
    }
    default:
  }
  return <></>;
};

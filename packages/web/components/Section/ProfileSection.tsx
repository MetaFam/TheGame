import {
  Box,
  Button,
  EditIcon,
  Flex,
  FlexProps,
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
import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupRoles } from 'components/Setup/SetupRoles';
import { SetupSkills } from 'components/Setup/SetupSkills';
import React from 'react';
import { BoxType, BoxTypes } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  isOwnProfile?: Maybe<boolean>;
  editing?: boolean;
  type?: BoxType;
  title?: string | false;
  withoutBG?: boolean;
  modalPrompt?: string;
  modalTitle?: string | false;
  modal?: React.ReactNode;
  subheader?: string;
};

export const ProfileSection: React.FC<
  ProfileSectionProps & Omit<FlexProps, 'title'>
> = ({
  children,
  isOwnProfile,
  editing,
  type: boxType,
  title = false,
  withoutBG = false,
  modalPrompt,
  modal,
  modalTitle,
  subheader,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      minW="min(var(--chakra-sizes-72), calc(100vw - 3rem), 100%)"
      pos="relative"
      w="100%"
      h="auto"
      direction="column"
      {...props}
    >
      {title !== false && (
        <Box bg="purpleProfileSection" borderTopRadius="lg" py={5}>
          <Flex h={5} pr={2} pl={6} align="center">
            {title && (
              <Text
                fontSize="md"
                color="blueLight"
                mr="auto"
                fontWeight={600}
                casing="uppercase"
              >
                {title}
              </Text>
            )}
            {isOwnProfile && !editing && isEditable(boxType) && (
              <IconButton
                aria-label={`Edit ${title}`}
                size="lg"
                background="transparent"
                color="pinkShadeOne"
                icon={<EditIcon />}
                _hover={{ color: 'white' }}
                _focus={{ boxShadow: 'none' }}
                _active={{ transform: 'scale(0.8)' }}
                isRound
                onClick={onOpen}
              />
            )}
            {modal && modalPrompt && (
              <Button
                color="pinkShadeOne"
                background="transparent"
                _hover={{ color: 'white' }}
                _focus={{ boxShadow: 'none' }}
                _active={{ transform: 'scale(0.8)' }}
                onClick={onOpen}
              >
                {modalPrompt}
              </Button>
            )}
          </Flex>
        </Box>
      )}
      <Box
        bg={withoutBG ? 'none' : 'blueProfileSection'}
        borderBottomRadius="lg"
        borderTopRadius={!title ? 'lg' : 0}
        px={boxType === BoxTypes.EMBEDDED_URL ? 0 : [2, 8]}
        py={boxType === BoxTypes.EMBEDDED_URL ? 0 : 8}
        sx={{ backdropFilter: 'blur(8px)' }}
        w="full"
        pos="relative"
        pointerEvents={editing ? 'none' : 'initial'}
      >
        {children}
      </Box>
      {(boxType || modal) && (
        <Modal {...{ isOpen, onClose }}>
          <ModalOverlay />
          <ModalContent
            maxW={['100%', '80%']}
            backgroundImage={`url(${BackgroundImage})`}
            bgSize="cover"
            bgAttachment="fixed"
            p={[4, 8, 12]}
          >
            {modalTitle !== false && (
              <ModalHeader
                color="white"
                fontSize="4xl"
                alignSelf="center"
                fontWeight="normal"
                textAlign="center"
              >
                {modalTitle ?? title}

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
            )}
            <ModalCloseButton
              color="pinkShadeOne"
              size="xl"
              p={4}
              _focus={{ boxShadow: 'none' }}
            />
            <ModalBody p={[0, 6]}>
              {modal ?? <EditSection {...{ boxType, onClose }} />}
            </ModalBody>
            {/* we should figure out how to unify modal footers (edit sections have their own,
              look into EditSectionBox components - they have footers with 'save' and 'cancel' buttons) */}
            {modal && (
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

const isEditable = (type?: Maybe<BoxType>) =>
  !!type &&
  (
    [
      BoxTypes.PLAYER_TYPE,
      BoxTypes.PLAYER_COLOR_DISPOSITION,
      BoxTypes.PLAYER_SKILLS,
      BoxTypes.PLAYER_ROLES,
    ] as Array<BoxType>
  ).includes(type);

const EditSection = ({
  boxType,
  onClose,
}: {
  boxType?: string;
  onClose: () => void;
}) => {
  const buttonLabel = 'Save';

  switch (boxType) {
    case BoxTypes.PLAYER_TYPE: {
      return <SetupPlayerType {...{ onClose, buttonLabel }} />;
    }
    case BoxTypes.PLAYER_COLOR_DISPOSITION: {
      return <SetupPersonalityType {...{ onClose, buttonLabel }} />;
    }
    case BoxTypes.PLAYER_SKILLS: {
      return <SetupSkills {...{ onClose, buttonLabel }} />;
    }
    case BoxTypes.PLAYER_ROLES: {
      return <SetupRoles {...{ onClose, buttonLabel }} />;
    }
    default:
  }
  return <></>;
};

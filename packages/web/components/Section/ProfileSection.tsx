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
import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupRoles } from 'components/Setup/SetupRoles';
import { SetupSkills } from 'components/Setup/SetupSkills';
import { ComposeDBContextProvider } from 'contexts/ComposeDBContext';
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import React, { useCallback } from 'react';
import { BoxType, BoxTypes } from 'utils/boxTypes';

export type ProfileSectionProps = {
  children?: React.ReactNode;
  isOwnProfile?: Maybe<boolean>;
  editing?: boolean;
  type?: BoxType;
  title?: string | false;
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
      <Box
        borderBottomRadius="lg"
        borderRadius="lg"
        p={6}
        pb={8}
        w="full"
        pos="relative"
        pointerEvents={editing ? 'none' : 'initial'}
      >
        {title !== false && (
          <Box pb={5} w="100%">
            <Flex h={5} align="center" w="100%">
              {title && (
                <Text
                  fontSize="lg"
                  fontWeight="700"
                  textTransform="uppercase"
                  mr="auto"
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
                  mr={-4}
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
                  mr={-4}
                >
                  {modalPrompt}
                </Button>
              )}
            </Flex>
          </Box>
        )}
        {children}
      </Box>
      {(boxType || modal) && (
        <Modal {...{ isOpen, onClose }}>
          <ModalOverlay />
          <ModalContent>
            {modalTitle !== false && (
              <ModalHeader>
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
            <ModalCloseButton />
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
  const { performHydration } = usePlayerHydrationContext();

  const onComplete = useCallback(
    (nodeId?: string) => {
      if (nodeId) {
        performHydration(nodeId);
      }
      onClose();
    },
    [onClose, performHydration],
  );

  switch (boxType) {
    case BoxTypes.PLAYER_TYPE: {
      return <SetupPlayerType {...{ onComplete, buttonLabel, title: '' }} />;
    }
    case BoxTypes.PLAYER_COLOR_DISPOSITION: {
      return (
        <SetupPersonalityType {...{ onComplete, buttonLabel, title: '' }} />
      );
    }
    case BoxTypes.PLAYER_SKILLS: {
      return <SetupSkills {...{ onClose, buttonLabel, title: '' }} />;
    }
    case BoxTypes.PLAYER_ROLES: {
      return <SetupRoles {...{ onClose, buttonLabel, title: '' }} />;
    }
    default:
  }
  return <></>;
};

import {
  Box,
  Center,
  ExternalLinkIcon,
  MetaButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from '@metafam/ds';
import { ComposeDBProfile } from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { Player } from 'graphql/autogen/types';
import { CeramicError } from 'lib/errors';
import { useWeb3 } from 'lib/hooks';
import { useComputeComposeDBImageMetadata } from 'lib/hooks/ceramic/useComputeComposeDBImageMetadata';
import { useSaveToComposeDB } from 'lib/hooks/ceramic/useSaveToComposeDB';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { hasuraToComposeDBProfile } from 'utils/playerHelpers';

export type ComposeDBPromptModalProps = {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  handleMigrationCompleted: (streamID: string) => void;
};

const initialStatus = 'Loading profile image data…';

export const ComposeDBPromptModal: React.FC<ComposeDBPromptModalProps> = ({
  player,
  isOpen,
  onClose,
  handleMigrationCompleted,
}) => {
  const toast = useToast();
  const [status, setStatus] = useState(initialStatus);
  const { chainId } = useWeb3();

  const { imageMetadata: profileImageMetadata } =
    useComputeComposeDBImageMetadata(player, 'profileImageURL');
  const { imageMetadata: backgroundImageMetadata } =
    useComputeComposeDBImageMetadata(player, 'backgroundImageURL');

  const areImagesLoaded = useMemo(() => {
    const isAvatarLoaded =
      player.profile?.profileImageURL == null || profileImageMetadata != null;
    const isBackgroundLoaded =
      player.profile?.backgroundImageURL == null ||
      backgroundImageMetadata != null;
    return isAvatarLoaded && isBackgroundLoaded;
  }, [backgroundImageMetadata, player.profile, profileImageMetadata]);

  useEffect(() => {
    if (areImagesLoaded) {
      setStatus('Port your profile data');
    }
  }, [areImagesLoaded]);

  const { save: saveToComposeDB, status: saveStatus } = useSaveToComposeDB();

  const persist = useCallback(
    (values: ComposeDBProfile) => {
      setStatus('Pushing Data to Ceramic…');
      return saveToComposeDB(values);
    },
    [saveToComposeDB],
  );

  useEffect(() => {
    if (saveStatus === 'authenticating') {
      setStatus('Authenticating DID…');
    }
  }, [saveStatus]);

  const onClick = useCallback(async () => {
    if (!player.profile) {
      return;
    }
    try {
      const composeDBPayload = hasuraToComposeDBProfile(player.profile, {
        profileImageURL: profileImageMetadata,
        backgroundImageURL: backgroundImageMetadata,
      });

      const streamID = await persist(composeDBPayload);

      handleMigrationCompleted(streamID);
      onClose();
      toast({
        title: 'ComposeDB migration complete',
        description: `Your profile streamID is ${streamID}`,
        status: 'success',
        isClosable: true,
        duration: 12000,
      });
    } catch (err) {
      const heading = err instanceof CeramicError ? 'Ceramic Error' : 'Error';
      toast({
        title: heading,
        description: (err as Error).message,
        status: 'error',
        isClosable: true,
        duration: 12000,
      });
      errorHandler(err as Error);
      setStatus(initialStatus);
    }
  }, [
    backgroundImageMetadata,
    handleMigrationCompleted,
    onClose,
    persist,
    player.profile,
    profileImageMetadata,
    toast,
  ]);

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Center flexDirection="column">
            <Box>
              MyMeta is now using
              <MetaLink
                isExternal
                href="https://blog.ceramic.network/composedb-using-ceramic-as-a-graph-database/"
                mr={1}
                ml={1}
              >
                ComposeDB
                <ExternalLinkIcon ml={1} />
              </MetaLink>
              for storing profile data.
            </Box>
            <Box mt={10}>
              {chainId === '0x1' ? (
                <>
                  {/* <Box>What is this?</Box> */}
                  <MetaButton disabled={!areImagesLoaded} onClick={onClick}>
                    {status}
                  </MetaButton>
                </>
              ) : (
                <Text fontSize="md" w="100%" textAlign="center">
                  Please switch to <SwitchNetworkButton chainId="0x1" /> to
                  progress
                </Text>
              )}
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

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
  useToast,
} from '@metafam/ds';
import {
  ComposeDBImageMetadata,
  ComposeDBProfile,
  HasuraImageFieldKey,
  Maybe,
} from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { Player } from 'graphql/autogen/types';
import { CeramicError } from 'lib/errors';
import { hasuraToComposeDBProfile } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import { useSaveToComposeDB } from 'lib/hooks/ceramic/useSaveToComposeDB';
import React, { useCallback, useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { getPlayerBackgroundFull, getPlayerImage } from 'utils/playerHelpers';

export type ComposeDBPromptModalProps = {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  handleMigrationCompleted: (streamID: string) => void;
};

const initialStatus = 'Port your profile data';

export const ComposeDBPromptModal: React.FC<ComposeDBPromptModalProps> = ({
  player,
  isOpen,
  onClose,
  handleMigrationCompleted,
}) => {
  const toast = useToast();
  const [status, setStatus] = useState(initialStatus);
  const [imageMetadata, setImageMetadata] = useState<
    Record<HasuraImageFieldKey, Maybe<ComposeDBImageMetadata>>
  >({
    profileImageURL: null,
    backgroundImageURL: null,
  });

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

  // build image metadata from the profile fields. There should be code existing
  // to do a lot of this
  useEffect(() => {
    const getImageMetadata = async (key: HasuraImageFieldKey, url: string) => {
      const response = await fetch(url, { method: 'HEAD' });
      const mimeType = response.headers.get('Content-Type');
      setImageMetadata({
        ...imageMetadata,
        [key]: {
          url,
          mimeType: mimeType ?? 'image/*',
        },
      });
    };
    if (player.profile?.profileImageURL) {
      const url = getPlayerImage(player);
      getImageMetadata('profileImageURL', url);
      // todo populate the optional fields as well: size, width, height etc
    }
    if (player.profile?.backgroundImageURL) {
      const url = getPlayerBackgroundFull(player);
      getImageMetadata('backgroundImageURL', url);
    }
  }, [imageMetadata, player]);

  const onClick = useCallback(async () => {
    if (!player.profile) {
      return;
    }
    try {
      setStatus('Loading profile image data…');

      const composeDBPayload = hasuraToComposeDBProfile(
        player.profile,
        imageMetadata,
      );

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
    handleMigrationCompleted,
    imageMetadata,
    onClose,
    persist,
    player.profile,
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
            {/* <Box>What is this?</Box> */}
            <Box mt={10}>
              <MetaButton onClick={onClick}>{status}</MetaButton>
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

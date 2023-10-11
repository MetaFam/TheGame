import {
  Box,
  Center,
  ExternalLinkIcon,
  ListItem,
  MetaButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useToast,
} from '@metafam/ds';
import { ComposeDBProfile, profileMapping } from '@metafam/utils';
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
        <ModalHeader>Port Data to ComposeDB</ModalHeader>
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
              <Box fontStyle="italic" fontSize="large" mt={4} mb={2}>
                What's this all about?
              </Box>
              <Box>
                The previous version of MyMeta used an old version of Ceramic
                that is no longer supported. We have since ported MyMeta
                Profiles to store data in ComposeDB. Unfortunately, there is no
                way to automatically port your existing data to ComposeDB -- you
                must explicitly opt in. However, ComposeDB allows data
                portability -- for example, another web3 application that you
                trust (and explicitly authorize) could pull in your MyMeta data
                automatically! This opens up the ability for you to be able to
                enter your profile information in <em>one place</em> instead of
                siloing it off into tens of other application databases like in
                the web2 world.
              </Box>
              <Box fontStyle="italic" fontSize="large" mt={4} mb={2}>
                What control do I have over this data? What's the catch?
              </Box>
              <Box>
                All data in ComposeDB is public by default, so don't share
                anything you're not comfortable being open to the world. There
                is currently no way to revoke access to this data, though you
                should be able to clear any field out (if this is not the case,
                please{' '}
                <MetaLink
                  isExternal
                  href="https://github.com/MetaFam/TheGame/issues/new/choose"
                  mr={1}
                  ml={1}
                >
                  file an issue
                  <ExternalLinkIcon ml={1} />
                </MetaLink>
                with us). Note that when you port your data, the Ethereum
                address you are connected with becomes the sole controller of
                that data.
              </Box>
              <Box fontStyle="italic" fontSize="large" mt={4} mb={2}>
                What data does this include?
              </Box>
              <Box>
                MyMeta's ComposeDB model includes:
                <UnorderedList mb={2}>
                  {Object.values(profileMapping).map((field) => (
                    <ListItem key={field}>{field}</ListItem>
                  ))}
                </UnorderedList>
                Note that skills and DAO memberships are currently <em>not</em>{' '}
                being stored in ComposeDB.
              </Box>
            </Box>
          </Center>
        </ModalBody>
        <ModalFooter justifyContent="center">
          {chainId === '0x1' ? (
            <>
              <MetaButton disabled={!areImagesLoaded} onClick={onClick}>
                {status}
              </MetaButton>
            </>
          ) : (
            <Text fontSize="md" w="100%" textAlign="center">
              Please switch to <SwitchNetworkButton chainId="0x1" /> to progress
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

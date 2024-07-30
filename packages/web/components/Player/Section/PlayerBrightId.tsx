import {
  Box,
  BrightIdIcon,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';

import { Player } from '#graphql/autogen/hasura-sdk';
import { useUser, useWeb3 } from '#lib/hooks';
import { useBrightIdStatus, useBrightIdUpdated } from '#lib/hooks/brightId';

type Props = { player: Player };

export const PlayerBrightId: React.FC<Props> = ({ player }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, fetching } = useUser();
  const { verified, deeplink, universalLink } =
    useBrightIdStatus({ player }) ?? {};
  const { connected } = useWeb3();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    if (connected && !fetching && user?.id === player.id) {
      setIsLoggedInUser(true);
    }
  }, [user, fetching, connected, player?.id]);

  useBrightIdUpdated({ player, poll: !verified && isOpen && isLoggedInUser });

  if (!isLoggedInUser && !verified) return null;

  if (!isLoggedInUser && verified)
    return (
      <Tooltip label="Verified on BrightID" closeOnClick={false} hasArrow>
        <Button
          size="xs"
          colorScheme="brightIdOrange"
          leftIcon={<BrightIdIcon />}
          color="white"
        >
          Verified
        </Button>
      </Tooltip>
    );

  return (
    <Flex align="center" justify="center">
      <Button
        size="xs"
        colorScheme="brightIdOrange"
        leftIcon={<BrightIdIcon />}
        onClick={onOpen}
      >
        Verify on BrightID
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Verify on BrightID</ModalHeader>
            <ModalBody>
              <VStack p={4} w="100%" maxW="20rem">
                {deeplink ? (
                  <Box>
                    <QRCode value={deeplink} />
                    <Link
                      href={universalLink}
                      isExternal
                      color="cyanText"
                      mt={2}
                    >
                      Open Link in App
                    </Link>
                  </Box>
                ) : (
                  <Text>Could not load BrightID!</Text>
                )}
              </VStack>
              <Text>
                {"Don't have BrightID yet? "}
                <Link
                  href="https://www.brightid.org/#getStarted"
                  isExternal
                  color="cyanText"
                >
                  Get started here.
                </Link>
              </Text>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
};

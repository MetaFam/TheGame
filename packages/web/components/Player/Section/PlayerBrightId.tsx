import {
  Box,
  BrightIdIcon,
  Button,
  Flex,
  HStack,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser, useWeb3 } from 'lib/hooks';
import { useBrightIdStatus, useBrightIdUpdated } from 'lib/hooks/brightId';
import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';
import { isBackdropFilterSupported } from 'utils/compatibilityHelpers';

type Props = { player: PlayerFragmentFragment };

export const PlayerBrightId: React.FC<Props> = ({ player }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, fetching } = useUser();
  const { verified, deeplink, universalLink } = useBrightIdStatus({ player });

  const { connected } = useWeb3();

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    if (connected && !fetching && user?.id === player.id) {
      setIsLoggedInUser(true);
    }
  }, [user, fetching, connected, player.id]);

  useBrightIdUpdated({ player, poll: !verified && isOpen && isLoggedInUser });

  const modalContentStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }
    : {
        backgroundColor: 'rgba(7, 2, 29, 0.91)',
      };

  if (verified || !isLoggedInUser) return null;

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
          <ModalContent bg="none" borderRadius="lg" overflow="hidden">
            <Box bg="purple80" p={4} w="100%">
              <HStack>
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  fontWeight="bold"
                  color="blueLight"
                  as="div"
                  mr="auto"
                >
                  Verify on BrightID
                </Text>
                <ModalCloseButton color="blueLight" />
              </HStack>
            </Box>
            <VStack p={4} css={modalContentStyles} w="100%" color="blueLight">
              <VStack p={4} w="100%" maxW="20rem">
                <QRCode value={deeplink} />
                <Link href={universalLink} isExternal color="cyanText" mt={2}>
                  Open link in App
                </Link>
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
            </VStack>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
};

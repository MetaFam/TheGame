import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import BrightIDLogo from 'assets/brightid-logo.png';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser, useWeb3 } from 'lib/hooks';
import { useBrightID } from 'lib/useBrightID';
import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';
import { isBackdropFilterSupported } from 'utils/compatibilityHelpers';

type Props = { player: PlayerFragmentFragment };

export const PlayerBrightID: React.FC<Props> = ({ player }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { verified, loading, deeplink } = useBrightID({ player });
  const { user, fetching } = useUser();
  const { isConnected } = useWeb3();

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    setIsLoggedInUser(isConnected && !fetching && user?.id === player.id);
  }, [user, fetching, isConnected, player.id]);

  const modalContentStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }
    : {
        backgroundColor: 'rgba(7, 2, 29, 0.91)',
      };

  return (
    <Flex align="center" justify="center">
      {loading || fetching ? (
        <Spinner size="sm" color="brightId" />
      ) : (
        <>
          <Image src={BrightIDLogo} alt="BrightID Logo" w="1rem" mr="0.5rem" />
          {verified && (
            <Text
              as="span"
              fontFamily="body"
              fontSize="xs"
              color="brightId"
              fontWeight="600"
              py={1}
            >
              Verified
            </Text>
          )}
          {!verified &&
            (isLoggedInUser ? (
              <Button
                variant="ghost"
                fontFamily="body"
                fontSize="xs"
                size="xs"
                color="brightId"
                onClick={onOpen}
              >
                Verify
              </Button>
            ) : (
              <Text
                as="span"
                fontFamily="body"
                fontSize="xs"
                color="brightId"
                fontWeight="600"
                py={1}
              >
                Unverified
              </Text>
            ))}
        </>
      )}
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
                <Link href={deeplink} isExternal color="cyanText" mt={2}>
                  Open link in App
                </Link>
              </VStack>
              <Text>
                {`Don't have BrightID yet? `}
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

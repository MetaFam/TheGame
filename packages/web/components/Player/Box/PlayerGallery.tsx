import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { MetaLink as Link } from 'components/Link';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useOpenSeaCollectibles } from 'lib/useOpenSeaCollectibles';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { PlayerBox } from './PlayerBoxe';

type Props = { player: PlayerFragmentFragment; setRemoveBox: () => void };

export const PlayerGallery: React.FC<Props> = ({ player, setRemoveBox }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favorites, data, loading } = useOpenSeaCollectibles({ player });
  return (
    <PlayerBox title="Gallery" setRemoveBox={setRemoveBox}>
      {!loading &&
        favorites &&
        favorites.map((nft) => (
          <HStack alignItems="end" mb={6}>
            <Flex width="126px" height="126px" mr={6}>
              <Box
                bgImage={`url(${nft.imageUrl})`}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                width="124px"
                height="124px"
                m="auto"
              />
            </Flex>
            <Link href={nft.permaLink} isExternal>
              <Text
                fontSize="xs"
                fontFamily="heading"
                mt={3}
                mb={3}
                casing="uppercase"
              >
                {nft.title}
              </Text>
              {nft.priceInEth && (
                <Text fontSize="sm" mb="1">
                  {nft.priceInUsd
                    ? `${nft.priceInEth}Ξ ($${nft.priceInUsd.toFixed(2)})`
                    : `${nft.priceInEth}Ξ`}
                </Text>
              )}
            </Link>
          </HStack>
        ))}
      {!loading && data && data.length > 3 && (
        <Text
          as="span"
          fontFamily="body"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={onOpen}
        >
          View all
        </Text>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent maxW="50rem" bg="none">
            <Box
              bg="rgba(70, 20, 100, 0.8)"
              borderTopRadius="lg"
              p={4}
              w="100%"
            >
              <HStack>
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  fontWeight="bold"
                  color="blueLight"
                  as="div"
                  mr="auto"
                >
                  Gallery
                </Text>
                <FaTimes
                  color="#A5B9F6"
                  opacity="0.4"
                  cursor="pointer"
                  onClick={onClose}
                />
              </HStack>
            </Box>
            <SimpleGrid
              columns={2}
              bg="whiteAlpha.200"
              gap={6}
              padding={6}
              boxShadow="md"
              css={{ backdropFilter: 'blur(8px)' }}
              maxH="80vh"
              overflowY="scroll"
            >
              {data &&
                data.map((nft) => (
                  <HStack alignItems="end" mb={6}>
                    <Flex width="126px" height="126px" mr={6}>
                      <Box
                        bgImage={`url(${nft.imageUrl})`}
                        backgroundSize="contain"
                        backgroundRepeat="no-repeat"
                        backgroundPosition="center"
                        width="124px"
                        height="124px"
                        m="auto"
                      />
                    </Flex>
                    <Link href={nft.permaLink} isExternal>
                      <Text
                        fontSize="xs"
                        fontFamily="heading"
                        mt={3}
                        mb={3}
                        casing="uppercase"
                      >
                        {nft.title}
                      </Text>
                      {nft.priceInEth && (
                        <Text fontSize="sm" mb="1">
                          {nft.priceInUsd
                            ? `${nft.priceInEth}Ξ ($${nft.priceInUsd.toFixed(
                                2,
                              )})`
                            : `${nft.priceInEth}Ξ`}
                        </Text>
                      )}
                    </Link>
                  </HStack>
                ))}
            </SimpleGrid>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </PlayerBox>
  );
};

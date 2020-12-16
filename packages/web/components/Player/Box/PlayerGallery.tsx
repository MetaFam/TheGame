import {
  Box,
  Flex,
  Heading,
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
import {
  Collectible,
  useOpenSeaCollectibles,
} from 'lib/useOpenSeaCollectibles';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { PlayerBox } from './PlayerBoxe';

type Props = { player: PlayerFragmentFragment; setRemoveBox: () => void };

const GalleryItem: React.FC<{ nft: Collectible; noMargin?: boolean }> = ({
  nft,
  noMargin = false,
}) => (
  <Link
    href={nft.openseaLink}
    isExternal
    mb={noMargin ? undefined : 6}
    minW={0}
    display="flex"
  >
    <HStack spacing={6}>
      <Flex width="7.5rem" height="7.5rem">
        <Box
          bgImage={`url(${nft.imageUrl})`}
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          w="7.5rem"
          h="7.5rem"
          m="auto"
        />
      </Flex>
      <Flex direction="column">
        <Heading
          fontSize="xs"
          mt={3}
          mb={3}
          textTransform="uppercase"
          display="inline-block"
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
        >
          {nft.title}
        </Heading>
        <Text fontSize="sm">{nft.priceString}</Text>
      </Flex>
    </HStack>
  </Link>
);

export const PlayerGallery: React.FC<Props> = ({ player, setRemoveBox }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favorites, data, loading } = useOpenSeaCollectibles({ player });
  return (
    <PlayerBox title="Gallery" setRemoveBox={setRemoveBox}>
      {!loading &&
        favorites?.map((nft) => <GalleryItem nft={nft} key={nft.tokenId} />)}
      {!loading && data?.length > 3 && (
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
        <ModalOverlay css={{ backdropFilter: 'blur(8px)' }}>
          <ModalContent maxW="6xl" bg="none">
            <Box bg="purple80" borderTopRadius="lg" p={4} w="100%">
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
                  color="blueLight"
                  opacity="0.4"
                  cursor="pointer"
                  onClick={onClose}
                />
              </HStack>
            </Box>
            <Box
              overflowY="scroll"
              overflowX="hidden"
              maxH="80vh"
              borderBottomRadius="lg"
              w="100%"
            >
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={6}
                padding={6}
                boxShadow="md"
                bg="whiteAlpha.200"
                css={{ backdropFilter: 'blur(8px)' }}
              >
                {data?.map((nft) => (
                  <GalleryItem nft={nft} key={nft.tokenId} noMargin />
                ))}
              </SimpleGrid>
            </Box>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </PlayerBox>
  );
};

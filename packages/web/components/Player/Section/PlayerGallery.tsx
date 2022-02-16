import {
  Box,
  Flex,
  Heading,
  HStack,
  LoadingState,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { MetaLink as Link } from 'components/Link';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useOpenSeaCollectibles } from 'lib/hooks/opensea';
import React from 'react';
import { BoxType } from 'utils/boxTypes';
import { Collectible } from 'utils/openseaHelpers';

const GalleryItem: React.FC<{ nft: Collectible; noMargin?: boolean }> = ({
  nft,
  noMargin = false,
}) => (
  <Link
    href={nft.openseaLink}
    isExternal
    mb={noMargin ? undefined : 6}
    display="flex"
  >
    <Box
      bgImage={`url(${nft.imageURL})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minW={28}
      minH={28}
    />
    <Flex direction="column" ml={3} justify="center">
      <Heading
        fontSize="xs"
        my={3}
        display="inline-block"
        style={{ wordWrap: 'break-word', fontVariant: 'small-caps' }}
      >
        {nft.title}
      </Heading>
      <Text fontSize="sm">{nft.priceString}</Text>
    </Flex>
  </Link>
);

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerGallery: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favorites, data, loading } = useOpenSeaCollectibles({ player });

  return (
    <ProfileSection
      title="NFT Gallery"
      isOwnProfile={isOwnProfile}
      canEdit={canEdit}
      boxType={BoxType.PLAYER_NFT_GALLERY}
      withoutBG
    >
      {loading && <LoadingState mb={6} />}
      {!loading &&
        favorites?.map((nft) => <GalleryItem nft={nft} key={nft.tokenId} />)}
      {!loading && data.length === 0 && (
        <Text textAlign="center" fontStyle="italic" mb="1rem">
          No{' '}
          <Text as="span" title="Non-Fungible Token" borderBottom="2px dotted">
            NFT
          </Text>
          s found for {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}
      {!loading && data?.length > 3 && (
        <Text
          as="span"
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
          <ModalContent
            mx="1rem"
            maxW="6xl"
            bgImage={`url(${BackgroundImage})`}
            bgSize="cover"
            bgAttachment="fixed"
          >
            <Box bg="purple80" borderTopRadius="lg" p={4} w="100%">
              <HStack>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="blueLight"
                  as="div"
                  mr="auto"
                >
                  NFT Gallery
                </Text>
                <ModalCloseButton color="blueLight" />
              </HStack>
            </Box>
            <Flex p={2}>
              <Box
                overflowY="scroll"
                overflowX="hidden"
                maxH="80vh"
                borderBottomRadius="lg"
                w="100%"
                css={{
                  scrollbarColor: 'rgba(70,20,100,0.8) rgba(255,255,255,0)',
                  '::-webkit-scrollbar': {
                    width: '8px',
                    background: 'none',
                  },
                  '::-webkit-scrollbar-thumb': {
                    background: 'rgba(70,20,100,0.8)',
                    borderRadius: '999px',
                  },
                }}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  gap={6}
                  padding={6}
                  boxShadow="md"
                >
                  {data?.map((nft) => (
                    <GalleryItem
                      nft={nft}
                      key={`${nft.tokenId}-${nft.address}`}
                      noMargin
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ProfileSection>
  );
};

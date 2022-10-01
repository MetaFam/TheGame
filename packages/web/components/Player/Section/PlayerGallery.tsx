import {
  Box,
  Flex,
  Heading,
  LoadingState,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
  ViewAllButton,
} from '@metafam/ds';
import { MetaLink as Link } from 'components/Link';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useOpenSeaCollectibles } from 'lib/hooks/opensea';
import React from 'react';
import { BoxTypes } from 'utils/boxTypes';
import { Collectible } from 'utils/openseaHelpers';

const GalleryItem: React.FC<{ nft: Collectible }> = ({ nft }) => (
  <Link href={nft.openseaLink} isExternal display="flex">
    <Box
      bgImage={`url(${nft.imageURL})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minW={28}
      minH={28}
    />
    <Tooltip label={nft.title} hasArrow>
      <Flex
        display="inline-grid"
        direction="column"
        ml={3}
        h="full"
        alignContent="center"
      >
        <Heading
          fontSize="xs"
          ml="1em"
          sx={{
            textIndent: '-1em',
            wordBreak: 'break-word',
            fontVariant: 'small-caps',
          }}

          // ellipses look nice, but only allow one line, I think
          // whiteSpace="nowrap"
          // textOverflow="ellipsis"
          // overflowX="hidden"
        >
          {nft.title}
        </Heading>
        <Text fontSize="sm">{nft.priceString}</Text>
      </Flex>
    </Tooltip>
  </Link>
);

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nfts: Array<Collectible>;
};

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  nfts,
}) => (
  <Modal {...{ isOpen, onClose }}>
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>NFT Gallery</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} p={4}>
            {nfts?.map((nft) => (
              <GalleryItem {...{ nft }} key={`${nft.tokenId}-${nft.address}`} />
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  </Modal>
);

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerGallery: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    favorites,
    data: nfts,
    loading,
    error,
  } = useOpenSeaCollectibles({
    player,
  });

  return (
    <ProfileSection
      title="NFT Gallery"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_NFT_GALLERY}
      withoutBG
    >
      {(() => {
        if (loading) {
          return <LoadingState pb={6} />;
        }
        if (error) {
          return (
            <Text textAlign="center" fontStyle="italic" mb={4} color="red">
              Error: {error}
            </Text>
          );
        }
        if (nfts.length === 0) {
          return (
            <Text textAlign="center" fontStyle="italic" mb={4}>
              No NFTs found for {isOwnProfile ? 'you' : 'this player'}.
            </Text>
          );
        }
        return (
          <>
            <SimpleGrid columns={1} gap={4} px={2}>
              {favorites?.map((nft) => (
                <GalleryItem {...{ nft }} key={nft.tokenId} />
              ))}
            </SimpleGrid>
            {nfts.length > 3 && (
              <Box textAlign="end">
                <GalleryModal {...{ isOpen, onClose, nfts }} />
                <ViewAllButton onClick={onOpen} size={nfts.length} />
              </Box>
            )}
          </>
        );
      })()}
    </ProfileSection>
  );
};

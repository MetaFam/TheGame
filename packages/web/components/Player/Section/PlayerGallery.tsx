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
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useNFTCollectibles } from 'lib/hooks/alchemy';
import { BoxTypes } from 'utils/boxTypes';

const GalleryItem: React.FC<{ nft: any }> = ({ nft }) => (
  <Box display="flex">
    <Box
      bgImage={`url(${nft?.image?.cachedUrl})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minW={28}
      minH={28}
    />
    <Tooltip label={nft?.title} hasArrow>
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
        >
          {nft?.collection?.name || nft?.contract?.name || 'Unknown'}
        </Heading>
        <Text fontSize="sm">
          Floor Price: {nft?.contract?.openSeaMetadata?.floorPrice || '0'} ETH
        </Text>
      </Flex>
    </Tooltip>
  </Box>
);

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nfts: Array<any>;
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
  const { loading, error, data: nfts } = useNFTCollectibles({ player });

  const processAllNfts = () => {
    let nftData: any = [];
    if (!nfts[0]) return [];
    if (nfts[0]?.maticNfts?.ownedNfts)
      nftData = [...nftData, ...nfts[0].maticNfts.ownedNfts];
    if (nfts[0]?.mainnetNfts?.ownedNfts)
      nftData = [...nftData, ...nfts[0].mainnetNfts.ownedNfts];
    if (nfts[0]?.optimismNfts?.ownedNfts)
      nftData = [...nftData, ...nfts[0].optimismNfts.ownedNfts];
    return nftData;
  };
  const allNfts = processAllNfts().filter(
    (nft: any) => nft.tokenType !== 'ERC1155',
  );

  return (
    <ProfileSection
      title="NFT Gallery"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_NFT_GALLERY}
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
              {allNfts?.slice(0, 4).map((nft: any) => (
                <GalleryItem {...{ nft }} key={nft.tokenId} />
              ))}
            </SimpleGrid>
            {allNfts?.length > 3 && (
              <Box textAlign="end">
                <GalleryModal {...{ isOpen, onClose, nfts: allNfts }} />
                <ViewAllButton onClick={onOpen} size={allNfts.length} />
              </Box>
            )}
          </>
        );
      })()}
    </ProfileSection>
  );
};

import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { isBackdropFilterSupported } from 'utils/compatibilityHelpers';

import polygonImage from '../../../assets/chains/polygon.png';
import xDaiImage from '../../../assets/chains/xDai.png';
import ethereumImage from '../../../assets/moloch/ethereum.png';
import hausdaoImage from '../../../assets/moloch/hausdao.png';
import metacartelImage from '../../../assets/moloch/metacartel.png';
import metaclanImage from '../../../assets/moloch/metaclan.png';
import metagameImage from '../../../assets/moloch/metagame.png';
import raidGuildImage from '../../../assets/moloch/raid_guild.png';
import { ProfileSection } from '../../ProfileSection';

const getImageMoloch = (title: string) => {
  if (title.toLowerCase().includes('hausdao')) return hausdaoImage;
  if (title.toLowerCase().includes('metacartel')) return metacartelImage;
  if (title.toLowerCase().includes('metaclan')) return metaclanImage;
  if (title.toLowerCase().includes('metagame')) return metagameImage;
  if (title.toLowerCase().includes('raid guild')) return raidGuildImage;
  if (title.toLowerCase().includes('xdai')) return xDaiImage;
  if (title.toLowerCase().includes('polygon')) return polygonImage;
  return ethereumImage;
};

type LinkDaoProps = {
  explorerUrl: string | null;
};

const LinkDao: React.FC<LinkDaoProps> = ({ explorerUrl, children }) => {
  if (explorerUrl)
    return (
      <Link
        role="group"
        _hover={{ textDecoration: 'none' }}
        href={explorerUrl}
        isExternal
      >
        {children}
      </Link>
    );

  return <>{children}</>;
};

type DaoListingProps = {
  memberId: string;
  memberShares?: string;
  memberRank?: string;
  memberXp?: number;
  title?: string;
  daoShares?: string;
  chain?: string;
  address?: string;
};

const DaoListing: React.FC<DaoListingProps> = ({
  title,
  memberShares,
  daoShares,
  memberRank,
  memberXp,
  chain,
  address,
}) => {
  let explorerUrl = null;
  if (chain) {
    if (chain.toLowerCase() === 'xdai')
      explorerUrl = `https://blockscout.com/xdai/mainnet/address/${address}`;
    else if (chain.toLowerCase() === 'ethereum')
      explorerUrl = `https://etherscan.io/address/${address}`;
  }

  let message;
  if (memberXp !== undefined) {
    message = `XP: ${Math.floor(memberXp || 0)}`;
  } else {
    message = `Shares: ${memberShares}/${daoShares}`;
  }

  return (
    <LinkDao explorerUrl={explorerUrl}>
      <HStack alignItems="center" mb={6}>
        <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
          <Box
            bgImage={`url(${getImageMoloch(title || chain || '')})`}
            backgroundSize="cover"
            width={12}
            height={12}
            m="auto"
          />
        </Flex>
        <Box>
          <Heading
            _groupHover={{ textDecoration: 'underline' }}
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="xs"
            color={explorerUrl ? 'cyanText' : 'white'}
            mb="1"
          >
            {title || `Unknown ${chain} DAO`}
          </Heading>
          <HStack alignItems="center">
            <Text fontSize="xs" casing="capitalize" mr={3}>
              {memberRank || 'player'}
            </Text>
            <Text fontSize="xs">{message}</Text>
          </HStack>
        </Box>
      </HStack>
    </LinkDao>
  );
};

type MembershipSectionProps = {
  player: PlayerFragmentFragment;
  onRemoveClick: () => void;
};

export const PlayerMemberships: React.FC<MembershipSectionProps> = ({
  player,
  onRemoveClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalContentStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }
    : {
        backgroundColor: 'rgba(7, 2, 29, 0.91)',
      };

  const memberships: DaoListingProps[] = [
    {
      memberId: 'metagame-pinned',
      title: 'MetaGame',
      memberRank: player.rank || '',
      memberXp: player.total_xp,
    },
    ...(player.daohausMemberships || []).map((m) => ({
      memberId: m.id,
      title: m.moloch.title || undefined,
      memberShares: m.shares,
      daoShares: m.moloch.totalShares,
      chain: m.moloch.chain,
      address: m.molochAddress,
    })),
  ];

  return (
    <ProfileSection title="Memberships" onRemoveClick={onRemoveClick}>
      {memberships.slice(0, 4).map((dao) => (
        <DaoListing
          key={dao.memberId}
          memberId={dao.memberId}
          title={dao.title}
          memberShares={dao.memberShares}
          daoShares={dao.daoShares}
          memberRank={dao.memberRank}
          memberXp={dao.memberXp}
          chain={dao.chain}
          address={dao.address}
        />
      ))}

      {memberships.length > 4 && (
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
                  Memberships
                </Text>
                <ModalCloseButton color="blueLight" />
              </HStack>
            </Box>

            <Flex p={2} css={modalContentStyles}>
              <Box
                overflowY="scroll"
                overflowX="hidden"
                maxH="80vh"
                borderBottomRadius="lg"
                w="100%"
                color="white"
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
                  columns={{ base: 1, md: 2 }}
                  gap={6}
                  padding={6}
                  boxShadow="md"
                >
                  {memberships.map((dao) => (
                    <DaoListing
                      key={dao.memberId}
                      memberId={dao.memberId}
                      title={dao.title}
                      memberShares={dao.memberShares}
                      daoShares={dao.daoShares}
                      memberRank={dao.memberRank}
                      memberXp={dao.memberXp}
                      chain={dao.chain}
                      address={dao.address}
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

import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  LoadingState,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@metafam/ds';
import {
  getDaoLink,
  getMolochImage,
  LinkGuild,
} from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import React, { useEffect, useMemo, useState } from 'react';
import { BoxType } from 'utils/boxTypes';
import { isBackdropFilterSupported } from 'utils/compatibilityHelpers';

type DaoListingProps = {
  membership: GuildMembership;
};

const DaoListing: React.FC<DaoListingProps> = ({ membership }) => {
  const {
    title,
    memberShares,
    daoShares,
    memberRank,
    memberXp,
    chain,
    address,
    logoUrl,
    guildname,
  } = membership;

  const stake = useMemo(() => {
    if (memberXp != null) {
      return `XP: ${Math.floor(memberXp)}`;
    }
    if (daoShares != null) {
      return `Shares: ${memberShares ?? 'Unknown'} ⁄ ${daoShares}`;
    }
    return '';
  }, [memberShares, memberXp, daoShares]);

  const daoUrl = useMemo(() => getDaoLink(chain, address), [chain, address]);

  const guildLogo = useMemo(
    () => logoUrl || getMolochImage(title || chain || ''),
    [logoUrl, chain, title],
  );

  return (
    <LinkGuild {...{ daoUrl, guildname }}>
      <HStack alignItems="center" mb={6}>
        <Flex bg="purpleBoxLight" minW={16} minH={16} mr={6} borderRadius={8}>
          <Image
            src={guildLogo}
            w="3.25rem"
            h="3.25rem"
            m="auto"
            borderRadius={4}
          />
        </Flex>
        <Box>
          <Heading
            _groupHover={{ textDecoration: 'underline' }}
            fontWeight="bold"
            style={{ fontVariant: 'small-caps' }}
            fontSize="xs"
            color={daoUrl ? 'cyanText' : 'white'}
            mb={1}
          >
            {title ?? (
              <Text>
                Unknown{' '}
                <Text as="span" textTransform="capitalize">
                  {chain}
                </Text>{' '}
                DAO
              </Text>
            )}
          </Heading>
          <HStack alignItems="center">
            {memberRank && (
              <Text fontSize="xs" casing="capitalize" mr={3}>
                {memberRank}
              </Text>
            )}
            <Text fontSize="xs">{stake}</Text>
          </HStack>
        </Box>
      </HStack>
    </LinkGuild>
  );
};

type MembershipSectionProps = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerMemberships: React.FC<MembershipSectionProps> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memberships, setMemberships] = useState<GuildMembership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMemberships(player).then((all) => {
      setLoading(false);
      setMemberships(all);
    });
  }, [player]);

  const modalContentStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(8px)',
      }
    : {
        backgroundColor: 'rgba(7, 2, 29, 0.91)',
      };

  return (
    <ProfileSection
      title="DAO Memberships"
      boxType={BoxType.PLAYER_DAO_MEMBERSHIPS}
      withoutBG
      {...{ isOwnProfile, canEdit }}
    >
      {loading && <LoadingState mb={6} />}

      {!loading && memberships.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No DAO member&shy;ships found for{' '}
          {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}

      {memberships.slice(0, 4).map((membership) => (
        <DaoListing key={membership.memberId} {...{ membership }} />
      ))}

      {memberships.length > 4 && (
        <Text
          as="span"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={onOpen}
        >
          View All ({memberships.length})
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
                  {memberships.map((membership) => (
                    <DaoListing key={membership.memberId} {...{ membership }} />
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

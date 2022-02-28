import {
  Box,
  ChainIcon,
  chakra,
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
  ViewAllButton,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import React, { useEffect, useMemo, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';

type DAOListingProps = {
  membership: GuildMembership;
};

const DAOListing: React.FC<DAOListingProps> = ({
  membership: {
    title,
    memberShares,
    daoShares,
    memberRank,
    memberXP,
    chain,
    address,
    logoURL,
    guildname,
  },
}) => {
  const stake = useMemo(() => {
    if (memberXP != null) {
      return `XP: ${Math.floor(memberXP)}`;
    }
    if (daoShares != null) {
      const member = memberShares ? Number(memberShares) : null;
      const dao = Number(daoShares);
      const percent = member != null ? ((member * 100) / dao).toFixed(3) : '?';
      return (
        <chakra.span
          textAlign={['center', 'left']}
          display={['flex', 'inline']}
          flexDirection={['column', 'inherit']}
        >
          <chakra.span mr={[0, 1]} _after={{ content: [undefined, '":"'] }}>
            Shares
          </chakra.span>
          <chakra.span whiteSpace="nowrap" title={`${percent}%`}>
            <Text as="sup">
              {member != null ? member.toLocaleString() : 'Unknown'}
            </Text>{' '}
            <chakra.span fontSize="lg" pos="relative" top={0.5}>
              ⁄
            </chakra.span>{' '}
            <Text as="sub">{dao.toLocaleString()}</Text>
          </chakra.span>
        </chakra.span>
      );
    }
    return null;
  }, [memberShares, memberXP, daoShares]);

  const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

  return (
    <LinkGuild {...{ daoURL, guildname }}>
      <Flex align="center" mb={4} p={2} direction={['column', 'row']}>
        <Flex w="full" align="center" justifyContent={['space-around', 'end']}>
          <Box bg="purpleBoxLight" minW={16} h={16} borderRadius={8}>
            {logoURL ? (
              <Image
                src={logoURL}
                w={14}
                h={14}
                mx="auto"
                my={1}
                borderRadius={4}
              />
            ) : (
              <ChainIcon {...{ chain }} boxSize={16} p={2} />
            )}
          </Box>
          <ChainIcon {...{ chain }} mx={2} boxSize="1.5em" />
        </Flex>
        <Flex
          w="full"
          direction={['row', 'column']}
          align={['center', 'start']}
        >
          <Heading
            fontWeight="bold"
            style={{ fontVariant: 'small-caps' }}
            fontSize="xs"
            color={daoURL ? 'cyanText' : 'white'}
            ml={[0, '1em']}
            sx={{ textIndent: [0, '-1em'] }}
            textAlign={['center', 'left']}
            flexGrow={1}
          >
            {title ?? (
              <Text as="span">
                Unknown{' '}
                <Text as="span" textTransform="capitalize">
                  {chain}
                </Text>{' '}
                DAO
              </Text>
            )}
          </Heading>
          <Flex align="center" mt="0 !important">
            {memberRank && (
              <Text fontSize="xs" casing="capitalize" mr={3}>
                {memberRank}
              </Text>
            )}
            <Text fontSize="xs" ml={[1.5, 0]}>
              {stake}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkGuild>
  );
};

type MembershipListProps = {
  isOpen: boolean;
  onClose: () => void;
  memberships: Array<GuildMembership>;
};

const MembershipListModal: React.FC<MembershipListProps> = ({
  isOpen,
  onClose,
  memberships,
}) => (
  <Modal {...{ isOpen, onClose }} isCentered scrollBehavior="inside">
    <ModalOverlay />
    <ModalContent
      maxW="min(var(--chakra-sizes-6xl), calc(100vw - 4rem))"
      bgImage={`url(${BackgroundImage})`}
      bgSize="cover"
      bgAttachment="fixed"
      maxH="full"
    >
      <Box bg="purple.800" borderTopRadius="lg" p={4} w="full">
        <HStack>
          <Text fontSize="sm" fontWeight="bold" color="blueLight" mr="auto">
            Memberships
          </Text>
          <ModalCloseButton color="blueLight" />
        </HStack>
      </Box>

      <Flex p={2}>
        <Box
          overflowY="auto"
          overflowX="hidden"
          maxH="calc(100vh - 10rem)"
          borderBottomRadius="lg"
          w="full"
          color="white"
          sx={{
            scrollbarColor: 'rgba(70, 20, 100, 0.8) #FFFFFF00',
            '::-webkit-scrollbar': {
              width: '0.5rem',
              background: 'none',
            },
            '::-webkit-scrollbar-thumb': {
              background: 'rgba(70, 20, 100, 0.8)',
              borderRadius: '999px',
            },
          }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
            gap={2}
            p={4}
            boxShadow="md"
            justify="center"
          >
            {memberships.map((membership) => (
              <DAOListing key={membership.memberId} {...{ membership }} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </ModalContent>
  </Modal>
);

type MembershipSectionProps = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerMemberships: React.FC<MembershipSectionProps> = ({
  player,
  isOwnProfile,
  editing,
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

  return (
    <ProfileSection
      title="DAO Memberships"
      type={BoxTypes.PLAYER_DAO_MEMBERSHIPS}
      withoutBG
      {...{ isOwnProfile, editing }}
    >
      {loading && <LoadingState mb={6} />}

      {!loading && memberships.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb={4}>
          No DAO member&shy;ships found for{' '}
          {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}

      <Wrap justify="center">
        {memberships.slice(0, 4).map((membership) => (
          <WrapItem key={membership.memberId}>
            <DAOListing {...{ membership }} />
          </WrapItem>
        ))}
      </Wrap>

      {memberships.length > 4 && (
        <Box textAlign="end">
          <MembershipListModal {...{ isOpen, onClose, memberships }} />
          <ViewAllButton onClick={onOpen} size={memberships.length} />
        </Box>
      )}
    </ProfileSection>
  );
};

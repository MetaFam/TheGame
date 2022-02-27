import {
  Box,
  Center,
  ChainIcon,
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

const DAOListing: React.FC<DAOListingProps> = ({ membership }) => {
  const {
    title,
    memberShares,
    daoShares,
    memberRank,
    memberXP,
    chain,
    address,
    logoUrl,
    guildname,
  } = membership;

  const stake = useMemo(() => {
    if (memberXP != null) {
      return `XP: ${Math.floor(memberXP)}`;
    }
    if (daoShares != null) {
      return `Shares: ${memberShares ?? 'Unknown'} / ${daoShares}`;
    }
    return '';
  }, [memberShares, memberXP, daoShares]);

  const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

  return (
    <LinkGuild {...{ daoURL, guildname }}>
      <HStack alignItems="center" mb={6} p={2}>
        <Flex bg="purpleBoxLight" minW={16} h={16} mr={2} borderRadius={8}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              w="3.25rem"
              h="3.25rem"
              m="auto"
              borderRadius={4}
            />
          ) : (
            <ChainIcon chain={chain} boxSize={16} p={2} />
          )}
        </Flex>
        <Box>
          <Heading
            fontWeight="bold"
            style={{ fontVariant: 'small-caps' }}
            fontSize="xs"
            color={daoURL ? 'cyanText' : 'white'}
            mb={1}
            ml="1em"
            sx={{ textIndent: '-1em' }}
          >
            <Center justifyContent="left">
              {title ?? (
                <Text>
                  Unknown{' '}
                  <Text as="span" textTransform="capitalize">
                    {chain}
                  </Text>{' '}
                  DAO
                </Text>
              )}
              <ChainIcon chain={chain} ml={2} boxSize="1.5em" />
            </Center>
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
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No DAO member&shy;ships found for{' '}
          {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}

      {memberships.slice(0, 4).map((membership) => (
        <DAOListing key={membership.memberId} {...{ membership }} />
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
          <ModalContent
            maxW="6xl"
            bgImage={`url(${BackgroundImage})`}
            bgSize="cover"
            bgAttachment="fixed"
          >
            <Box bg="purple.100" borderTopRadius="lg" p={4} w="100%">
              <HStack>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="blueLight"
                  mr="auto"
                >
                  Memberships
                </Text>
                <ModalCloseButton color="blueLight" />
              </HStack>
            </Box>

            <Flex p={2}>
              <Box
                overflowY="auto"
                overflowX="hidden"
                maxH="80vh"
                borderBottomRadius="lg"
                w="full"
                color="white"
                sx={{
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
                  p={6}
                  boxShadow="md"
                >
                  {memberships.map((membership) => (
                    <DAOListing key={membership.memberId} {...{ membership }} />
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

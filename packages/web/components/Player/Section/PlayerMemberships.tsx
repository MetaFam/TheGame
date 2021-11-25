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
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import React, { useEffect, useMemo, useState } from 'react';
import { isBackdropFilterSupported } from 'utils/compatibilityHelpers';

import { ProfileSection } from '../../ProfileSection';
import { getDaoLink, getImageMoloch, LinkGuild } from '../PlayerGuild';

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
      return `Shares: ${memberShares || 0}/${daoShares}`;
    }
    return '';
  }, [memberShares, memberXp, daoShares]);

  const daoUrl = useMemo(() => getDaoLink(chain, address), [chain, address]);

  const guildLogo = useMemo(
    () => logoUrl || getImageMoloch(title || chain || ''),
    [logoUrl, chain, title],
  );

  return (
    <LinkGuild daoUrl={daoUrl} guildname={guildname}>
      <HStack alignItems="center" mb={6}>
        <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
          <Box
            bgImage={`url(${guildLogo})`}
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
            color={daoUrl ? 'cyanText' : 'white'}
            mb="1"
          >
            {title || `Unknown ${chain} DAO`}
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
  player: PlayerFragmentFragment;
  onRemoveClick: () => void;
};

export const PlayerMemberships: React.FC<MembershipSectionProps> = ({
  player,
  onRemoveClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [guildMemberships, setGuildMemberships] = useState<GuildMembership[]>(
    [],
  );
  const [loadingMemberships, setLoadingMemberships] = useState<boolean>(true);

  useEffect(() => {
    getAllMemberships(player).then((memberships) => {
      setLoadingMemberships(false);
      setGuildMemberships(memberships);
    });
  }, [player]);

  const modalContentStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }
    : {
        backgroundColor: 'rgba(7, 2, 29, 0.91)',
      };

  return (
    <ProfileSection title="Memberships" onRemoveClick={onRemoveClick}>
      {loadingMemberships && <LoadingState />}

      {guildMemberships.slice(0, 4).map((membership) => (
        <DaoListing key={membership.memberId} membership={membership} />
      ))}

      {guildMemberships.length > 4 && (
        <Text
          as="span"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={onOpen}
        >
          View all ({guildMemberships.length})
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
                  {guildMemberships.map((membership) => (
                    <DaoListing
                      key={membership.memberId}
                      membership={membership}
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

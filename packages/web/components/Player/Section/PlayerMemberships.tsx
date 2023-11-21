import {
  AddIcon,
  Box,
  Button,
  ChainIcon,
  chakra,
  EditIcon,
  Flex,
  Heading,
  IconButton,
  Image,
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
  VStack,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Section/ProfileSection';
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import {
  Player,
} from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';
import { optimizedImage } from 'utils/imageHelpers';

import { AddPlayerGuild } from './MembershipModals/AddPlayerGuild';
import { DAOListingProps, GuildListing } from './MembershipModals/GuildListing';

export const DAOListing: React.FC<DAOListingProps> = ({
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
      <Flex align="center" mb={4} p={2}>
        <Flex align="center">
          <Box bg="purpleBoxLight" minW={16} h={16} borderRadius={8}>
            {logoURL ? (
              <Image
                src={optimizedImage('logoURL', logoURL)}
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
        <Flex w="full" direction="column" align="start">
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

export const DAOMembershipSmall: React.FC<DAOListingProps> = ({
  membership: { title, chain, address, logoURL, guildname },
}) => {
  const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

  return (
    <Tooltip label={title ?? `Unknown ${chain} DAO`}>
      <Flex
        onClick={(e) => {
          e.preventDefault();
          if (guildname != null) {
            window.location.href = `/guild/${guildname}`;
          } else if (daoURL != null) {
            window?.open(daoURL, '_blank')?.focus();
          }
        }}
        align="center"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.06)"
        minW={8}
        h={8}
        borderRadius={8}
        pointerEvents="all"
      >
        {logoURL ? (
          <Image
            src={optimizedImage('logoURL', logoURL)}
            w={6}
            h={6}
            borderRadius="full"
            _hover={{ transform: 'scale(4)' }}
            transition="transform 0.2s"
          />
        ) : (
          <ChainIcon {...{ chain, tooltip: false }} boxSize={9} p={2} />
        )}
      </Flex>
    </Tooltip>
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
  <Modal {...{ isOpen, onClose }}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>DAO Memberships</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={2}
          p={4}
          justifyContent="center"
        >
          {memberships.map((membership) => (
            <GuildListing key={membership.id} {...{ membership }} />
          ))}
        </SimpleGrid>
      </ModalBody>
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
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [memberships, setMemberships] = useState<GuildMembership[]>([]);
  const [currentMemberships, setCurrentMemberships] = useState<
    GuildMembership[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [editView, setEditView] = useState(false);
  const [addGuildView, setAddGuildView] = useState(false);
  const [layout, setLayout] = useState(() => {
    const savedLayout = window.localStorage.getItem('savedLayout');
    if (savedLayout) {
      return JSON.parse(savedLayout);
    }
    if (!savedLayout) {
      return memberships.map((membership, index) => ({
        i: membership.id,
        x: 3,
        y: index,
        w: 3,
        h: 3,
      }));
    }
  });

  const { hydrateFromHasura: performHasuraHydration, hydratedPlayer } =
    usePlayerHydrationContext();

  const updateMemberships = useCallback(() => {
    getAllMemberships(hydratedPlayer || player).then(({ all }) => {
      const visible = structuredClone(visibility);
      const withHidden = all.map((membership) => {
        visible[membership.id] ??= !!membership.visible;
        return { ...membership, visible: visible[membership.id] };
      });
      setMemberships(all);
      setCurrentMemberships(withHidden);
      if (Object.entries(visible).some(([id, val]) => visibility[id] !== val)) {
        setVisibility(visible);
      }

      setLoading(false);
    });
  }, [player, hydratedPlayer, visibility]);

  useEffect(updateMemberships, [updateMemberships, editView]);

  const onLayoutChange = (newLayout: any) => {
    const savedLayout = window.localStorage.getItem('savedLayout');
    if (savedLayout) {
      window.localStorage.removeItem('savedLayout');
    }
    window.localStorage.setItem('savedLayout', JSON.stringify(newLayout));
    setLayout(newLayout);
  };

  const visibleMemberships = currentMemberships.filter(({ visible: v }) => v);
  const dirty = memberships.some(
    (membership) => visibility[membership.id] !== membership.visible,
  );

  return (
    <ProfileSection
      title="Guild Memberships"
      type={BoxTypes.PLAYER_DAO_MEMBERSHIPS}
      {...{ isOwnProfile, editing }}
      sx={{ bg: editView ? '#422F6A' : '' }}
    >
      {isOwnProfile && (
        <Box pos="absolute" right={1} top={2}>
          <IconButton
            aria-label="Edit Profile Info"
            size="lg"
            background="transparent"
            color="pinkShadeOne"
            icon={<EditIcon />}
            _hover={{ color: 'white' }}
            _focus={{ boxShadow: 'none' }}
            _active={{ transform: 'scale(0.8)' }}
            isRound
            onClick={() => {
              setEditView(!editView);
            }}
          />
        </Box>
      )}
      {!editView &&
        (loading ? (
          <LoadingState mb={6} />
        ) : (
          memberships.length === 0 ||
          (visibleMemberships.length === 0 && (
            <Text fontStyle="italic" textAlign="center" mb={4}>
              No Guild member&shy;ships{' '}
              {memberships.length === 0 ? 'found' : 'visible'} for{' '}
              {isOwnProfile ? 'you' : 'this player'}.
            </Text>
          ))
        ))}

      <VStack align="stretch">
        {!editView &&
          visibleMemberships
            .slice(0, 4)
            .map((membership) => (
              <GuildListing
                key={membership.id}
                editing={false}
                {...{ membership }}
              />
            ))}
      </VStack>

      {!editView && visibleMemberships.length > 4 && (
        <Box textAlign="end">
          <MembershipListModal
            memberships={visibleMemberships}
            {...{ isOpen, onClose }}
          />
          <ViewAllButton onClick={onOpen} size={visibleMemberships.length} />
        </Box>
      )}

      {editView && (
        <>
          <Text textAlign="left" mb={4}>
            Here you can modify your existing guild memberships, or add new
            ones.
          </Text>
          <Text textAlign="left" mb={4}>
            Verified guild memberships can only be hidden whereas unverified
            ones can be removed.
          </Text>
          <ReactGridLayout
            {...{ layout }}
            isDraggable={!!editView}
            isResizable={false}
            onLayoutChange={onLayoutChange}
            cols={1}
            rowHeight={30}
            draggableHandle=".guildDragHandle"
          >
            {currentMemberships.map((membership, index) => (
              <Box key={membership.id} w="100%">
                <GuildListing
                  {...{ membership }}
                  editing={true}
                  playerId={hydratedPlayer?.id}
                  onClose={performHasuraHydration}
                  updateVisibility={(vis) => {
                    setVisibility((viss) => ({ ...viss, [membership.id]: vis }));
                  }}
                />
              </Box>
            ))}
          </ReactGridLayout>
          <Button
            variant="unstyled"
            size="md"
            h="72px"
            w="100%"
            bg="#E9DFF133"
            border="2px dotted #ffffff25"
            onClick={() => setAddGuildView(true)}
            leftIcon={<AddIcon />}
          >
            Add Membership
          </Button>
        </>
      )}
      {editView && addGuildView && (
        <>
          <AddPlayerGuild
            isOpen={addGuildView}
            onClose={() => {
              setAddGuildView(false);
            }}
            player={hydratedPlayer}
            hydratePlayer={performHasuraHydration}
          />
        </>
      )}
    </ProfileSection>
  );
};
